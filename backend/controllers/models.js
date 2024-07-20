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

export const getallModels = async (req, res) => {
  try {
    const query = `
      SELECT
        model.id AS id,
        model.model_name AS model_name,
        brands.name AS brand_name,
        json_agg(json_build_object(
          'ram_storage_id', ram_storage.id,
          'configuration', ram_storage.configuration
        )) AS configurations
      FROM model
      LEFT JOIN brands ON model.brand_id = brands.id
      LEFT JOIN model_ram_storage_mapping ON model.id = model_ram_storage_mapping.model_id
      LEFT JOIN ram_storage ON model_ram_storage_mapping.ram_storage_id = ram_storage.id
      GROUP BY model.id, brands.name
      ORDER BY model.id ASC
    `;

    const result = await db.any(query);

    const formattedData = result.map(row => ({
      id: row.id,
      model_name: row.model_name,
      brand_name: row.brand_name,
      configurations: row.configurations || [], 
    }));

    res.status(200).json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error('Error getting all models:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




export const addModels = async (req, res) => {
    const { model_name, brand_id, ram_storage_ids } = req.body;

    if (!model_name || !brand_id || !Array.isArray(ram_storage_ids)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please Provide Required Information",
        });
    }

    try {
        // Check if model_name already exists for the given brand_id
        const checkModelQuery = 'SELECT COUNT(*) FROM model WHERE model_name = $1 AND brand_id = $2';
        const { count } = await db.one(checkModelQuery, [model_name, brand_id]);

        if (count > 0) {
            return res.status(StatusCodes.CONFLICT).json({
                message: 'Model with the same name already exists for this brand',
            });
        }

        // If not duplicate, proceed with insertion
        const insertModelQuery = 'INSERT INTO model (model_name, brand_id) VALUES ($1, $2) RETURNING id';
        const modelResult = await db.one(insertModelQuery, [model_name, brand_id]);

        const modelId = modelResult.id;
        const insertRamStorageMappingQuery = 'INSERT INTO model_ram_storage_mapping (model_id, ram_storage_id) VALUES ($1, $2)';
        const queries = ram_storage_ids.map(ram_storage_id => db.none(insertRamStorageMappingQuery, [modelId, ram_storage_id]));

        await Promise.all(queries);

        res.status(StatusCodes.CREATED).json({ message: 'Model created successfully!' });
    } catch (error) {
        console.error('Error adding model:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
}


export const deleteModels = async (req, res)=>{
    const modelId = req.params['id'];

    if (!modelId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Model ID is required",
        });
    }

    try {
        const deleteRamStorageMappingQuery = 'DELETE FROM model_ram_storage_mapping WHERE model_id = $1';
        await db.none(deleteRamStorageMappingQuery, [modelId]);

        const deleteModelQuery = 'DELETE FROM model WHERE id = $1';
        await db.none(deleteModelQuery, [modelId]);

        res.status(StatusCodes.OK).json({ message: 'Model and associated RAM storage mappings deleted successfully!' });
    } catch (error) {
        console.error('Error deleting model:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
}

export const updateModel = async (req, res) => {
  const { model_id } = req.params;
  const { model_name, brand_id, ram_storage_ids } = req.body;

  try {
    // Check if the model with the given model_id exists
    const checkModelQuery = 'SELECT COUNT(*) FROM model WHERE id = $1';
    const { count } = await db.one(checkModelQuery, [model_id]);

    if (count === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Model not found',
      });
    }

    // Update model_name and brand_id if provided
    if (model_name && brand_id) {
      const updateModelQuery = 'UPDATE model SET model_name = $1, brand_id = $2 WHERE id = $3';
      await db.none(updateModelQuery, [model_name, brand_id, model_id]);
    } else if (model_name) {
      const updateModelNameQuery = 'UPDATE model SET model_name = $1 WHERE id = $2';
      await db.none(updateModelNameQuery, [model_name, model_id]);
    } else if (brand_id) {
      const updateBrandIdQuery = 'UPDATE model SET brand_id = $1 WHERE id = $2';
      await db.none(updateBrandIdQuery, [brand_id, model_id]);
    }

    // Update ram_storage mappings if provided
    if (ram_storage_ids && Array.isArray(ram_storage_ids)) {
      // First, delete existing mappings for the model
      const deleteMappingsQuery = 'DELETE FROM model_ram_storage_mapping WHERE model_id = $1';
      await db.none(deleteMappingsQuery, [model_id]);

      // Insert new mappings
      const insertMappingsQuery = 'INSERT INTO model_ram_storage_mapping (model_id, ram_storage_id) VALUES ($1, $2)';
      const queries = ram_storage_ids.map(async ram_storage_id => {
        try {
          await db.none(insertMappingsQuery, [model_id, ram_storage_id]);
        } catch (error) {
          console.error('Error inserting ram_storage_id:', error);
        }
      });

      await Promise.all(queries);
    }

    res.status(StatusCodes.OK).json({ message: 'Model updated successfully!' });
  } catch (error) {
    console.error('Error updating model:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

