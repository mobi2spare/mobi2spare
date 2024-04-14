import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { validateErrors } from "../validators/common_validation.js";


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
            const category = result.rows[0];

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

        finally {
            await req.pool.release();
        }
    }

};

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
          
                const result = await req.pool.query('INSERT INTO attribute_value (attribute_id, value) VALUES ($1,$2) RETURNING id', [id,attribute_value]);

                res.status(StatusCodes.CREATED).json({ message: 'Attribute value created successfully!' });
            
        } catch (error) {
            console.error('Error adding attribute:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
        }

        finally {
            await req.pool.release();
        }
    }

};