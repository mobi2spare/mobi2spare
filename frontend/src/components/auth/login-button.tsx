import {  LinkProps } from 'react-router-dom';
import {  Button, styled } from '@mui/material';

export const LoginButton = styled(Button)<LinkProps>(({ theme }) => ({
    margin: theme.spacing(1),
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.text.primary, padding: '1rem 4rem', marginTop: '0.5rem',
    "&:hover": {
        // backgroundColor: alpha(theme.palette.common.white, 0.35)
    }
}));
