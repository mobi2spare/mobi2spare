import { StatusCodes } from "http-status-codes";
import db from '../db/db.js';

export const addBrand = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please Provide Required Information",
        });
    }

    try {
        const result = await db.any('SELECT * FROM brands WHERE name = $1', [name]);
        const brand = result.length > 0 && result[0];

        if (brand) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Brand name already exists",
            });
        } else {
            const insertBrandQuery = 'INSERT INTO brands (name) VALUES ($1) RETURNING id';
            const brandResult = await db.one(insertBrandQuery, [name]);

            if (!brandResult) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create brand' });
            }

            res.status(StatusCodes.CREATED).json({ message: 'Brand created successfully!' });
        }
    } catch (error) {
        console.error('Error adding brand:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const getAllBrands = async (req, res) => {
    try {
        const query = `
            SELECT brands.*, json_agg(model) AS models
            FROM brands
            LEFT JOIN model ON model.brand_id = brands.id
            GROUP BY brands.id
            ORDER BY brands.id ASC
        `;
        const result = await db.any(query);

        res.status(StatusCodes.OK).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error('Error getting all brands:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const updateBrand = async (req, res) => {
    const id = req.params['id'];
    const { name } = req.body;

    if (!name) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please Provide Required Information",
        });
    }

    try {
        const updateBrandQuery = 'UPDATE brands SET name = $1 WHERE id = $2';
        await db.none(updateBrandQuery, [name, id]);

        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Brand updated successfully!'
        });
    } catch (error) {
        console.error('Error updating brand:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const deleteBrand = async (req, res) => {
    const id = req.params['id'];

    try {
        const deleteBrandQuery = 'DELETE FROM brands WHERE id = $1';
        await db.none(deleteBrandQuery, [id]);

        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Brand deleted successfully!'
        });
    } catch (error) {
        console.error('Error deleting brand:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const getBrandById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Brand ID is required' });
    }

    try {
        const result = await db.oneOrNone('SELECT name FROM brands WHERE id = $1', [id]);

        if (!result) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Brand not found' });
        }

        res.status(StatusCodes.OK).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Error fetching brand:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};
