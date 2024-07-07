import { PRODUCT_REQUEST_STATUS } from "../constants/constants.js";
import db from '../db/db.js'
import { StatusCodes } from "http-status-codes";
import pgPromise from 'pg-promise';
const pgp = pgPromise({});

export const approveTemporaryProductRequest =  async(req, res)=>{

    let { brand_id, category_id, quantity, description, price, seller_id, attribute_value_id,model_id,ram_storage_id,model_name,ram_storage_name } = req.body;
    let requestId = req.params['id'];
        
    db.tx(async t => {
        await t.one("SELECT * from temporary_model_requests where request_id=$1 AND request_status = $2",[requestId,PRODUCT_REQUEST_STATUS.PENDING]);

        let modelExists;
        if (model_name){
          modelExists = await t.oneOrNone("SELECT ID from model where model_name=$1 and brand_id = $2",[model_name,brand_id]);
        }
        
        if(modelExists){
            model_id = modelExists.id;
        }
        else if(!model_id){
            
            const model = await t.one('INSERT INTO model (model_name, brand_id) VALUES($1,$2) RETURNING ID',[model_name,brand_id]);
            console.log(model);
            if (model){
                model_id = model.id;
            }
        }
        
    
        let ramStorageExists;
        if(ram_storage_name){
             ramStorageExists = await t.oneOrNone("SELECT ID from ram_storage where configuration=$1",[ram_storage_name]);
        }

        if(ramStorageExists){
            ram_storage_id = ramStorageExists.id;
        }
        else if(!ram_storage_id){
            const ramStorageConfig = await t.one('INSERT INTO ram_storage (configuration) VALUES($1) RETURNING ID',[ram_storage_name]);
            if (ramStorageConfig){
                ram_storage_id = ramStorageConfig.id;
            }
        }

        const modelRamAndModelMappingExists = await t.oneOrNone("SELECT * from model_ram_storage_mapping where model_id=$1 and ram_storage_id=$2",[model_id,ram_storage_id]);
        
        if(!modelRamAndModelMappingExists){

            await t.none('INSERT INTO model_ram_storage_mapping (model_id,ram_storage_id) VALUES($1,$2)',[model_id,ram_storage_id]);
           
        }
     

        const insertProduct = await t.one('INSERT INTO products ( brand_id, category_id, quantity, description, seller_id,model_id,ram_storage_id, price) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id', [brand_id, category_id, quantity, description, seller_id,model_id,ram_storage_id, price]);
        const productId = insertProduct.id;
        let attributeQueries;
        if (attribute_value_id && Array.isArray(attribute_value_id)) {
            try {
                attributeQueries = attribute_value_id.map(attributeValueId => ({
                    text: 'INSERT INTO product_attributes (product_id, attribute_value_id) VALUES ($1, $2)',
                    values: [productId, attributeValueId],
                }));
            } catch (error) {
                console.error('Error occured while saving product');
            }
        }
        attributeQueries.forEach(async (aquery) => {
            await t.none(aquery);
        })
        const now = new Date().toISOString();
        await t.none('UPDATE temporary_model_requests SET admin_id=$1,admin_actioned_at=$2,request_status=$3 WHERE request_id = $4',[req.userId,now,PRODUCT_REQUEST_STATUS.APPROVED,requestId]);

        return productId;
    }).then(result => {
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Listing created successfully!',
            data: result,
        });
    })

        .catch(error => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error
            })
            // failure, ROLLBACK was executed
        });

}