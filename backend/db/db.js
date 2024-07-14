import dotenv from 'dotenv';
dotenv.config();
import pgPromise from 'pg-promise';

const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'postgres';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '8520';
const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
const DATABASE_PORT = process.env.DATABASE_PORT || 5432;
const DATABASE_NAME = process.env.DATABASE_NAME || 'mobi2spare';

const dbConfig = {
  user: DATABASE_USERNAME,
  host: DATABASE_HOST,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
};

const pgp = pgPromise({});
const db = pgp(dbConfig);

db.connect()
  .then(obj => {
    obj.done(); // success, release the connection;
    console.log('Connected to the database');
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });

  const fetchCategories = async () => {
    const query = 'SELECT id, name FROM public.categories ORDER BY id ASC';
  
    try {
      const categories = await db.any(query);
      console.log('Categories:', categories);
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };
  
  fetchCategories();
  
export default db;
