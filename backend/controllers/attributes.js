import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { validateErrors } from "../validators/common_validation.js";
import db from '../db/db.js'

export const getAttributeValuesForCategories = async (req, res) => {
    // const categoryid = req.params['cid'];

    try {
        const result = await db.any('SELECT  ca.category_id as categoryid, a.attribute_name as name, json_agg(json_build_object( av.id, av.value)) AS category_attribute_values FROM attribute_info AS a INNER JOIN attribute_value AS av ON av.attribute_id = a.id INNER JOIN category_attributes AS ca ON ca.attribute_id = a.id  GROUP BY a.attribute_name,ca.category_id', []);
                res.status(StatusCodes.OK).json({
                    success: true,
                    data: result
                });
    } catch (error) {
        console.error('Error adding attribute:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
    }
}

export const addAttribute = async (req, res) => {

    if (validateErrors(req, res) == undefined) {
        const { attribute_name } = req.body;

        if (!attribute_name) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please Provide Required Information",
            });
        }
        try {
            const result = await req.pool.query('SELECT * FROM attributes WHERE attribute_name = $1', [attribute_name]);
            const category = result[0];

            if (category) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Attribute already exists",
                });
            } else {
                const result = await req.pool.query('INSERT INTO attributes (attribute_name) VALUES ($1) RETURNING id', [attribute_name]);

                res.status(StatusCodes.CREATED).json({ message: 'Attribute created successfully!' });
            }
        } catch (error) {
            console.error('Error adding attribute:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
        }

     
    }

};

export const mapCategoryToAttributes = async (req, res) => {
    const categoryid = req.params['cid'];
    const attributeid = req.params['aid'];
    console.log(categoryid);
    try {
        const result = await req.pool.query('INSERT INTO category_attributes (attribute_id, category_id) VALUES ($1,$2)', [categoryid, attributeid]);
        res.status(StatusCodes.CREATED).json({ message: 'Attribute value updated successfully!' });
    } catch (error) {
        console.error('Error adding attribute:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
    }



}

export const addAttributeValue = async (req, res) => {

    if (validateErrors(req, res) == undefined) {
        const { attribute_value } = req.body;
        const id = req.params['id'];

        if (!attribute_value) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please Provide Required Information",
            });
        }
        try {

            const result = await db.any('INSERT INTO attribute_value (attribute_id, value) VALUES ($1,$2) RETURNING id', [id, attribute_value]);

            res.status(StatusCodes.CREATED).json({ message: 'Attribute value created successfully!' });

        } catch (error) {
            console.error('Error adding attribute:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
        }

        
    }

};