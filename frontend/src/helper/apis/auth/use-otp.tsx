// import { API_ENDPOINTS } from "../utils/api-endpoints";
// import http from "../utils/http";
// import Cookies from 'js-cookie';
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  // KYC_VERIFY,
  KYC_VERIFY_STEP_1,
  ROOT_PATH,
} from "../../../router/router-path";
import http from "../../../utils/http";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth/auth.context";
import { TOKEN } from "../../constants/constants";

export interface OtpInputType {
  otp: string;
}

const API_ENDPOINTS = {
  VERIFY: "/api/otp/verify",
  RESEND : "/api/otp/resend",
  GENERATE: "/api/otp/generate",
};


async function resendOtp() {
  return http.get(API_ENDPOINTS.RESEND);
}

async function verifyOtp(input: OtpInputType) {
    return http.post(API_ENDPOINTS.VERIFY , input);
}

async function generateOtp() {
    return http.post(API_ENDPOINTS.GENERATE );
}

export const useOtpResendMutation = ()=>{

    return useMutation((input: OtpInputType) => resendOtp(), {
        onSuccess: async (data) => {
    
          toast.info('Otp has been resent');
    
        },
        onError: (data: any) => {
          toast.error(data.response.data.message,{position:'top-center'});
        },
      });

}

export const useOtpGenerateMutation = ()=>{

    return useMutation(() => generateOtp(), {
        onSuccess: async (data) => {
    
          toast.info('Please check your mobile number for the otp');
    
        },
        onError: (data: any) => {
          toast.error(data.response.data.message,{position:'top-center'});
        },
      });

}

export const useOtpVerifyMutation = () => {
  const navigate = useNavigate();
  const { setAuthenticated, setUser } = useContext(AuthContext);

  return useMutation((input: OtpInputType) => verifyOtp(input), {
    onSuccess: async (data) => {

      console.log(data);
      const tokenData = {
        id: data.data.user.id,
        token: data.data.user.token,
      };
      const user = data.data.user;
      const userInfo = {
        'phone' : user.phone,
        'name' : user.username,
        'organization' : user.organization,
        'address' : user.address,
        'id' : data.data.user.id


      }
      localStorage.setItem(TOKEN, JSON.stringify(tokenData));
      localStorage.setItem('user', JSON.stringify(userInfo));
    //   setUser(userInfo);
      setAuthenticated(true);
      
      // http.get(`/api/users/${tokenData.id}`).then((res) => {
      //   setUser(res.data)
      //   localStorage.setItem('user', JSON.stringify(res.data));
      // });

      // if (data.data.status === statusPending) {
      //   toast.warn("Please complete the KYC");
      //   setAuthenticated(true);

      //   navigate(KYC_VERIFY_STEP_1);
      //   return;
      // }

      /*       const userResponse = await me(data.data.id);
      setUser(userResponse.data);
      console.log('userResponse.data.data: ', userResponse.data); */

      navigate(ROOT_PATH);

      // Cookies.set('auth_token', data.token);
      // authorize();
      // closeModal();
    },
    onError: (data: any) => {
      toast.error(data.response.data.message,{position:'top-center'});
    },
  });
};
