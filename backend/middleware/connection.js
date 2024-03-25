import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user:  process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT, // Default PostgreSQL port
});

export const acquireConnection = async (req, res, next) => {
    try {
      req.pool = await pool.connect();
      next();
    } catch (error) {
      console.error('Error acquiring connection:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Middleware for releasing connection
export  const releaseConnection = async (req, res) => {
    try {
      const client = req.pool;
      if (client) {
        await client.release();
      }
    } catch (error) {
      console.error('Error releasing connection:', error);
    }
  };