import {  LinkProps } from 'react-router-dom';
import {  Button, styled } from '@mui/material';
import { StyledButton } from '../buttons/styled_buttons';

export const LoginButton = styled(StyledButton)<LinkProps>(({ theme }) => ({
    margin: theme.spacing(1),
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
}));