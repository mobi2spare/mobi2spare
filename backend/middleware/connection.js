import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

// Default values if environment variables are not defined
const defaultDatabaseConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'mobi2spare',
    password: '8520',
    port: 5432,
};

// Override default values with environment variables if present
const poolConfig = {
    user: process.env.DATABASE_USERNAME || defaultDatabaseConfig.user,
    host: process.env.DATABASE_HOST || defaultDatabaseConfig.host,
    database: process.env.DATABASE_NAME || defaultDatabaseConfig.database,
    password: process.env.DATABASE_PASSWORD || defaultDatabaseConfig.password,
    port: process.env.DATABASE_PORT || defaultDatabaseConfig.port,
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
