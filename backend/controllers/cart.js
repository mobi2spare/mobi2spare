import { StatusCodes } from "http-status-codes";
import { validateErrors } from "../validators/common_validation.js";
import { ROLES } from "../constants/constants.js";


export const addItemToCart = async (req, res) => {


    const userId = req.params['id'];
    const { product_id } = req.body;

    try {
        await req.pool.query('BEGIN');
        const cardIdForUserQuery = 'SELECT id from Cart WHERE buyer_id = $1';
        const result = await req.pool.query(cardIdForUserQuery, [userId]);
        if (result.rows && result.rows.length > 0) {
            await updateCartItem(req, result, product_id, userId);
            await req.pool.query('COMMIT');
            res.status(StatusCodes.OK).json({ message: 'Cart updated successfully!' });

        }
        else {

            if (req.userRoles == ROLES.GeneralUser) {
                // Create cart entry for user in case not created during user sign up.
                const result = await req.pool.query("INSERT INTO cart (buyer_id) VALUES($1) RETURNING id", [userId]);
                await updateCartItem(req, result, product_id, userId);
                await req.pool.query('COMMIT');
                res.status(StatusCodes.OK).json({ message: 'Cart updated successfully!' });
            }

            else {

                res.status(StatusCodes.FORBIDDEN).json({ 'message': 'Operation not permitted' });
            }
            ``

        }
    } catch (error) {
        await req.pool.query('ROLLBACK')
        console.error('Error adding category:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
    }

    finally {
        await req.pool.release();
    }


};

export const getAllItemsInCartForUser = async (req, res) => {

    const userId = req.params['id'];
    try {
        const result = await req.pool.query('SELECT p.name, p.price,ci.quantity FROM products p INNER JOIN cartitems ci ON ci.product_id = p.id INNER JOIN cart ON \
                        cart.id = ci.cart_id WHERE cart.buyer_id = $1 ',[userId]);
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

export const removeItemFromCart = async (req, res) => {

    const userId = req.params['id'];
    const { product_id } = req.body;

    try {
        await req.pool.query('BEGIN');
        const cardIdForUserQuery = 'SELECT id from Cart WHERE buyer_id = $1';
        const result = await req.pool.query(cardIdForUserQuery, [userId]);
        if (result.rows && result.rows.length > 0 && req.userRoles == ROLES.GeneralUser) {
            await updateCartItem(req, result, product_id, userId, '-');
            await req.pool.query('COMMIT');
            res.status(StatusCodes.OK).json({ message: 'Item Removed From Cart!' });

        }
        else {
            await req.pool.query('ROLLBACK')
            res.status(StatusCodes.FORBIDDEN).json({ 'message': 'Operation not permitted' });

        }


    } catch (error) {
        await req.pool.query('ROLLBACK')
        console.error('Error adding category:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
    }

    finally {
        await req.pool.release();
    }
};



async function updateCartItem(req, result, productId, userId, operator = '+') {
    if (operator == '+' || operator == '-') {
        const cartId = result.rows[0].id;
        const updateQuantity = operator === '+' ? 1 : -1;
        const updateCartItemQuery = `UPDATE CartItems SET quantity = quantity + $3 WHERE cart_id = $1 AND product_id = $2 RETURNING id,quantity`;
        const updateResult = await req.pool.query(updateCartItemQuery, [cartId, productId, updateQuantity]);
        if (updateResult.rows.length === 0) {
            if (operator === '+') {
                const insertCartItemQuery = `INSERT INTO CartItems (cart_id, product_id, quantity) VALUES ($1, $2, 1)`;
                await req.pool.query(insertCartItemQuery, [cartId, productId]);
            }

        }
        if (operator == '-') {
            const newQty = updateResult.rows[0].quantity;
            if (newQty == 0) {
                const deleteCartItemQuery = `DELETE FROM CartItems WHERE cart_id = $1 AND product_id = $2`;
                await req.pool.query(deleteCartItemQuery, [cartId, productId]);
            }
        }

    
    const updateCartQuery = 'UPDATE CART SET item_count = item_count + $2  WHERE buyer_id = $1';
    await req.pool.query(updateCartQuery, [userId, updateQuantity]);
    }
}

