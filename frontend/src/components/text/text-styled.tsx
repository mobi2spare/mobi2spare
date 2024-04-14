import { Box, Typography, styled } from '@mui/material'
import React from 'react'

export const StyledTextHeader = styled(Typography)(({ theme }) => ({
    margin: theme.spacing(1),
    color: theme.palette.text.primary,
    fontSize : '2rem'
}));
