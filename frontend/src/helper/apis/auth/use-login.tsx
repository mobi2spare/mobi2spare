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
import { AuthContext } from "../../../contexts/auth.context";
import { TOKEN } from "../../constants/constants";

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
        'id' : data.data.user.id


      }
      localStorage.setItem(TOKEN, data.data.user.token);
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
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

      navigate(USERHOME);

      // Cookies.set('auth_token', data.token);
      // authorize();
      // closeModal();
    },
    onError: (data: any) => {
      toast.error(data.response.data.message,{position:'top-center'});
    },
  });
};
