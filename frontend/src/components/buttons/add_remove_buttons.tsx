
import { Box, IconButton, Paper, TextField, Typography, useTheme } from '@mui/material'
import { orange } from '@mui/material/colors'
import React from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export interface AddButtonProps {
    quantity:number,
    font? : object,
    increaseQuantity : ()=>void,
    decreaseQuantity : ()=>void,
    typoGraphyText?: string,
    width? : string | '100%'
}



export default function AddRemoveQuantityButtons(props:AddButtonProps) {

const theme = useTheme();
  return (
    <>
    {props.typoGraphyText? <Typography sx={{ width: '90%', ...props.font }}>{props.typoGraphyText}</Typography>:null}
   
    <TextField

        variant='standard'
        size='small'
        type="number"
        sx={{
            minWidth: props.width,
            textAlign: 'center',
            '& .MuiInputBase-input': { color: orange[900], textAlign: 'center' }
        }}
        label="Number"
        value={props.quantity || 1}

        InputProps={{

            sx: {
                display: 'flex', // Enable flexbox
                alignItems: 'center', // Align items vertically in the center
            },

            disableUnderline: true,

            startAdornment: (
                <React.Fragment>
                    <IconButton>
                        <Paper elevation={5} sx={{ backgroundColor: theme.palette.text.secondary, borderRadius: '10px 0px 0px 10px' }}>
                            <RemoveIcon onClick={props.decreaseQuantity} fontSize='small' sx={{ color: orange[900], boxShadow: '10px red', paddingLeft: "0.5rem", paddingTop: '0.2rem', paddingBottom: '0.2rem' }} />
                        </Paper>
                    </IconButton>
                </React.Fragment>
            ),
            endAdornment: (
                <React.Fragment>
                    <IconButton>
                        <Paper elevation={5} sx={{ backgroundColor: theme.palette.text.secondary, borderRadius: '0px 10px 10px 0px' }}>
                            <AddIcon onClick={props.increaseQuantity} fontSize='small' sx={{ color: orange[900], boxShadow: '10px red', paddingRight: "0.5rem", paddingTop: '0.2rem', paddingBottom: '0.2rem' }} />

                        </Paper>
                    </IconButton>
                </React.Fragment>
            ),
        }}
    />
</>
  )
}
