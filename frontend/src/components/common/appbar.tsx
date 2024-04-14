import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import ImageContainer from '../images/image-container';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
    <Box>
      <AppBar position="static" sx={{width:'100%',height:'4rem',backgroundColor:'text.secondary'}}>
        <Toolbar>
          <ImageContainer height='20%' width='50%' />
        </Toolbar>
      </AppBar>
      <main>{children}</main> </Box>
  );
}

export default Layout;