import dotenv from 'dotenv';
dotenv.config();
import { StatusCodes } from "http-status-codes";
import * as crypto from 'crypto';

function generateOTP() {
    // Generate a random string of digits
    let otp = '';
    for (let i = 0; i < parseInt(process.env.OTP_LENGTH); i++) {
        // Generate a random integer between 0 (inclusive) and 9 (inclusive)
        const randomDigit = crypto.randomInt(0, 10);
        otp += randomDigit.toString();
    }
    return otp;
}

function getExpiryTime() {
    const now = Date.now();
    const expiryTime = now + (parseInt(process.env.OTP_EXPIRATION_TIME) * 60 * 1000);
    return expiryTime;
}

function validateOTP(hashedData,expiryTime,receivedOTP) {
    // Split the hashed data (OTP + expiry)
    // const [otp, expiryTime] = hashedData.split(':');
  
    // Check for expiry
    const currentTime = Date.now();
    if (currentTime > expiryTime) {
      return false; // OTP expired
    }
  
    // Hash the received OTP with the expiry time and secret key
    const data = `${receivedOTP}:${expiryTime}`;
    const calculatedHash = crypto.createHmac('sha256', process.env.OTP_SECRET_KEY).update(data).digest('hex');
  
    // Compare the calculated hash with the stored hashed data
    return calculatedHash === hashedData;
  }

export const generateOtp = (req, res) => {

    // TODO to be used for sending sms.
    // const { number }= req.number;
    try {
        const otp = generateOTP();
        const expiryTime = getExpiryTime();

        const data = `${otp}:${expiryTime}`;
        const hashedData = crypto.createHmac('sha256', process.env.OTP_SECRET_KEY).update(data).digest('hex');
    
    
        res.status(StatusCodes.OK).json({
            success: true,
            otp,
            expiry: expiryTime,
            hashedData: hashedData
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Failed to generate OTP' });
    }
}
export const resendOtp = async (req, res) => {

    // Invalidate otp
    // const { hashedData, receivedOTP,expiryTime } = req.body;

    return generateOtp(req, res);


 }
export const verifyOtp = async (req, res) => {

    try {
    const { hashedData, receivedOTP,expiryTime } = req.body;

    if (!hashedData || !receivedOTP) {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'Missing required data' });
    }
   
    const isValid = validateOTP(hashedData,expiryTime, receivedOTP);

    res.status(StatusCodes.OK).json({
      success: true,
      valid: isValid,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Failed to validate OTP' });
  }

 }