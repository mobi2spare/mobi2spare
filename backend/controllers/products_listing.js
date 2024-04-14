import { StatusCodes } from "http-status-codes";
import { validateErrors } from "../validators/common_validation.js";
import { withTransaction } from "./transactions.js";
import { uploadImage } from "../utils/utils.js";

export const addProductForSeller = async (req, res) => {

    if (validateErrors(req, res) == undefined) {

        const { name, brand_id, category_id, quantity, description, price, product_condition, seller_id, attribute_value_id } = req.body;


        try {

            const result = await req.pool.query('INSERT INTO products (name, brand_id, category_id, quantity, description, seller_id,price, product_condition) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id', [name, brand_id, category_id, quantity, description, seller_id, price, product_condition]);
            await req.pool.query('INSERT INTO product_attributes (product_id, attribute_value_id) VALUES ($1,$2)', [result.rows[0].id, attribute_value_id]);
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: 'Listing created successfully!',
                data: result.rows[0].id,
            });

        } catch (error) {
            console.error('Error adding Item:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
        }

        finally {
            await req.pool.release();
        }
    }

};

export const updateProductWithImage = async (req, res) => {

    const productId = req.params['id'];

    if (productId != undefined) {

        try {

            const { imagePath } = req.body;

            if (imagePath) {


                await req.pool.query('BEGIN')

                const result = await req.pool.query('INSERT INTO images (image_path) VALUES ($1) RETURNING ID', [imagePath]);

                if (result.rows.length >= 1) {
                    const imageId = result.rows[0].id;

                    await req.pool.query('INSERT INTO product_image_mapping (product_id, image_id) VALUES ($1,$2)', [productId, imageId]);

                    await req.pool.query('COMMIT')

                    res.status(StatusCodes.OK).json({ message: 'Listing updated successfully!' });

                }

                else {

                    await req.pool.query('ROLLBACK')

                    res.status(StatusCodes.OK).json({ message: 'Failed to update product!' });
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

export const updateProductForSeller = async (req, res) => {

    const productId = req.params['id'];

    if (validateErrors(req, res) == undefined && productId != undefined) {

        try {

            let setClause = "";
            const params = [productId];
            let index = 1;
            for (const field in req.body) {
                if (setClause.length > 0) setClause += ", ";
                setClause += `${field} = $${index + 1}`;
                // brand_id = $1, category_id = $2, quantity = $3, description = $4, price = $5, seller_id = $6
                params.push(req.body[field]);
                index++;
            }

            // Construct the UPDATE query
            const query = `UPDATE products SET ${setClause} WHERE id = $1`;

            await req.pool.query(query, params);

            res.status(StatusCodes.CREATED).json({ message: 'Listing updated successfully!' });

        } catch (error) {
            console.error('Error adding Item:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
        }
        finally {
            await req.pool.release();
        }
    }

};

export const deleteProductForSeller = async (req, res) => {


    const productId = req.params['id'];

    try {

        const result = await req.pool.query('DELETE FROM  products WHERE id = $1', [productId]);

        res.status(StatusCodes.CREATED).json({ message: 'Listing deleted successfully!' });

    } catch (error) {
        console.error('Error deleting Item:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
    }

    finally {
        await req.pool.release();
    }


};

export const getInfoForProduct = async (req, res) => {

    const productId = req.params['pid'];
    try {
        const query = 'SELECT products.*, json_agg(images.image_path) AS image_path FROM products LEFT JOIN product_image_mapping pim ON products.id = pim.product_id \
        LEFT JOIN images ON images.id = pim.image_id  WHERE products.id = $1 GROUP BY products.id';
        const result = await req.pool.query(query, [productId]);
        console.log(result.rows[0]);
        res.status(StatusCodes.OK).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Error getting products:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
    }
}


export const getAllProducts = async (req, res) => {


    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    try {

        const totalProductsQuery = 'SELECT COUNT(*) AS total FROM products';
        const totalResult = await req.pool.query(totalProductsQuery);
        const total = totalResult.rows[0].total; // Assuming a single row result

        const offset = (page - 1) * limit;

        const query = `
                SELECT products.price,products.id as pid, products.name, products.description,products.brand_id, products.category_id, categories.name as cname, brands.name as bname, COALESCE(
                    json_agg(json_build_object(attributes.attribute_name, attribute_value.value)),
                    '[]' 
                  ) AS attribute_info,
                  COALESCE(json_agg(images.image_path)FILTER (WHERE images.image_path IS NOT NULL), '[]') AS image_path 
                FROM products
                LEFT JOIN product_image_mapping pim ON products.id = pim.product_id
                LEFT JOIN images ON images.id = pim.image_id 
                INNER JOIN categories ON products.category_id = categories.id
                INNER JOIN brands ON products.brand_id = brands.id 
                LEFT JOIN product_attributes ON products.id = product_attributes.product_id
                INNER JOIN attribute_value ON product_attributes.attribute_value_id = attribute_value.id
                INNER JOIN attributes ON attribute_value.id = attributes.id
                GROUP BY products.id,categories.name,brands.name
                ORDER BY products.id ASC
                LIMIT $1
                OFFSET $2`;

        const values = [limit, offset]; // Parameters for prepared statement

        const result = await req.pool.query(query, values);

        res.status(StatusCodes.OK).json({
            success: true,
            data: result.rows,
            pagination: {
                total,  // Total number of products (optional if not included in totalProductsQuery)
                limit,
                page,
                offset,
                totalPages: Math.ceil(total / limit), // Calculate total pages based on total and limit
            },
        });

    }

    catch (error) {
        console.error('Error getting products:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });

    }

    finally {
        await req.pool.release();
    }
};

export const uploadProductImage = async (req, res) => {

    return await uploadImage(req, res);

}