import { StatusCodes } from "http-status-codes";
import { validateErrors } from "../validators/common_validation.js";
import { uploadbanner } from "../utils/utils.js";
import db from '../db/db.js'


export const addbanner = async (req, res) => {
    const { description, title, url } = req.body;

    if (!title || !url) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Title and URL are required fields",
        });
    }

    try {
        const insertBannerQuery = `
            INSERT INTO banners (description, title, url)
            VALUES ($1, $2, $3)
            RETURNING id
        `;
        const result = await db.one(insertBannerQuery, [description, title, url]);

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Banner added successfully!',
            bannerId: result.id
        });
    } catch (error) {
        console.error('Error adding banner:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to add banner',
        });
    }
};

export const getAllbanners = async (req, res) => {
    try {
        const query = `
            SELECT id, title, url, description
            FROM banners
        `;
        const banners = await db.any(query);

        res.status(StatusCodes.OK).json({
            success: true,
            data: banners,
        });
    } catch (error) {
        console.error('Error getting banners:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to retrieve banners',
        });
    }
};

export const editbanner = async (req, res) => {
    const id = req.params.id;
    const { description, title, url } = req.body;

    try {
        const updateQuery = `
            UPDATE banners
            SET description = $1, title = $2, url = $3
            WHERE id = $4
        `;
        await db.none(updateQuery, [description, title, url, id]);

        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Banner updated successfully!',
        });
    } catch (error) {
        console.error('Error updating banner:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to update banner',
        });
    }
};

export const deletebanner = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteQuery = `
            DELETE FROM banners
            WHERE id = $1
        `;
        await db.none(deleteQuery, [id]);

        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Banner deleted successfully!',
        });
    } catch (error) {
        console.error('Error deleting banner:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to delete banner',
        });
    }
};


export const uploadbannervideo = async (req, res) => {

    return await uploadbanner(req, res);

}