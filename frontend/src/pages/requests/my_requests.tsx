import React from 'react'
import { Box, Typography } from '@mui/material'
import { Product } from '../../constants/models'
import { RequestCard } from './request_card';
import EditIcon from '@mui/icons-material/Edit';
import { orange } from '@mui/material/colors';

// import RequestCard from './request_card'
interface UserRequestsProps {
  myRequest: Product;
}

export const UserRequests: React.FC<UserRequestsProps> = ({ myRequest }) => {
  return (
    <Box display={'grid'} gridTemplateColumns={'1fr 0.2fr'}>
        <RequestCard product={myRequest} />
        <Box display={'flex'} flexDirection='column' alignItems={'center'} justifyContent={'center'} marginLeft={'2rem'}>
        <EditIcon sx={{color:orange[900]}} />
          <Typography sx={{textWrap:'nowrap',color:orange[900]}}>Edit</Typography>
          

        </Box>
    </Box>
   
  )
}
