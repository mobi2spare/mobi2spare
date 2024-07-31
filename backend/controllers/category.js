import { StatusCodes } from "http-status-codes";
import { validateErrors } from "../validators/common_validation.js";
import { uploadCategoryImage  as uploadImage } from "../utils/utils.js";
import db from '../db/db.js'

export const addCategory = async (req, res, next) => {
    const { name, imagePath } = req.body;

    if (!name || !imagePath) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please Provide Required Information",
        });
    }

    try {
        const result = await db.any('SELECT * FROM categories WHERE name = $1', [name]);
        const category = result.length > 0 && result[0];

        if (category) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Category already exists",
            });
        } else {
            const insertCategoryQuery = 'INSERT INTO categories (name) VALUES ($1) RETURNING id';
            const categoryResult = await db.one(insertCategoryQuery, [name]);

            if (!categoryResult) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create category' });
            }

            const categoryId = categoryResult.id;

            const insertImageQuery = 'INSERT INTO images (image_path) VALUES ($1) RETURNING id';
            const imageResult = await db.one(insertImageQuery, [imagePath]);
            //console.log("kl");
            if (!imageResult) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to insert image' });
            }

            const imageId = imageResult.id;

            const insertMappingQuery = 'INSERT INTO category_image_mapping (category_id, image_id) VALUES ($1, $2)';
            await db.none(insertMappingQuery, [categoryId, imageId]);

            res.status(StatusCodes.CREATED).json({ message: 'Category created successfully!' });
        }
    } catch (error) {
        console.error('Error creating category:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
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

/*export const updateCategoryWithImage = async (req, res) => {
    const categoryId = req.params['id'];

    if (!categoryId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Category ID is required' });
    }

    try {
        const { imagePath } = req.body;

        if (!imagePath) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Image path is required' });
        }

        const insertImageQuery = 'INSERT INTO images (image_path) VALUES ($1) RETURNING id';
        const imageResult = await db.one(insertImageQuery, [imagePath]);

        if (!imageResult) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to insert image' });
        }

        const imageId = imageResult.id;

        const insertMappingQuery = 'INSERT INTO category_image_mapping (category_id, image_id) VALUES ($1, $2)';
        await db.none(insertMappingQuery, [categoryId, imageId]);

        return res.status(StatusCodes.OK).json({ message: 'Category updated successfully!' });

    } catch (error) {
        console.error('Error updating category:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};*/

export const updateCategoryImage = async (req, res) => {
    const categoryId = req.params['id'];

    if (!categoryId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Category ID is required' });
    }

    const { imagePath } = req.body;

    if (!imagePath) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Image path is required' });
    }

    try {
        const selectMappingQuery = 'SELECT image_id FROM category_image_mapping WHERE category_id = $1';
        const mappingResult = await db.any(selectMappingQuery, [categoryId]);

        if (mappingResult.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'No image found for the given category ID' });
        }

        const imageId = mappingResult[0].image_id;

        const updateImageQuery = 'UPDATE images SET image_path = $1 WHERE id = $2';
        await db.none(updateImageQuery, [imagePath, imageId]);

        return res.status(StatusCodes.OK).json({ message: 'Category image updated successfully!' });

    } catch (error) {
        console.error('Error updating category image:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};


export const deleteCategoryImage = async (req, res) => {
    const categoryId = req.params['id'];

    if (!categoryId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Category ID is required' });
    }

    try {
        const fetchMappingQuery = 'SELECT image_id FROM category_image_mapping WHERE category_id = $1';
        const mappings = await db.any(fetchMappingQuery, [categoryId]);

        if (mappings.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'No images found for the given category ID' });
        }

        const imageId = mappings[0].image_id;

        const deleteImageQuery = 'DELETE FROM images WHERE id = $1';
        await db.none(deleteImageQuery, [imageId]);

        const deleteMappingQuery = 'DELETE FROM category_image_mapping WHERE category_id = $1 AND image_id = $2';
        await db.none(deleteMappingQuery, [categoryId, imageId]);

        return res.status(StatusCodes.OK).json({ message: 'Image deleted successfully!' });

    } catch (error) {
        console.error('Error deleting image:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};



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
    //if (validateErrors(req) == undefined) {
        const { name } = req.body;
        await db.any('UPDATE categories set name = $1 WHERE id = $2', [name, id]);
        res.status(StatusCodes.OK).json({
            success: true,
        });
    //}

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