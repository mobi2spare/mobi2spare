import { Box, Typography } from '@mui/material'
import React from 'react'
import { Product } from '../../constants/models';
import { RequestCard } from './request_card';
import AddIcon from '@mui/icons-material/Add';
import { orange } from '@mui/material/colors';

// import RequestCard from './request_card'
interface OtherUserRequestProps {
  otherRequest: Product;
}

export const BuyerRequests: React.FC<OtherUserRequestProps> = ({ otherRequest }) => {
  return (
    <Box display={'grid'} sx={{alignContent:'center'}} gridTemplateColumns={'1fr 0.2fr'}>
        <RequestCard product={otherRequest}/>
        <Box display={'flex'} flexDirection='column' alignItems={'center'} justifyContent={'center'} marginLeft={'2rem'}>
          <AddIcon sx={{color:orange[900]}} />
          <Typography sx={{textWrap:'nowrap'}}>Add Part</Typography>
        </Box>
    </Box>
  )
}
