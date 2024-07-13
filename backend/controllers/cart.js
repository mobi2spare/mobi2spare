import { StatusCodes } from "http-status-codes";
import db from '../db/db.js'


export const addItemToCart = async (req, res) => {


    const { cart_id, product_id } = req.body;
    const cartid = await db.one('INSERT INTO cartitems ( cart_id, product_id, quantity) VALUES ($1,$2,$3) ON CONFLICT(cart_id, product_id) DO UPDATE SET quantity=cartitems.quantity+1 RETURNING cart_id,quantity ', [cart_id, product_id, 1]);

    return res.status(StatusCodes.OK).json({
        success: true,
        data: cartid
    })

}

export const updateCartQuantity = async (req, res) => {

    const { cart_id, product_id,quantity } = req.body;
    if (quantity >= 1) {
        await db.oneOrNone('UPDATE cartitems SET quantity = $1 WHERE  cart_id=$2 AND product_id=$3 RETURNING cart_id', [quantity,cart_id, product_id]);

    }
    else if (quantity === 0) {
        await db.none('DELETE FROM cartitems where cart_id=$1 AND product_id=$2', [cart_id, product_id]);
    }

    return res.status(StatusCodes.OK).json({
        success: true,
    })

};

export const getItemsFromCartForCartId = async (req, res) => {

    const cart_id = req.params['id'];
    console.log(cart_id);
    const query = `
        SELECT products.quantity as quantity,cartitems.quantity as cartQuantity,products.price, products.id, products.name, products.description, products.brand_id, products.category_id, categories.name AS cname, brands.name AS bname,
        model.model_name as mname,ram_storage.configuration as configuration,
        COALESCE(
        json_agg(json_build_object(attribute_info.attribute_name, attribute_value.value))
        FILTER (WHERE attribute_info.attribute_name IS NOT NULL),  -- Filter nulls before building object
        '[]'
            ) AS attribute_info,
                        COALESCE(json_agg(images.image_path) FILTER (WHERE images.image_path IS NOT NULL), '[]') AS image_path
                FROM products
                LEFT JOIN product_image_mapping pim ON products.id = pim.product_id
                LEFT JOIN images ON images.id = pim.image_id
                INNER JOIN categories ON products.category_id = categories.id
                INNER JOIN brands ON products.brand_id = brands.id
                INNER JOIN model on model.id = products.model_id
                INNER JOIN ram_storage ON ram_storage.id = products.ram_storage_id
                LEFT JOIN product_attributes ON products.id = product_attributes.product_id
                LEFT JOIN attribute_value ON product_attributes.attribute_value_id = attribute_value.id
                LEFT JOIN attribute_info ON attribute_value.attribute_id = attribute_info.id
                LEFT JOIN cartitems ON cartitems.product_id = products.id
                WHERE products.quantity > 0 AND cart_id=$1
                GROUP BY products.id, categories.name, brands.name,cartitems.quantity,model.model_name,ram_storage.configuration`
    const values = [cart_id]; // Parameters for prepared statement
    const result = await db.manyOrNone(query, values);
    return res.status(StatusCodes.OK).json({
        success: true,
        data: result
    })


}


