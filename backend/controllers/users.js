import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { validateErrors } from "../validators/common_validation.js";


export const signIn = async (req, res) => {

  if (validateErrors(req) == undefined) {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: 'Missing phone or password or invalid role' });
    }

    try {
      const result = await req.pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
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
      res.json({ message: 'Login successful!', user: { id: user.id, phone: user.phone, token: token } }); // Replace with relevant user data
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
    finally{
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

  if (validateErrors(req) == undefined) {

    const { username, phone, password, email, organization, address, role } = req.body;

    if (!username || !phone || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const existingUser = await req.pool.query('SELECT * FROM users WHERE username = $1 OR (phone = $2 or email = $3)', [username, phone, email]);
      //TODO : update auth for adhar card.

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await hashPassword(password);
      const result = await req.pool.query('INSERT INTO users (username,phone, email, password,user_type,organization_name,address) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING id', [username, phone, email, hashedPassword, role, organization, address]);

      res.status(StatusCodes.CREATED).json({ message: 'User created successfully!' });
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
    finally{
      await req.pool.release();
  }
  }
};

