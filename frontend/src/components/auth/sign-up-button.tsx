
import {  LinkProps } from 'react-router-dom';
import { styled } from '@mui/material';
import { StyledButton } from '../buttons/styled_buttons';

export const SignUpButton = styled(StyledButton)<LinkProps>(({ theme }) => (
    {
        fontSize: '1rem',
        color: theme.palette.text.secondary,
        

    }
));