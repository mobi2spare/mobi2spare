import { StatusCodes } from "http-status-codes";
import { validateErrors } from "../validators/common_validation.js";
import db from '../db/db.js'


export const addBrand = async (req, res) => {

    if (validateErrors(req, res) == undefined) {
        const { name } = req.body;

        if (!name) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please Provide Required Information",
            });
        }
        try {
            const result = await db.any('SELECT * FROM brands WHERE name = $1', [name]);
            const brand = result[0];

            if (brand) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Brand name already exists",
                });
            } else {
                await db.none('INSERT INTO brands (name) VALUES ($1)', [name]);


                res.status(StatusCodes.CREATED).json({ message: 'Brand created successfully!' });
            }
        } catch (error) {
            console.error('Error adding Brand:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
        }
        
    }

};

export const getAllBrands = async (req, res) => {
        const result = await db.manyOrNone('SELECT name,brands.id FROM brands INNER JOIN model on model.brand_id = brands.id GROUP BY brands.name,brands.id');
        res.status(StatusCodes.OK).json({
            success: true,
            data: result,
        });
};


export const updateBrand = async (req, res) => {

    const id = req.params['id'];
    if (validateErrors(req, res) == undefined) {
        const { name } = req.body;

        try {
            const result = await db.none('UPDATE brands set name = $1 WHERE id = $2', [name,id]);
            res.status(StatusCodes.OK).json({
                success: true,
                data: result.rows,
            });
        }

        catch (error) {
            console.error('Error updating brand:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });


        }
       
    }
};

export const deleteBrand = async (req, res) => {

    const id = req.params['id'];

    try {
        const result = await db.any('DELETE FROM brands WHERE id = $1', [id]);
        // TODO PAGINATION?
        res.status(StatusCodes.OK).json({
            success: true,
            data: result,
        });
    }

    catch (error) {
        console.error('Error deleting brand:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });

    }

  

};