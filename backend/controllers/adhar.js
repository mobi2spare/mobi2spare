import axios from "axios";
import dotenv from 'dotenv';
import { StatusCodes } from "http-status-codes";
dotenv.config();

const SUREPASS_TOKEN = process.env.SUREPASS_TOKEN;
const SUREPASS_ADHAR_GENERATE_URL = process.env.SUREPASS_ADHAR_GENERATE_URL;
const SUREPASS_ADHAR_VERIFY_URL = process.env.SUREPASS_ADHAR_VERIFY_URL ;

export const generateAdharOtp = async (req, res) => {
    const { adharNumber } = req.body;
    const dataToSend = {
        'id_number': adharNumber
    };
    try {
        const config = {
            headers: { Authorization: `Bearer ${SUREPASS_TOKEN}` }
        };

        const response = await axios.post(SUREPASS_ADHAR_GENERATE_URL, dataToSend, config);

        res.json(response.data);

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error verifying adhar. Please try again' });
    }
};

export const validateAdharOTP = async (req, res) => {
    const { client_id, otp } = req.body;
    const dataToSend = {
        'client_id': client_id,
        'otp': otp
    };
    try {
        const config = {
            headers: { Authorization: `Bearer ${SUREPASS_TOKEN}` }
        };

        const response = await axios.post(SUREPASS_ADHAR_VERIFY_URL, dataToSend, config);

        res.json(response.data);

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error verifying otp. Please try again later' });
    }
};
