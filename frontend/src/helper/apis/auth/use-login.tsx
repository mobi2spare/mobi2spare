// import { API_ENDPOINTS } from "../utils/api-endpoints";
// import http from "../utils/http";
// import Cookies from 'js-cookie';
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  // KYC_VERIFY,
  KYC_VERIFY_STEP_1,
  ROOT_PATH,USERHOME
} from "../../../router/router-path";
import http from "../../../utils/http";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth/auth.context";
import { TOKEN } from "../../constants/constants";
import { REFRESHTOKEN } from "../../../constants/constants";
import Cookies from "js-cookie";

export interface LoginInputType {
  phoneNumber: string;
  password: string;
}

const API_ENDPOINTS = {
  LOGIN: "/api/signin",
};

// const ME_CALL = (id: string) => {
//   return `/api/users/${id}`;
// };

async function login(input: LoginInputType) {
  return http.post(API_ENDPOINTS.LOGIN, input);
}

// async function me(data: any) {
//   return http.get(ME_CALL(data));
// }

export const useLoginMutation = () => {
  const statusPending = "pending";
  const navigate = useNavigate();
  const { setAuthenticated, setUser } = useContext(AuthContext);

  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: async (data) => {

      console.log(data);
      const user = data.data.user;
      const userInfo = {
        'phoneNumber' : user.phone,
        'name' : user.username,
        'organization' : user.organization,
        'address' : user.address,
        'id' : data.data.user.id,
        'role':'GeneralUser',
        'cartId':user.cartId

      }
      Cookies.set(TOKEN, data.data.user.token,{ secure: true });
      Cookies.set(REFRESHTOKEN, data.data.user.refreshToken,{ secure: true });
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
      setAuthenticated(true);
      navigate(USERHOME);

    },
    onError: (data: any) => {
      toast.error(data.response.data.message,{position:'top-center'});
    },
  });
};
