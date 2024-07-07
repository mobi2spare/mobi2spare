import { useContext } from "react";
import { Navigate, Outlet, Route, Routes as Router } from "react-router-dom";
import App from "../App";
// import Layout from "../components/layout/layout";
import { AuthContext } from "../contexts/auth/auth.context";
import { TOKEN } from "../constants/constants";
// import AddProductPage from "../pages/add-product";
// import KycVerifyStepOne from "../pages/kyc-verify-step-1";
// import KycVerifyStepTwo from "../pages/kyc-verify-step-2";
// import KycVerifyStepThree from "../pages/kyc-verify-step-3";
// import MyListing from "../pages/my-listing";
// import RequestProduct from "../pages/request-product";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import {
  ADD_PRODUCT,
  KYC_VERIFY_STEP_1,
  KYC_VERIFY_STEP_2,
  KYC_VERIFY_STEP_3,
  MY_LISTING,
  REGISTER,
  REQUEST_PRODUCT,
  ROOT_PATH,
  SIGN_IN,
} from "./router-path";

type LocalStorageItem = {
  token: string;
  id: string;
};

const getLocalStorageItem = (): LocalStorageItem => {
  const data = localStorage.getItem(TOKEN);
  const localStorageItems = data && JSON.parse(data);
  return localStorageItems;
};

const PrivateRoute = () => {
  const storageItems = getLocalStorageItem();
  const { user } = useContext(AuthContext);

  if (storageItems && storageItems.token && user) {
    return <Outlet />;
  }

  return <Navigate to={SIGN_IN} replace />;
};

const Routes = () => {
  return (
    <Router>
      <Route path={SIGN_IN} element={<Login />} />
      <Route path={REGISTER} element={<SignUp />} />
      {/* <Route path={KYC_VERIFY_STEP_1} element={<KycVerifyStepOne />} />
      <Route path={KYC_VERIFY_STEP_2} element={<KycVerifyStepTwo />} />
      <Route path={KYC_VERIFY_STEP_3} element={<KycVerifyStepThree />} /> */}

      {/* routes with header footer*/}
      {/* <Route path="/" element={<Layout />}>
        <Route path={ROOT_PATH} element={<App />} /> */}

        {/* protected routes*/}
        {/* <Route element={<PrivateRoute />}>
          <Route path={ADD_PRODUCT} element={<AddProductPage />} />
          <Route path={REQUEST_PRODUCT} element={<RequestProduct />} />
          <Route path={MY_LISTING} element={<MyListing />} />
        </Route> */}
      {/* </Route> */}
    </Router>
  );
};

export default Routes;
