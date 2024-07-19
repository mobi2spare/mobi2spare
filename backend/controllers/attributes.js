import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import db from '../db/db.js';

// Fetch attribute values for categories
export const getAttributeValuesForCategories = async (req, res) => {
    try {
        const result = await db.any('SELECT ca.category_id as categoryid, a.attribute_name as name, json_agg(json_build_object(av.id, av.value)) AS category_attribute_values FROM attribute_info AS a INNER JOIN attribute_value AS av ON av.attribute_id = a.id INNER JOIN category_attributes AS ca ON ca.attribute_id = a.id GROUP BY a.attribute_name, ca.category_id', []);
        res.status(StatusCodes.OK).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Error fetching attribute values:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching attribute values' });
    }
};

// Add a new attribute
export const addAttribute = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { attribute_name } = req.body;

    try {
        const existingAttribute = await db.oneOrNone('SELECT * FROM attributes WHERE attribute_name = $1', [attribute_name]);
        if (existingAttribute) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Attribute already exists",
            });
        }

        const newAttribute = await db.one('INSERT INTO attributes (attribute_name) VALUES ($1) RETURNING id', [attribute_name]);
        res.status(StatusCodes.CREATED).json({ message: 'Attribute created successfully!', attribute_id: newAttribute.id });
    } catch (error) {
        console.error('Error adding attribute:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error adding attribute' });
    }
};

// Map attribute to a category
export const mapCategoryToAttributes = async (req, res) => {
    const { cid: categoryid, aid: attributeid } = req.params;
    
    try {
        await db.none('INSERT INTO category_attributes (attribute_id, category_id) VALUES ($1, $2)', [attributeid, categoryid]);
        res.status(StatusCodes.CREATED).json({ message: 'Attribute mapped to category successfully!' });
    } catch (error) {
        console.error('Error mapping attribute to category:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error mapping attribute to category' });
    }
};

// Add a new attribute value
export const addAttributeValue = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { attribute_value } = req.body;
    const { id } = req.params;

    try {
        const result = await db.one('INSERT INTO attribute_value (attribute_id, value) VALUES ($1, $2) RETURNING id', [id, attribute_value]);
        res.status(StatusCodes.CREATED).json({ message: 'Attribute value created successfully!', attribute_value_id: result.id });
    } catch (error) {
        console.error('Error adding attribute value:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error adding attribute value' });
    }
};


export const getAttributeValuesbyid = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ success: false, message: 'Attribute ID is required' });
    }

    const query = 'SELECT value FROM attribute_value WHERE id = $1';
    const value = await db.oneOrNone(query, [id]);

    if (!value) {
      return res.status(404).json({ success: false, message: 'Attribute value not found' });
    }

    return res.status(200).json({ success: true, data: value });

  } catch (error) {
    console.error('Error fetching attribute value:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
