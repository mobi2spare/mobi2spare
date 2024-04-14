import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { DrawerContext } from '../../contexts/drawer.context';
import MenuIcon from '@mui/icons-material/Menu';
import { MENU_LABELS } from '../../constants/constants';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SellIcon from '@mui/icons-material/Sell';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { AuthContext } from '../../contexts/auth.context';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';


export default function NavDrawer(props: any) {

    const { isDrawerOpen, toggleDrawer } = React.useContext(DrawerContext); // Using Context API
    const { authenticated } = React.useContext(AuthContext);
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.up('md'))


    const list = () => (
        <Box
            sx={{ width: 500 }}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
        >
            <List>

                {Object.values(MENU_LABELS).map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index === 0 ? <SellIcon /> : index === 1 ? <RequestQuoteIcon /> : <NotificationsIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Box>
    );

    return (
        
        <div>
            {authenticated && breakpoint ?  <React.Fragment key="left">
                <MenuIcon onClick={toggleDrawer} className='absolute top-0' />
                <SwipeableDrawer
                    anchor={"left"}
                    open={isDrawerOpen}
                    onClose={toggleDrawer}
                    onOpen={toggleDrawer}
                    swipeAreaWidth={50}
                >
                    {list()}
                </SwipeableDrawer>
            </React.Fragment>:null }
          

        </div>
    );
}