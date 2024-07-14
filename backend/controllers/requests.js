import { StatusCodes } from "http-status-codes";
import db from '../db/db.js'

export const fetchRequestedFeedForUser = async (req, res) => {
    let userId = req.params['userId'];

    const myRequestsQuery = `
        SELECT product_requests.id,product_requests.buyer_id,categories.name AS cname, brands.name AS bname,
        product_requests.brand_id, product_requests.category_id,
        model.model_name as mname,ram_storage.configuration as configuration,
        model.id as model_id,ram_storage.id as  configuration_id,
        COALESCE(
        json_agg(DISTINCT jsonb_build_object('attribute_value_id',attribute_value.id,'attribute_name',attribute_info.attribute_name,'attribute_value', attribute_value.value))
        FILTER (WHERE attribute_info.attribute_name IS NOT NULL),  -- Filter nulls before building object
        '[]'
            ) AS attribute_info,
                        COALESCE(json_agg(images.image_path) FILTER (WHERE images.image_path IS NOT NULL), '[]') AS image_path
                FROM product_requests
                LEFT JOIN product_request_image_mapping pim ON product_requests.id = pim.product_request_id
                LEFT JOIN images ON images.id = pim.image_id
                INNER JOIN categories ON product_requests.category_id = categories.id
                INNER JOIN brands ON product_requests.brand_id = brands.id
                INNER JOIN model on model.id = product_requests.model_id
                INNER JOIN ram_storage ON ram_storage.id = product_requests.ram_storage_id
                INNER JOIN product_request_attributes ON product_requests.id = product_request_attributes.product_request_id
                INNER JOIN attribute_value ON product_request_attributes.attribute_value_id = attribute_value.id
                INNER JOIN attribute_info ON attribute_value.attribute_id = attribute_info.id
                LEFT JOIN cartitems ON cartitems.product_id = product_requests.id
                WHERE product_requests.buyer_id=$1
                GROUP BY product_requests.id, categories.name, brands.name,model.model_name,ram_storage.configuration,product_requests.buyer_id,model.id,ram_storage.id`
    const otherUserRequestsQuery = `
                SELECT product_requests.id, categories.name AS cname, brands.name AS bname,
                model.model_name as mname,ram_storage.configuration as configuration,
                product_requests.brand_id, product_requests.category_id,
                model.id as model_id,ram_storage.id as  configuration_id,
                COALESCE(
                json_agg(DISTINCT jsonb_build_object('attribute_value_id',attribute_value.id,'attribute_name',attribute_info.attribute_name,'attribute_value', attribute_value.value))
                FILTER (WHERE attribute_info.attribute_name IS NOT NULL),  -- Filter nulls before building object
                '[]'
                    ) AS attribute_info,
                                COALESCE(json_agg(images.image_path) FILTER (WHERE images.image_path IS NOT NULL), '[]') AS image_path
                        FROM product_requests
                        LEFT JOIN product_request_image_mapping pim ON product_requests.id = pim.product_request_id
                        LEFT JOIN images ON images.id = pim.image_id
                        INNER JOIN categories ON product_requests.category_id = categories.id
                        INNER JOIN brands ON product_requests.brand_id = brands.id
                        INNER JOIN model on model.id = product_requests.model_id
                        INNER JOIN ram_storage ON ram_storage.id = product_requests.ram_storage_id
                        INNER JOIN product_request_attributes ON product_requests.id = product_request_attributes.product_request_id
                        INNER JOIN attribute_value ON product_request_attributes.attribute_value_id = attribute_value.id
                        INNER JOIN attribute_info ON attribute_value.attribute_id = attribute_info.id
                        LEFT JOIN cartitems ON cartitems.product_id = product_requests.id
                        WHERE product_requests.buyer_id!=$1
                        GROUP BY product_requests.id, categories.name, brands.name,model.model_name,ram_storage.configuration,model.id,ram_storage.id`

    const values = [userId]; // Parameters for prepared statement
    const myRequestsResult = await db.manyOrNone(myRequestsQuery, values);
    const otherRequestsResult = await db.manyOrNone(otherUserRequestsQuery, values);
    console.log(myRequestsResult)
    return res.status(StatusCodes.OK).json({
        success: true,
        data: {
            myRequests: myRequestsResult,
            otherRequests: otherRequestsResult
        }
    })


}

export const deleteRequestForUser = async (req, res) => {

    let userId = req.params['userId'];
    const deleteUserIdQuery = 'DELETE FROM product_requests WHERE product_requests.buyer_id=$1'
    const values = [userId];
    await db.none(deleteUserIdQuery, values);
    return res.status(StatusCodes.OK).json({
        success: true,
        message: 'Request deleted successfully'
    })
}