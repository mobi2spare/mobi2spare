import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";
import { USERHOME } from '../../router/router-path';


export default function TitleHeader(props: any) {
    const navigate = useNavigate();

    const { title } = props;
    return (
        <Box display={'grid'} width={'100%'} gridTemplateColumns={'0.5fr max-content'} sx={{ placeItems: 'center' }}>
            <IconButton className='icon-color' onClick={() => navigate(USERHOME)}>

                <KeyboardBackspaceIcon  />
            </IconButton>
            <Typography className='appbar-title'>{title}</Typography>
        </Box>
    )
}
