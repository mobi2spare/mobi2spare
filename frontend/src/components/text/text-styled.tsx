import { Box, TextField, Typography, styled } from '@mui/material'
import React, { ReactElement } from 'react'

export const StyledTextHeader = styled(Typography)(({ theme }) => ({
    margin: theme.spacing(1),
    color: theme.palette.text.primary,
    fontSize : '2rem',
    fontFamily:'SegoeUIBold'
}));


export const StyledTextInput = styled(TextField)(({ theme }) => ({
    margin: theme.spacing(1),
    color: theme.palette.text.primary,
    fontSize : '2rem',
    fontFamily:'SegoeUIBold',
    "& .MuiOutlinedInput-root": {  // Target the root element of the outlined variant
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)"
    },
    borderRadius:'0'
    

}));

