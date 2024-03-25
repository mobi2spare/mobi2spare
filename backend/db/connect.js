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

export const validateConnection  = (async () => {
  try {
    // Attempt a connection to the database
    const client = await pool.connect();

    console.log('Successfully connected to PostgreSQL database!');

    // Optionally, execute a simple query to verify database functionality
    const res = await client.query('SELECT 1 + 1 AS test');
    console.log('Test query result:', res.rows[0]);

    // Release the connection back to the pool
    client.release();
    
    return pool;

  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  } finally {
    // Close the connection pool when finished (optional, but recommended for production)
    await pool.end();
  }
});

