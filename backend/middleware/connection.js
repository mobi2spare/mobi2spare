import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

// Override default values with environment variables if present
const poolConfig = {
    user: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
};

const pool = new Pool(poolConfig);

export const acquireConnection = async (req, res, next) => {
    try {
        req.pool = await pool.connect();
        next();
    } catch (error) {
        throw new Error('Error acquiring connection');
    }
};

export const releaseConnection = async (req, res) => {
    try {
        const client = req.pool;
        if (client) {
            await client.release();
        }
    } catch (error) {
        console.error('Error releasing connection:', error);
    }
};
