import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { REACT_QUERY_GET_REQUESTS } from '../../constants/react-query-constants';
import { useQuery } from 'react-query';
import api from '../../utils/network_requests';
import { BASE_URL, GET_REQUESTS } from '../../utils/api';
import { User } from '../../contexts/auth/auth.context';
import { MENU_LABELS, USER } from '../../constants/constants';
import { UserRequests } from './my_requests';
import { BuyerRequests } from './buyer_requests';
import { Product, RequestData } from '../../constants/models';
import { orange } from '@mui/material/colors';
import { useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../store/actions';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}



export default function Requests() {
    const [requestData, setRequestData] = useState<RequestData>();
    const theme = useTheme();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTitle(MENU_LABELS.NOTIFICATIONS))
      
      }, [])
    const getAllRequests = async () => {

        const item = localStorage.getItem(USER);
        const user: User = JSON.parse(item || '{}');
        const userId = user.id
        const result = await api.get(`${BASE_URL}${GET_REQUESTS}/${userId}`);
        setRequestData(result.data.data)
    }

    const { isLoading, error: requestsError } = useQuery(REACT_QUERY_GET_REQUESTS, getAllRequests, {
        retry: 3,
    });

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }
    const [value, setValue] = useState<number>(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs variant='fullWidth' value={value} onChange={handleChange} aria-label="basic tabs example" sx={{
                    '.MuiTab-root': {
                        color: 'gray', // Default tab color
                        // '&.Mui-selected': {
                        //     color: theme.palette.text.secondary, // Selected tab color
                        //     backgroundColor: orange[900], // Background color of selected tab
                        // },
                    },
                }}>
                    <Tab label="Requested Feed" {...a11yProps(0)} />
                    <Tab label="Your Requested" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {requestData && requestData.otherRequests.map((otherRequest: Product) => {
                    return <BuyerRequests otherRequest={otherRequest} />
                })}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>

                {requestData && requestData.myRequests.map((myRequest: Product) => {
                    return <UserRequests myRequest={myRequest} />
                })}

            </CustomTabPanel>

        </Box>


    )
}
