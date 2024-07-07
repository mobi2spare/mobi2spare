
The sql file is located in sql/sql.sql and needs to be imported into a local pg server.
Run the backend from the backend folder using npm start, same for frontend

Create a .env file in backend with following values :

DATABASE_USERNAME = 'your db username'
DATABASE_PASSWORD = 'your db password'
DATABASE_HOST = 'localhost'
DATABASE_PORT = 5432
DATABASE_NAME = 'mobi2spare'
PORT = '8800'
JWT_SECRET = 'any secret'
FILE_UPLOAD_PATH = 'uploads/'
OTP_EXPIRATION_TIME = 10;
OTP_LENGTH = 6;
OTP_SECRET_KEY = 'any secret'
REFRESH_SECRET = 'any secret'
SUREPASS_ADHAR_GENERATE_URL ='https://sandbox.surepass.io/api/v1/aadhaar-v2/generate-otp'
SUREPASS_ADHAR_VERIFY_URL ='https://sandbox.surepass.io/api/v1/aadhaar-v2/submit-otp'
