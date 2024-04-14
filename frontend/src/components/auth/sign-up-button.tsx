
import { Link, LinkProps } from 'react-router-dom';
import { Box, Button, styled, Typography } from '@mui/material';

export const SignUpButton = styled(Button)<LinkProps>(({ theme }) => (
    {
        fontSize: '1rem',
        color: theme.palette.text.primary,

    }
));