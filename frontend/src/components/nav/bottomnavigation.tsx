import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SellIcon from '@mui/icons-material/Sell';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { MENU_LABELS } from '../../constants/constants';
import { AuthContext } from '../../contexts/auth.context';
import { useMediaQuery } from '@mui/material';
import { createStyles, makeStyles, styled, useTheme } from '@mui/material/styles';
import UserIcon from '../icons/user-icon';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { color } from 'framer-motion';
import { orange } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function SimpleBottomNavigation(props: any) {
  const [value, setValue] = React.useState(0);
  const { authenticated } = React.useContext(AuthContext);
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box>
      {authenticated && breakpoint ? <Box>

        <BottomNavigation
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex' }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label={MENU_LABELS.USER_PROFILE} icon={<UserIcon />} />
          <BottomNavigationAction label={MENU_LABELS.REQUEST_FOR_PART} icon={<AddCircleIcon />} />
          <BottomNavigationAction label={MENU_LABELS.SELL_PARTS} sx={{
            color: orange[900], fontSize: '2rem', fontWeight: 'bold',
            borderRadius: '2rem', textTransform: 'uppercase', backgroundColor: 'text.secondary'
          }} />
          <BottomNavigationAction label={MENU_LABELS.NOTIFICATIONS} icon={<NotificationsIcon />} />
          <BottomNavigationAction label={MENU_LABELS.CHECKOUT} icon={<ShoppingCartIcon />} />
        </BottomNavigation>


      </Box> : null}
    </Box>

  );



}