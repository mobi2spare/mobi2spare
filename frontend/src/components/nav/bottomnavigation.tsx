import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MENU_LABELS } from '../../constants/constants';
import { AuthContext } from '../../contexts/auth/auth.context';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import UserIcon from '../icons/user-icon';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { orange } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { CART, PRODUCT_BUY_SELL_DETAILS, REQUESTS } from '../../router/router-path';
import { title } from 'process';
import  sell_nav  from '../../assets/images/sell_nav.svg'

export default function SimpleBottomNavigation(props: any) {
  const [value, setValue] = React.useState(0);
  const { authenticated } = React.useContext(AuthContext);
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate();
  const location = useLocation();

  const ImageIcon = () => {
    return <img src={sell_nav} alt="" />;
  };

  const navigateTo = (path: string) => {
    if (location.pathname != path) {
      navigate(path);

    }
    if (location.pathname == path && location.state!=null && location.state.title != title){
      const titleToSend = {title:title}
      navigate(path, {state:titleToSend});
    }
  }
  return (
    <Box sx={{ display: 'flex' }}>
      {authenticated && breakpoint ? <Box>

        <BottomNavigation
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex',textWrap:'nowrap', backgroundColor: 'text.primary', color: 'white' }}
          showLabels

          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label={MENU_LABELS.USER_PROFILE} icon={<UserIcon />} color='primary' />
          <BottomNavigationAction label={MENU_LABELS.REQUEST_FOR_PART} onClick={() => navigateTo(REQUESTS) } icon={<AddCircleIcon />} />
          <BottomNavigationAction  icon={<ImageIcon />} LinkComponent={Link} onClick={() => navigateTo(PRODUCT_BUY_SELL_DETAILS)}sx={{
            color: orange[900], fontSize: '2rem', fontWeight: 'bold'
          }} />
          <BottomNavigationAction label={MENU_LABELS.NOTIFICATIONS} icon={<NotificationsIcon />} />
          <BottomNavigationAction label={MENU_LABELS.CHECKOUT} icon={<ShoppingCartIcon />} LinkComponent={Link} onClick={() => navigateTo(CART)} />
        </BottomNavigation>


      </Box> : null}
    </Box>

  );



}