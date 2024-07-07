import mobilelogo from '../assets/mobilelogo.png';
import { Link, Navigate } from 'react-router-dom';
import { SIGN_IN, REGISTER, USERHOME } from '../router/router-path';
import { Box, Typography } from '@mui/material';
import { SignUpButton } from '../components/auth/sign-up-button';
import { LoginButton } from '../components/auth/login-button';
import ImageContainer from '../components/images/image_container';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/auth.context';

export default function Home() {
    const { authenticated } = useContext(AuthContext);
    console.log(authenticated);
    return (
        <Box>
            {authenticated ? (
                <Navigate to={USERHOME} replace />
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifySelf: 'center', minHeight: '100vh', justifyContent: 'space-evenly', overflowX: 'hidden' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                        <ImageContainer />
                        <Typography sx={{ fontSize: '3rem', color: 'text.primary' }}>Welcome</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '1rem' }}>Lets GO</Typography>
                        <LoginButton LinkComponent={Link} to={SIGN_IN}>Login</LoginButton>
                        <SignUpButton LinkComponent={Link} to={REGISTER}>Sign Up</SignUpButton>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

