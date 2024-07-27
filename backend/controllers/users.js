import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import { validateErrors } from "../validators/common_validation.js";
import { ROLES } from '../constants/constants.js';
import db from '../db/db.js'
import { signInWithPhoneNumber } from 'firebase/auth';



export const signIn = async (req, res) => {

  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    return res.status(400).json({ message: 'Missing phone or password or invalid role' });
  }

  const result = await db.oneOrNone('SELECT id, username ,password, organization_name, phone,address,user_type FROM users WHERE phone = $1', [phoneNumber]);


  if (!result) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid phone or password' });
  }

  const validPassword = await bcrypt.compare(password, result.password); // Compare hashed passwords

  if (!validPassword) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid phone or password' });
  }
  const userId = result.id;
  const role = result.user_type;  // Get role from DB.
  const token = signJWT(userId, role);  // Send JWT token
  const refreshToken = signRefreshJWT(userId, role);
  const cartid = await db.one('SELECT id FROM cart where buyer_id=$1', [userId]);
  // Successful login (send relevant user information or a token, for example)
  if (role === 'Admin') {
    res.json({ message: 'Login successful!', user: { id: userId, phone: result.phone, username: result.username, address: result.address, organization: result.organization_name, token: token, refreshToken: refreshToken, role: role } }); // Replace with relevant user data   
  }
  else {
    res.json({ message: 'Login successful!', user: { id: userId, phone: result.phone, username: result.username, address: result.address, organization: result.organization_name, token: token, refreshToken: refreshToken, cartId: cartid.id } }); // Replace with relevant user data
  }

};

export const generateNewAccessToken = async (req, res) => {
  const { userId, role, refreshToken } = req.body;

  let token;

  const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
  if (decodedRefreshToken.role == undefined) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid User Access' });
  }

  token = signJWT(userId, role);
  const newRefreshToken = signRefreshJWT(userId, role);
  res.json({ message: 'Refresh token success', user: { id: userId, token: token, refreshToken: newRefreshToken } });



}

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const signJWT = (userId, role) => {

  const payload = {
    userId: userId,
    role: role
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' }); // Set expiry as needed
};

const signRefreshJWT = (userId, role) => {

  const payload = {
    userId: userId,
    role: role
  }

  return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '30d' }); // Set expiry as needed
};

export const signUp = async (req, res) => {


  const { fullName, phoneNumber, password, organizationName, address, role } = req.body;


  const existingUser = await db.oneOrNone('SELECT * FROM users WHERE phone = $1', [phoneNumber]);

  if (existingUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User already exists' });
  }

  const hashedPassword = await hashPassword(password);
  const userInsertResult = await db.one('INSERT INTO users (username,phone, password,user_type,organization_name,address) VALUES ($1, $2, $3,$4,$5,$6) RETURNING id', [fullName, phoneNumber, hashedPassword, role, organizationName, address]);
  if (userInsertResult && role === 'Admin') {
    // Additional logic specific to admin role
    // For example, setting up admin-specific functionalities or permissions
    res.status(StatusCodes.CREATED).json({ id: userInsertResult.id, message: 'Admin created successfully!' });
  }
  if (userInsertResult && role === ROLES.GeneralUser) {
    const cartId = await db.one("INSERT INTO cart (buyer_id) VALUES($1) RETURNING Id", [userInsertResult.id])
    res.status(StatusCodes.CREATED).json({ id: userInsertResult.id, cartId: cartId.id, message: 'User created successfully!' });


  }

};

