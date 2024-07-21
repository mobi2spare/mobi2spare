import React, { useContext } from 'react';
import type {} from '@mui/lab/themeAugmentation';
import './App.css';
import Home from './pages/home';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Outlet } from 'react-router-dom'
import Login from './pages/login';
import SignUp from './pages/signup';
import { AuthContext, AuthProvider } from './contexts/auth/auth.context';
import { REGISTER, SIGN_IN, OTP, USERHOME, PRODUCT_CATEGORY, PRODUCT_BUY_SELL_DETAILS, PRODUCT_REQUEST_DETAILS, CART, REQUESTS, PRODUCT_INFO } from './router/router-path';
import { ToastContainer } from 'react-toastify';
import Otp from './pages/otp';
import UserHome from './pages/userhome';
import { DrawerProvider } from './contexts/drawer.context';
import NavDrawer from './components/nav/swipedrawer';
import SimpleBottomNavigation from './components/nav/bottomnavigation';
import SingleProduct from './pages/singleproduct';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BottomTabProvider } from './contexts/bottom.context';
import { Box, Shadows } from '@mui/material';
import Layout from './components/common/appbar';
import { PrivateRoute } from './components/auth/private_route';
import CategoryProducts from './pages/categoryproducts';
import {ProductDetails} from './pages/buysell/productdetails';
import { Provider } from 'react-redux';
import {store} from './store/store';
import ProductRequestDetails from './pages/buysell/productrequestdetails';
import ShoppingCart from './pages/cart/cart';
import Requests from './pages/requests/requests';
import SingleProductInfo from './pages/product-info';


function App() {


  const theme = createTheme({
    palette: {
      background: {
        paper: '#1F255A',

      },
      text: {
        primary: '#24293D',
        secondary: '#FFFFFF',


      },
      action: {
        active: '#001E3C',
      },


    },
    shape: {
      borderRadius: 10
      // borderRadius: '20px',
    }
  });

  return (


    <AuthProvider>
      {/* <DrawerProvider> */}
      <div>
        <DrawerProvider>
          <NavDrawer >
          </NavDrawer>
        </DrawerProvider>

      </div>



      <ThemeProvider theme={theme}>
        <Layout>
        <Provider store={store}>
       
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path={SIGN_IN} element={<Login />} />
            <Route path={REGISTER} element={<SignUp />} />
            <Route path={OTP} element={<Otp />} />
            
            <Route element={<PrivateRoute />}>
              <Route path={USERHOME} element={<UserHome />} />
              <Route path={PRODUCT_CATEGORY} element={<CategoryProducts />} />
              <Route path={PRODUCT_BUY_SELL_DETAILS} element={<ProductDetails/>} />
              <Route path={PRODUCT_REQUEST_DETAILS} element={<ProductRequestDetails />} />
              <Route path={CART} element={<ShoppingCart />} />
              <Route path={REQUESTS} element={<Requests />} />
              <Route path={PRODUCT_INFO} element={<SingleProductInfo />} />
            </Route>
            
            

          </Routes>
         

          <Box>
            <BottomTabProvider>
              <SimpleBottomNavigation></SimpleBottomNavigation>
            </BottomTabProvider>
          </Box>

          <ToastContainer />
          </Provider>
        </Layout>
      
      </ThemeProvider>
      {/* */}
    </AuthProvider>


  );
}

export default App;
