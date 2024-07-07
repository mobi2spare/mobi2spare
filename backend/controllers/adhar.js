
import axios from "axios";
import dotenv from 'dotenv';
import { StatusCodes } from "http-status-codes";
dotenv.config();

export const generateAdharOtp =  async(req, res)=>{

    const {adharNumber}= req.body;
    const dataToSend = {
        'id_number':adharNumber
    }
    try {

        const config = {
            headers: { Authorization: `Bearer ${process.env.SUREPASS_TOKEN}` }
          };
        // Access data from the request body (optional)
    
        // Define the URL and data for the POST request
        
        const response = await axios.post(process.env.SUREPASS_ADHAR_GENERATE_URL, dataToSend,config); // Make the POST request
    
        // Handle successful response
        res.json(response.data); // Send the response data from the external API
    
      } catch (error) {
        console.error(error); // Log any errors
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Error verifying adhar. Please try again'}); // Send an error response
      }
    }


export const validateAdharOTP = async(req, res)=>{

    const {client_id,otp}= req.body;
    const dataToSend = {
        'client_id':client_id,
        'otp':otp
    }
    try {

        const config = {
            headers: { Authorization: `Bearer ${process.env.SUREPASS_TOKEN}` }
          };
        // Access data from the request body (optional)
    
        // Define the URL and data for the POST request
        
        const response = await axios.post(process.env.SUREPASS_ADHAR_VERIFY_URL, dataToSend,config); // Make the POST request
    
        // Handle successful response
        res.json(response.data); // Send the response data from the external API
    
      } catch (error) {
        console.error(error); // Log any errors
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Error verifying otp. Please try again later'}); // Send an error response
      }
    }


    


