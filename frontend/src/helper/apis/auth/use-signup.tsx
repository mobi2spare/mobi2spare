// import { useUI } from '@contexts/ui.context';
// import { API_ENDPOINTS } from "../utils/api-endpoints";
// import http from "../utils/http";
// import Cookies from 'js-cookie';

import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SIGN_IN } from '../../../router/router-path';
import http from '../../../utils/http';
import { ROLES } from '../../../constants/constants';

export interface SignUpInputType {
  phoneNumber: string;
  password: string;
  fullName: string;
  organizationName: string;
  address : string,
  dateOfEstablishment : Date,
  aadharNumber : string,
  role : string 
}

const API_ENDPOINTS = {
  Register: '/api/signup',
};

async function signUp(input: SignUpInputType) {
  input['role'] = ROLES.GeneralUser;
  console.log(input);
  return http.post(API_ENDPOINTS.Register, input);
}
export const useSignUpMutation = () => {
  // const { authorize, closeModal } = useUI();O
  const navigate = useNavigate();
  // console.log(input);
  return useMutation((input: SignUpInputType) => signUp(input), {
    onSuccess: () => {
      navigate(SIGN_IN)
      toast.success('Registration complete successfully');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};
