import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Outlet } from 'react-router-dom'
import Login from './pages/login';
import SignUp from './pages/signup';
import { AuthContext, AuthProvider } from './contexts/auth.context';
import { REGISTER, SIGN_IN, OTP, USERHOME } from './router/router-path';
import { ToastContainer } from 'react-toastify';
import Otp from './pages/otp';
import UserHome from './pages/userhome';
import { DrawerProvider } from './contexts/drawer.context';
import NavDrawer from './components/nav/swipedrawer';
import SimpleBottomNavigation from './components/nav/bottomnavigation';
import SingleProduct from './pages/singleproduct';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BottomTabProvider } from './contexts/bottom.context';
import { Box } from '@mui/material';
import Layout from './components/common/appbar';
import { PrivateRoute } from './components/auth/private_route';


function App() {


  const theme = createTheme({
    palette: {
      background: {
        paper: '#1F255A',

      },
      text: {
        primary: '#1F255A',
        secondary: '#FFFFFF',


      },
      action: {
        active: '#001E3C',
      },


    },
    shape: {
      borderRadius: 40
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
          <Outlet />
          <Routes>


            <Route path='/' element={<Home />} />
            <Route path={SIGN_IN} element={<Login />} />
            <Route path={REGISTER} element={<SignUp />} />
            <Route path={OTP} element={<Otp />} />
            <Route element={<PrivateRoute />}>
              <Route path={USERHOME} element={<UserHome />} />
            </Route>
            <Route path="singleproduct" element={<SingleProduct />} />


          </Routes>

          <Box>
            <BottomTabProvider>
              <SimpleBottomNavigation></SimpleBottomNavigation>
            </BottomTabProvider>
          </Box>

          <ToastContainer />
        </Layout>

      </ThemeProvider>
      {/* */}
    </AuthProvider>


  );
}

export default App;
