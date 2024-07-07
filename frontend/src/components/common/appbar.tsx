import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import ImageContainer from '../images/image_container';
import { Outlet, useOutletContext } from "react-router-dom";
import React, { useContext } from 'react';


const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {

    return (
     
      <main>{children}</main>
  );
}

export default Layout;