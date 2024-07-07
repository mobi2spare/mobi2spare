import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
    user:  process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT, // Default PostgreSQL port
  };
  
  import pgPromise from 'pg-promise';
  const pgp = pgPromise({});
  const connectionString = `postgres://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
  const db = pgp(connectionString);
  db.connect()
    .then(obj => {
        // Can check the server version here (pg-promise v10.1.0+):
        obj.done(); // success, release the connection;
        console.log('Connected')
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
});
export default db;
