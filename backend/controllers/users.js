import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { validateErrors } from "../validators/common_validation.js";
import { ROLES } from '../constants/constants.js';


export const signIn = async (req, res) => {

  if (validateErrors(req, res) == undefined) {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ message: 'Missing phone or password or invalid role' });
    }

    try {
      const result = await req.pool.query('SELECT username ,password, organization_name, phone,address,user_type FROM users WHERE phone = $1', [phoneNumber]);
      const user = result.rows[0];


      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid phone or password' });
      }

      const validPassword = await bcrypt.compare(password, user.password); // Compare hashed passwords

      if (!validPassword) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid phone or password' });
      }
      const userId = result.rows[0].id;
      const role = result.rows[0].user_type;  // Get role from DB.
      const token = signJWT(userId, role);  // Send JWT token
      // Successful login (send relevant user information or a token, for example)
      res.json({ message: 'Login successful!', user: { id: user.id, phone: user.phone,username:user.username, address:user.address, organization:user.organization_name, token: token } }); // Replace with relevant user data
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
    finally {
      await req.pool.release();
    }
  }
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const signJWT = (userId, role) => {

  const payload = {
    userId: userId,
    role: role
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }); // Set expiry as needed
};

export const signUp = async (req, res) => {

  if (validateErrors(req, res) == undefined) {

    const { fullName, phoneNumber, password, organizationName, address, role, dateOfEstablishment,aadharNumber } = req.body;
    console.log(req.body);

    if (!fullName || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const existingUser = await req.pool.query('SELECT * FROM users WHERE phone = $1', [phoneNumber]);
      //TODO : update auth for adhar card.

      if (existingUser.rows.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User already exists' });
      }

      const hashedPassword = await hashPassword(password);
      const userInsertResult = await req.pool.query('INSERT INTO users (username,phone, password,user_type,organization_name,address,dateofestablishment) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING id', [fullName, phoneNumber, hashedPassword, role, organizationName, address,dateOfEstablishment]);
      if (userInsertResult.rows.length > 0 && role == ROLES.GeneralUser) {
        await req.pool.query("INSERT INTO cart (buyer_id) VALUES($1)", [userInsertResult.rows[0].id])

        const existingAdhar = await req.pool.query('SELECT * FROM adhar WHERE buyer_id = $1 OR aadhar_number = $2', [userInsertResult.rows[0].id,aadharNumber]);
        if (existingAdhar.rows.length > 0) {
          return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Adhar already exists' });
        }
        await req.pool.query("INSERT INTO adhar (buyer_id,aadhar_number) VALUES($1,$2)", [userInsertResult.rows[0].id,aadharNumber])
      }
      res.status(StatusCodes.CREATED).json({ id: userInsertResult.rows[0].id,message: 'User created successfully!' });


    } catch (error) {
      console.log(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
    finally {
      await req.pool.release();
    }
  }
};

