import { StatusCodes } from "http-status-codes";
import { uploadProductImages } from "../utils/utils.js";
import db from '../db/db.js'


import pgPromise from 'pg-promise';
const pgp = pgPromise({});

export const createProductRequests = async (req, res) => {
    let { brand_id, category_id, description, user_id, attribute_value_id, model_id, ram_storage_id } = req.body;
    let productId;
      await db.tx(async t => {
        
        const insertProduct = await t.one('INSERT INTO product_requests ( brand_id, category_id, description, buyer_id,model_id,ram_storage_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id', [brand_id, category_id, description, user_id, model_id, ram_storage_id]);
        productId = insertProduct.id;
  
        if (attribute_value_id && Array.isArray(attribute_value_id)) {
          const attributeQueries = attribute_value_id.map(attributeValueId => ({
            text: 'INSERT INTO product_request_attributes (product_request_id, attribute_value_id) VALUES ($1, $2)',
            values: [productId, attributeValueId],
          }));
  
          await Promise.all(attributeQueries.map(aquery => t.none(aquery))); // Use Promise.all for parallel execution
        }
        return productId;
      });
  
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Request created successfully!',
        data:productId
      });
   
  };

export const createTemporaryRequestForSeller = async (req, res) => {

    let { brand_id, category_id, quantity, description, price, user_id, attribute_value_id, model_id, ram_storage_id,
        model_name, ram_storage_name, image_paths
    } = req.body


    const insertProduct = await db.one('INSERT INTO temporary_model_requests ( brand_id, category_id, quantity, description, seller_id,model_id,ram_storage_id, price,model_name,ram_storage_config,attribute_value_id,image_paths) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING request_id', [brand_id, category_id, quantity, description, user_id, model_id, ram_storage_id, price,
        model_name, ram_storage_name, attribute_value_id, image_paths
    ]);
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Listing created successfully!',
        data: insertProduct,
    });

}

export const addProductForSeller = async (req, res) => {

    const { brand_id, category_id, quantity, description, price, user_id, attribute_value_id, model_id, ram_storage_id } = req.body;

    if (!model_id || !ram_storage_id) {

        return createTemporaryRequestForSeller(req, res);

    }
    let productId;
    await db.tx(async t => {
        const insertProduct = await t.one('INSERT INTO products ( brand_id, category_id, quantity, description, seller_id,model_id,ram_storage_id, price) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id', [brand_id, category_id, quantity, description, user_id, model_id, ram_storage_id, price]);
        productId = insertProduct.id;
        let attributeQueries;
        if (attribute_value_id && Array.isArray(attribute_value_id)) {
           
                attributeQueries = attribute_value_id.map(attributeValueId => ({
                    text: 'INSERT INTO product_attributes (product_id, attribute_value_id) VALUES ($1, $2)',
                    values: [productId, attributeValueId],
                }));
            
        }
        await Promise.all(attributeQueries.map(aquery => t.none(aquery)));
        return productId;
    })

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Product created successfully!',
        data:productId
    });


};

export const deleteProductRequest = async(req, res)=>{

    const productId = req.params['id'];

    await db.none("DELETE FROM product_requests WHERE id=$1",[productId])
}

export const updateProductRequestWithImage = async (req, res) => {

    const productId = req.params['id'];

    const { imagePaths } = req.body;

    if (productId != undefined && imagePaths && imagePaths.length == 2) {

        const imagePathsToInsert = [{ 'image_path': imagePaths[0] }, { 'image_path': imagePaths[1] }];

        db.tx(async t => {

            // const imageInsertion = 
            const updateImagePathQuery = pgp.helpers.insert(imagePathsToInsert, ['image_path'], 'images') + ' RETURNING id';

            const res = await db.map(updateImagePathQuery, undefined, image => +image.id);

            if (res && res.length == 2) {
                const productMappingsToInsert = [{ 'product_request_id': productId, 'image_id': res[0] }, { 'product_request_id': productId, 'image_id': res[1] }];

                const productMappingQuery = pgp.helpers.insert(productMappingsToInsert, ['product_request_id', 'image_id'], 'product_request_image_mapping');

                await db.none(productMappingQuery);
            }

            else {
                throw new Error('Failed to update images');
            }


            return res;

        }).then(_ => {
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: 'Listing created successfully!',

            });
        })

            .catch(error => {
                console.log(error.message)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: error
                })
            });

    }

    else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
    }


}

