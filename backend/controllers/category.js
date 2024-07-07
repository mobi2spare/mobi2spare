import { StatusCodes } from "http-status-codes";
import { validateErrors } from "../validators/common_validation.js";
import { uploadCategoryImage  as uploadImage } from "../utils/utils.js";
import db from '../db/db.js'

export const addCategory = async (req, res, next) => {

    if (validateErrors(req, res) == undefined) {

        const { name } = req.body;

        if (!name) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please Provide Required Information",
            });
        }

        const result = await db.any('SELECT * FROM categories WHERE name = $1', [name]);
        const category = result.length > 0 && result[0];

        if (category) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Category already exists",
            });
        } else {
            await db.any('INSERT INTO categories (name) VALUES ($1)', [name]);

            res.status(StatusCodes.CREATED).json({ message: 'Category created successfully!' });
        }

    }

};

export const getInfoForCategory = async (req, res) => {

    const categoryId = req.params['id'];
    console.log(categoryId);
    try {
        const query = 'SELECT categories.*, json_agg(images.image_path) AS image_path FROM categories LEFT JOIN category_image_mapping cim ON categories.id = cim.category_id \
        LEFT JOIN images ON images.id = cim.image_id  WHERE categories.id = $1 GROUP BY categories.id';
        const result = await db.any(query, [categoryId]);
        res.status(StatusCodes.OK).json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
    }


}

export const updateCategoryWithImage = async (req, res) => {

    const categoryId = req.params['id'];

    if (categoryId != undefined) {

        try {

            const { imagePath } = req.body;

            if (imagePath) {


                await req.pool.query('BEGIN')

                const result = await db.any('INSERT INTO images (image_path) VALUES ($1) RETURNING ID', [imagePath]);

                if (result.rows.length >= 1) {
                    const imageId = result.rows[0].id;

                    await req.pool.query('INSERT INTO category_image_mapping (category_id, image_id) VALUES ($1,$2)', [categoryId, imageId]);

                    await req.pool.query('COMMIT')

                    res.status(StatusCodes.OK).json({ message: 'Listing updated successfully!' });

                }

                else {

                    await req.pool.query('ROLLBACK')

                    res.status(StatusCodes.OK).json({ message: 'Failed to update category!' });
                }


            }

            else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });

            }

        } catch (error) {
            console.error('Error adding Item:', error);
            await req.pool.query('ROLLBACK')
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });

        }

    }

    else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
    }


}

export const getAllCategories = async (req, res) => {


    const query = `
        SELECT categories.*,  json_agg(images.image_path) AS image_path
        FROM categories
        LEFT JOIN category_image_mapping cim ON categories.id = cim.category_id
        LEFT JOIN images ON images.id = cim.image_id  
        GROUP BY categories.id
        ORDER BY id ASC

    `;

    const result = await db.any(query);

    res.status(StatusCodes.OK).json({
        success: true,
        data: result,
    });

};

export const updateCategory = async (req, res) => {

    const id = req.params['id'];
    if (validateErrors(req) == undefined) {
        const { name } = req.body;
        await db.any('UPDATE categories set name = $1 WHERE id = $2', [name, id]);
        res.status(StatusCodes.OK).json({
            success: true,
        });
    }

};


export const deleteCategory = async (req, res) => {

    const id = req.params['id'];
        await db.any('DELETE FROM categories WHERE id = $1', [id]);
        res.status(StatusCodes.OK).json({
            success: true,
        });

};

export const uploadCategoryImage = async (req, res) => {

    return await uploadImage(req, res);

}