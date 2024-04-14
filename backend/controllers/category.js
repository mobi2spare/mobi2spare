import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { validateErrors } from "../validators/common_validation.js";
import { uploadImage } from "../utils/utils.js";


export const addCategory = async (req, res) => {

    if (validateErrors(req, res) == undefined) {
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

export const getInfoForCategory = async (req, res) =>{

    const categoryId = req.params['id'];
    console.log(categoryId);
    try {
        const query = 'SELECT categories.*, json_agg(images.image_path) AS image_path FROM categories LEFT JOIN category_image_mapping cim ON categories.id = cim.category_id \
        LEFT JOIN images ON images.id = cim.image_id  WHERE categories.id = $1 GROUP BY categories.id';
        const result = await req.pool.query(query, [categoryId]);
        console.log(result.rows[0]);
        res.status(StatusCodes.OK).json({
            success: true,
            data: result.rows[0]
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

                const result = await req.pool.query('INSERT INTO images (image_path) VALUES ($1) RETURNING ID', [imagePath]);

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

        finally {
            await req.pool.release();
        }




    }

    else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
    }


}

export const getAllCategories = async (req, res) => {

    try {

        const query = `
            SELECT categories.*,  json_agg(images.image_path) AS image_path
            FROM categories
            LEFT JOIN category_image_mapping cim ON categories.id = cim.category_id
            LEFT JOIN images ON images.id = cim.image_id  
            GROUP BY categories.id
            ORDER BY id ASC

        `;

        const result = await req.pool.query(query);

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

export const uploadCategoryImage = async (req, res) => {

    return await uploadImage(req, res);

}