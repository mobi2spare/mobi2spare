import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { Product } from '../../constants/models'
import { RequestCard } from './request_card';
import DeleteIcon from '@mui/icons-material/Delete';
import { orange } from '@mui/material/colors';
import { BASE_URL, DELETE_REQUESTS } from '../../utils/api';
import api from '../../utils/network_requests';
import { USER } from '../../constants/constants';
import { User } from '../../contexts/auth/auth.context';
import { toast } from 'react-toastify';

// import RequestCard from './request_card'
interface UserRequestsProps {
  myRequest: Product;
}

const deleteRequests = async () => {

  const item = localStorage.getItem(USER);
  const user: User = JSON.parse(item || '{}');
  const userId = user.id
  const result = await api.delete(`${BASE_URL}${DELETE_REQUESTS}/${userId}`);
  toast.info(result.data.message);
}

export const UserRequests: React.FC<UserRequestsProps> = ({ myRequest }) => {
  return (
    <Box display={'grid'} gridTemplateColumns={'1fr 0.2fr'}>
      <RequestCard product={myRequest} />
      <Box display={'flex'} flexDirection='column' alignItems={'center'} justifyContent={'center'} marginLeft={'2rem'}>
        <IconButton onClick={deleteRequests}>
          <DeleteIcon sx={{ color: orange[900] }} />
        </IconButton>

        <Typography sx={{ textWrap: 'nowrap', color: orange[900] }}>Delete</Typography>
      </Box>
    </Box>

  )
}
