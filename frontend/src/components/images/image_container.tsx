import { Box } from '@mui/material'
import mobilelogo from '../../assets/mobilelogo.png';

export default function ImageContainer(props:any) {
  return (
    <Box sx={{alignSelf:'center'}}>
        <img src={mobilelogo} style={{ height: props.height ||  '100%', width: props.width || '100%' }} />
    </Box>
  )
}