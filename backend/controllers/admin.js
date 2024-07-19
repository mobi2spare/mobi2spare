import dotenv from 'dotenv';
import { PRODUCT_REQUEST_STATUS } from "../constants/constants.js";
import db from '../db/db.js';
import { StatusCodes } from "http-status-codes";
import pgPromise from 'pg-promise';

dotenv.config();

const pgp = pgPromise({});
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_NAME = process.env.DATABASE_NAME ;

const connectionString = `postgres://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;
const dbInstance = pgp(connectionString); // Renamed to avoid redeclaration

export const approveTemporaryProductRequest = async (req, res) => {
    let { brand_id, category_id, quantity, description, price, seller_id, attribute_value_id, model_id, ram_storage_id, model_name, ram_storage_name } = req.body;
    let requestId = req.params['id'];
    console.log(req.params)
    try {
        const result = await dbInstance.tx(async t => {
            await t.one("SELECT * from temporary_model_requests where request_id=$1 AND request_status = $2", [requestId, PRODUCT_REQUEST_STATUS.PENDING]);

            let modelExists;
            if (model_name) {
                modelExists = await t.oneOrNone("SELECT ID from model where model_name=$1 and brand_id = $2", [model_name, brand_id]);
            }

            if (modelExists) {
                model_id = modelExists.id;
            } else if (!model_id) {
                const model = await t.one('INSERT INTO model (model_name, brand_id) VALUES($1,$2) RETURNING ID', [model_name, brand_id]);
                if (model) {
                    model_id = model.id;
                }
            }

            let ramStorageExists;
            if (ram_storage_name) {
                ramStorageExists = await t.oneOrNone("SELECT ID from ram_storage where configuration=$1", [ram_storage_name]);
            }

            if (ramStorageExists) {
                ram_storage_id = ramStorageExists.id;
            } else if (!ram_storage_id) {
                const ramStorageConfig = await t.one('INSERT INTO ram_storage (configuration) VALUES($1) RETURNING ID', [ram_storage_name]);
                if (ramStorageConfig) {
                    ram_storage_id = ramStorageConfig.id;
                }
            }

            const modelRamAndModelMappingExists = await t.oneOrNone("SELECT * from model_ram_storage_mapping where model_id=$1 and ram_storage_id=$2", [model_id, ram_storage_id]);

            if (!modelRamAndModelMappingExists) {
                await t.none('INSERT INTO model_ram_storage_mapping (model_id, ram_storage_id) VALUES($1, $2)', [model_id, ram_storage_id]);
            }
            console.log("k");
            const insertProduct = await t.one('INSERT INTO products (brand_id, category_id, quantity, description, seller_id, model_id, ram_storage_id, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id', [brand_id, category_id, quantity, description, seller_id, model_id, ram_storage_id, price]);
            const productId = insertProduct.id;
            console.log(insertProduct);
            if (attribute_value_id && Array.isArray(attribute_value_id)) {
                const attributeQueries = attribute_value_id.map(attributeValueId => ({
                    text: 'INSERT INTO product_attributes (product_id, attribute_value_id) VALUES ($1, $2)',
                    values: [productId, attributeValueId],
                }));

                for (const aquery of attributeQueries) {
                    await t.none(aquery);
                }
            }

            const now = new Date().toISOString();
            await t.none('UPDATE temporary_model_requests SET admin_id=$1, admin_actioned_at=$2, request_status=$3 WHERE request_id = $4', [req.userId, now, PRODUCT_REQUEST_STATUS.APPROVED, requestId]);

            return productId;
        });

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Listing created successfully!',
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        });
    }
};

export const getAllTempRequests = async (req, res) => {
    try {
        const tempRequests = await db.any(
            `SELECT 
                request_id, 
                brand_id, 
                category_id, 
                quantity, 
                description, 
                seller_id, 
                price, 
                model_name, 
                ram_storage_config, 
                model_id, 
                ram_storage_id, 
                admin_id, 
                request_status, 
                attribute_value_id, 
                image_paths 
            FROM temporary_model_requests`
        );
        return res.status(StatusCodes.OK).json({
            success: true,
            data: tempRequests
        });
    } catch (error) {
        console.error('Error fetching temporary model requests:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to fetch temporary model requests'
        });
    }
};

export const approveTemporaryProductRequest1 = async (req, res) => {
    let { brand_id, category_id, quantity, description, price, seller_id, attribute_value_id, model_id, ram_storage_id, model_name, ram_storage_name } = req.body;
    let requestId = req.params['id'];
    console.log(req.params)
    try {
        const result = await dbInstance.tx(async t => {
            await t.one("SELECT * from temporary_model_requests where request_id=$1 AND request_status = $2", [requestId, PRODUCT_REQUEST_STATUS.PENDING]);

            console.log("k");
            const insertProduct = await t.one('INSERT INTO product_requests (id,brand_id, category_id,description, buyer_id, model_id, ram_storage_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [requestId,brand_id, category_id,description, seller_id, model_id, ram_storage_id]);
            const productId = insertProduct.id;
            console.log(insertProduct);
            const now = new Date().toISOString();
            await t.none('UPDATE temporary_model_requests SET admin_id=$1, admin_actioned_at=$2, request_status=$3 WHERE request_id = $4', [req.userId, now, PRODUCT_REQUEST_STATUS.APPROVED, requestId]);
            return productId;
        });

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Listing created successfully!',
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        });
    }
};

export const denyTemporaryProductRequest1 = async (req, res) => {
    const requestId = req.params['id'];
    try {
        const result = await dbInstance.tx(async t => {
            const requestExists = await t.oneOrNone("SELECT * FROM temporary_model_requests WHERE request_id=$1 AND request_status=$2", [requestId, PRODUCT_REQUEST_STATUS.PENDING]);

            if (!requestExists) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: 'Request not found or not in pending status.'
                });
            }
            await t.none('UPDATE temporary_model_requests SET request_status=$1 WHERE request_id=$2', [PRODUCT_REQUEST_STATUS.REJECTED, requestId]);
            return requestId;
        });

        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Request denied successfully!',
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};