import { StatusCodes } from "http-status-codes";
import { validateErrors } from "../validators/common_validation.js";
import { upload } from "../constants/constants.js";

export const addProductForSeller = async (req, res) => {

    if (validateErrors(req) == undefined) {

        const { brand_id, category_id, quantity, description, price, product_condition, seller_id } = req.body;


        try {

            const result = await req.pool.query('INSERT INTO products (brand_id, category_id, quantity, description, seller_id,price, product_condition) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *', [brand_id, category_id, quantity, description, seller_id, price, product_condition]);

            res.status(StatusCodes.CREATED).json({
                success: true,
                message: 'Listing created successfully!',
                data: result.rows,
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


export const updateProductForSeller = async (req, res) => {

    if (validateErrors(req) == undefined) {

        const productId = req.params['id'];

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


export const getAllProducts = async (req, res) => {


    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    try {

        const totalProductsQuery = 'SELECT COUNT(*) AS total FROM products';
        const totalResult = await req.pool.query(totalProductsQuery);
        const total = totalResult.rows[0].total; // Assuming a single row result

        const offset = (page - 1) * limit;

        const query = `
            SELECT *
            FROM products
            ORDER BY id ASC
            LIMIT $1
            OFFSET $2
        `;

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

    if (req.file) {
        // const filename = req.file.filename;
        // const path = req.file.path;
        // const mimetype = req.file.mimetype;
        return res.status(StatusCodes.OK).json({
            success: true,
            path : {'key' : `${process.env.FILE_UPLOAD_PATH}\`${req.params['uid']}`},
            message: "Success, Image uploaded!",
          });
      } else {
        res.status(400).json({ message: 'No file uploaded' });
      }

}