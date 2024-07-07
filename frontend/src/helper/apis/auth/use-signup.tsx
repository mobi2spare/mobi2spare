
import api from '../../../utils/network_requests';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {  SIGN_IN, } from '../../../router/router-path';
import { ROLES } from '../../../constants/constants';
import { BASE_URL, GENERATE_ADHAR_OTP, REGISTER, VERIFY_ADHAR_OTP } from '../../../utils/api';
import { setUserPassword } from '../../../store/actions';


export interface AdharGenerateInputType {
  adharNumber: string
}

export interface AdharVerifyInputType {
  client_id: string,
  otp: string
}

export interface SignUpInputType {
  phoneNumber: string;
  password: string;
  fullName: string;
  organizationName: string;
  address: string,
  role: string
}

async function generateOtp(input: AdharGenerateInputType) {

  
  const generateOtpInfo =
  {
    "adharNumber": input
  }
  console.log(generateOtpInfo);
  return api.post(BASE_URL + GENERATE_ADHAR_OTP, generateOtpInfo);

}

async function verifyotp(input: AdharVerifyInputType) {
  console.log(input);
  return api.post(BASE_URL + VERIFY_ADHAR_OTP, input);

}

async function signUp(input: SignUpInputType) {
  input['role'] = ROLES.GeneralUser;
  return api.post(BASE_URL + REGISTER, input);
}
export const useSignUpMutation = () => {
  const navigate = useNavigate();
  // console.log(input);
  return useMutation((input: SignUpInputType) => signUp(input), {
    onSuccess: (data:any) => {
      navigate(SIGN_IN)
  
      return data;
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

export const useGenerateAdharMutation = () => {

  return useMutation((input: AdharGenerateInputType) => generateOtp(input), {

    onSuccess: (data:any) => {

      return data;
    },
    
  });

}

export const useVerifyAdhaarMutation = () => {


  return useMutation((input: AdharVerifyInputType) => verifyotp(input), {
    onSuccess: (data:any) => {

      return data;
    },
  
  });

}