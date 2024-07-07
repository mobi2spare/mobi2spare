import {  Button, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';


export const StyledButton = styled(LoadingButton)(({ theme }) => ({
    margin: theme.spacing(2),
    color: theme.palette.text.secondary,
    borderRadius:'2rem',
    backgroundColor: theme.palette.text.primary, padding: '0.5rem 4rem', marginTop: '2rem',
    "&:hover": {
        backgroundColor: theme.palette.text.primary, padding: '0.5rem 4rem', marginTop: '2rem',
    },
    textWrap:'nowrap'
}));


export const RegularStyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    component:"label",
    color: theme.palette.text.secondary,
    borderRadius:'2rem',
    backgroundColor: theme.palette.text.primary, padding: '1rem 4rem', marginTop: '0.5rem',
    // "&:hover": {
    //     backgroundColor: theme.palette.text.primary, padding: '1rem 4rem', marginTop: '0.5rem',
    // },
    textWrap:'nowrap'
}));
