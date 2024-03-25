import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { validateErrors } from "../validators/common_validation.js";


export const addCategory = async (req, res) => {

    if (validateErrors(req) == undefined) {
        const { name } = req.body;

        if (!name) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please Provide Required Information",
            });
        }
        try {
            const result = await req.pool.query('SELECT * FROM categories WHERE name = $1', [name]);
            const category = result.rows[0];

            if (category) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Category already exists",
                });
            } else {
                const result = await req.pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING id', [name]);

                res.status(StatusCodes.CREATED).json({ message: 'Category created successfully!' });
            }
        } catch (error) {
            console.error('Error adding category:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
        }

        finally {
            await req.pool.release();
        }
    }

};

export const getAllCategories = async (req, res) => {

    try {
        const result = await req.pool.query('SELECT * FROM categories');
        // TODO PAGINATION?
        res.status(StatusCodes.OK).json({
            success: true,
            data: result.rows,
        });
    }

    catch (error) {
        console.error('Error getting categories:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });

    }

    finally {
        await req.pool.release();
    }
};

export const updateCategory = async (req, res) => {

    const id = req.params['id'];
    if (validateErrors(req) == undefined) {
        const { name } = req.body;

        try {
            const result = await req.pool.query('UPDATE categories set name = $1 WHERE id = $2', [name, id]);
            // TODO PAGINATION?
            res.status(StatusCodes.OK).json({
                success: true,
                data: result.rows,
            });
        }

        catch (error) {
            console.error('Error updating category:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });

        }

        finally {
            await req.pool.release();
        }
    }
};


export const deleteCategory = async (req, res) => {

    const id = req.params['id'];
    try {
        const result = await req.pool.query('DELETE FROM categories WHERE id = $1', [id]);
        // TODO PAGINATION?
        res.status(StatusCodes.OK).json({
            success: true,
            data: result.rows,
        });
    }

    catch (error) {
        console.error('Error deleting category:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });

    }

    finally {
        await req.pool.release();
    }


};