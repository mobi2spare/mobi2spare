import { StatusCodes } from "http-status-codes";
import { validateErrors } from "../validators/common_validation.js";
import { uploadProductImages } from "../utils/utils.js";
import db from '../db/db.js'

import pgPromise from 'pg-promise';
const pgp = pgPromise({});


export const getAllModelsForBrand = async (req, res) => {


    const  brand_id  = req.params['id'];
    const models = await db.manyOrNone('SELECT model.id,model_name as name,json_agg(ram_storage.configuration ) as configuration from model INNER JOIN model_ram_storage_mapping ON model_ram_storage_mapping.model_id = model.id \
    INNER JOIN ram_storage ON ram_storage.id = model_ram_storage_mapping.ram_storage_id \
    where brand_id=$1 GROUP BY model_name,model.id',[brand_id]);

    res.status(StatusCodes.OK).json({
        success: true,
        data: models
    })


}

export const addModels = async(req, res)=>{

}

export const deleteModels = async (req, res)=>{

}

export const updateModel = async (req, res) => {

}