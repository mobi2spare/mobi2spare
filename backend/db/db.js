import dotenv from 'dotenv';
dotenv.config();
import pgPromise from 'pg-promise';

const DATABASE_USERNAME = process.env.DATABASE_USERNAME ;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD ;
const DATABASE_HOST = process.env.DATABASE_HOST ;
const DATABASE_PORT = process.env.DATABASE_PORT ;
const DATABASE_NAME = process.env.DATABASE_NAME ;

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
    
export default db;
