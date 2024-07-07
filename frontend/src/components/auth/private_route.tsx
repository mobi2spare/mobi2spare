import { Route, Navigate, useLocation, Outlet, useOutletContext } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth/auth.context';
import { ReactNode, useContext } from 'react';
import React from 'react';
import ImageContainer from '../images/image_container';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import TitleHeader from './title-header';
import { useSelector } from 'react-redux';



export function PrivateRoute() {

    const { authenticated } = useContext(AuthContext);
    const location = useLocation();
    const appInfo = useSelector((store: any) => store.root.app);
    return (
        <Box>
            {authenticated ? <>
                    <AppBar position="static" sx={{ width: '100%', height: '4rem', backgroundColor: 'text.secondary' }}>
                        <Toolbar>
                            {appInfo?.title?<TitleHeader title={appInfo?.title}></TitleHeader>:<ImageContainer height='20%' width='50%' />}
                        </Toolbar>
                    </AppBar>
                    <Outlet />
                    </>
                : <Navigate to="/" replace state={{ from: location }} ></Navigate>}
        </Box>
    )


}