export const updateProductWithImage = async (req, res) => {

    const productId = req.params['id'];

    const { imagePaths } = req.body;

    if (productId != undefined && imagePaths && imagePaths.length == 2) {

        const imagePathsToInsert = [{ 'image_path': imagePaths[0] }, { 'image_path': imagePaths[1] }];

        db.tx(async t => {

            // const imageInsertion = 
            const updateImagePathQuery = pgp.helpers.insert(imagePathsToInsert, ['image_path'], 'images') + ' RETURNING id';

            const res = await db.map(updateImagePathQuery, undefined, image => +image.id);

            if (res && res.length == 2) {
                const productMappingsToInsert = [{ 'product_id': productId, 'image_id': res[0] }, { 'product_id': productId, 'image_id': res[1] }];

                const productMappingQuery = pgp.helpers.insert(productMappingsToInsert, ['product_id', 'image_id'], 'product_image_mapping');

                await db.none(productMappingQuery);
            }

            else {
                throw new Error('Failed to update images');
            }


            return res;

        }).then(_ => {
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: 'Listing created successfully!',

            });
        })

            .catch(error => {
                console.log(error.message)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: error
                })
            });

    }

    else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
    }


}

export const updateProductForSeller = async (req, res) => {

    const productId = req.params['id'];

    if (validateErrors(req, res) == undefined && productId != undefined) {

        try {

            let setClause = "";
            const params = [productId];
            let index = 1;
            for (const field in req.body) {
                if (setClause.length > 0) setClause += ", ";
                setClause += `${field} = $${index + 1}`;
                // brand_id = $1, category_id = $2, quantity = $3, description = $4, price = $5, seller_id = $6
                params.push(req.body[field]);
                index++;
            }

            // Construct the UPDATE query
            const query = `UPDATE products SET ${setClause} WHERE id = $1`;

            await req.pool.query(query, params);

            res.status(StatusCodes.CREATED).json({ message: 'Listing updated successfully!' });

        } catch (error) {
            console.error('Error adding Item:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
        }

    }

};

export const deleteProductForSeller = async (req, res) => {


    const productId = req.params['id'];

    try {

        await db.any('DELETE FROM  products WHERE id = $1', [productId]);

        res.status(StatusCodes.CREATED).json({ message: 'Listing deleted successfully!' });

    } catch (error) {
        console.error('Error deleting Item:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
    }




};

export const getInfoForProduct = async (req, res) => {

    const productId = req.params['pid'];
    try {
        const query = 'SELECT products.*, json_agg(images.image_path) AS image_path FROM products LEFT JOIN product_image_mapping pim ON products.id = pim.product_id \
        LEFT JOIN images ON images.id = pim.image_id  WHERE products.id = $1 GROUP BY products.id';
        const result = await db.any(query, [productId]);
        console.log(result.rows[0]);
        res.status(StatusCodes.OK).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Error getting products:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
    }
}


export const getAllProducts = async (req, res) => {


    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const cartId = parseInt(req.query.cartid);
    console.log(cartId);
    if (!cartId){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Cart id invalid" });
    }
    try {

        const totalProductsQuery = 'SELECT COUNT(*) AS total FROM products';
        const totalResult = await db.any(totalProductsQuery);
        const total = totalResult[0].total; // Assuming a single row result

        const offset = (page - 1) * limit;

        const query = `
        SELECT products.quantity as quantity, COALESCE(cartitems.quantity, 0) as cart_quantity,products.price, products.id, products.name, products.description, products.brand_id, products.category_id, categories.name AS cname, brands.name AS bname,
        model.model_name as mname, ram_storage.configuration,
        COALESCE(
        jsonb_agg(json_build_object(attribute_info.attribute_name, attribute_value.value))
        FILTER (WHERE attribute_value.id IS NOT NULL AND attribute_info.attribute_name IS NOT NULL),  -- Filter nulls before building object
        '[]'
            ) AS attribute_info,
                        COALESCE(jsonb_agg(images.image_path) FILTER (WHERE images.image_path IS NOT NULL), '[]') AS image_path
                FROM products
                LEFT JOIN product_image_mapping pim ON products.id = pim.product_id
                LEFT JOIN images ON images.id = pim.image_id
                INNER JOIN categories ON products.category_id = categories.id
                INNER JOIN brands ON products.brand_id = brands.id
                INNER JOIN model ON  products.model_id = model.id
				INNER JOIN ram_storage ON ram_storage.id = products.ram_storage_id
                LEFT JOIN product_attributes ON products.id = product_attributes.product_id
                LEFT JOIN attribute_value ON product_attributes.attribute_value_id = attribute_value.id
                LEFT JOIN attribute_info ON attribute_value.id = attribute_info.id
                LEFT JOIN cartitems ON cartitems.product_id = products.id AND cartitems.cart_id = $3
                WHERE products.quantity > 0 
                GROUP BY products.id,cartitems.quantity, categories.name, brands.name,model.model_name,ram_storage.configuration
                ORDER BY products.id ASC
                LIMIT $1    
                OFFSET $2`;
        const values = [limit, offset,cartId]; // Parameters for prepared statement

        const result = await db.many(query, values);

        res.status(StatusCodes.OK).json({
            success: true,
            data: result,
            pagination: {
                total,  // Total number of products (optional if not included in totalProductsQuery)
                limit,
                page,
                offset,
                totalPages: Math.ceil(total / limit), // Calculate total pages based on total and limit
            },
        });

    }

    catch (error) {
        console.error('Error getting products:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });

    }


};

export const uploadProductImage = async (req, res) => {

    return await uploadProductImages(req, res);

}

export const getAllProductsForCategory = async (req, res) => {

    const id = req.params['id'];
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const cartId = parseInt(req.query.cartid);
    if (!cartId){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Cart id invalid" });
    }
    try {
        const totalProductsQuery = 'SELECT COUNT(*) AS total FROM products WHERE category_id = $1';
        const totalResult = await db.any(totalProductsQuery, [id]);
        const total = totalResult[0].total; // Assuming a single row result

        const offset = (page - 1) * limit;
        const query = `
                    SELECT products.quantity as quantity,COALESCE(cartitems.quantity, 0) as cart_quantity,products.price, products.id, products.name, products.description, products.brand_id, products.category_id, categories.name AS cname, brands.name AS bname,
                    model.model_name as mname, ram_storage.configuration,
                    COALESCE(
                    jsonb_agg(DISTINCT jsonb_build_object('attribute_name',attribute_info.attribute_name,'attribute_value', attribute_value.value))
                    FILTER (WHERE attribute_value.id IS NOT NULL AND attribute_info.attribute_name IS NOT NULL),  -- Filter nulls before building object
                '[]'
                        ) AS attribute_info,
                        COALESCE(jsonb_agg(images.image_path) FILTER (WHERE images.image_path IS NOT NULL), '[]') AS image_path
                FROM products
                LEFT JOIN product_image_mapping pim ON products.id = pim.product_id
                LEFT JOIN images ON images.id = pim.image_id
                INNER JOIN categories ON products.category_id = categories.id
                INNER JOIN brands ON products.brand_id = brands.id
                INNER JOIN model ON  products.model_id = model.id
				INNER JOIN ram_storage ON ram_storage.id = products.ram_storage_id
                LEFT JOIN product_attributes ON products.id = product_attributes.product_id
                LEFT JOIN attribute_value ON product_attributes.attribute_value_id = attribute_value.id
                LEFT JOIN attribute_info ON attribute_value.attribute_id = attribute_info.id
                LEFT JOIN cartitems ON cartitems.product_id = products.id AND  cartitems.cart_id = $4
                WHERE products.category_id = $1
                AND products.quantity > 0
                GROUP BY products.id,cartitems.quantity, categories.name, brands.name,model.model_name,ram_storage.configuration
                ORDER BY products.id ASC
                LIMIT $2    
                OFFSET $3`;

        const values = [id, limit, offset,cartId]; // Parameters for prepared statement

        const result = await db.manyOrNone(query, values);

        res.status(StatusCodes.OK).json({
            success: true,
            data: result,
            pagination: {
                total,  // Total number of products (optional if not included in totalProductsQuery)
                limit,
                page,
                offset,
                totalPages: Math.ceil(total / limit), // Calculate total pages based on total and limit
            },
        });

    }

    catch (error) {
        console.error('Error getting products:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });

    }


};