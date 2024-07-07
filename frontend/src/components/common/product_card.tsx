import { Box, Card, CardContent, IconButton,Typography } from '@mui/material'
import { ADD_TO_CART, BASE_URL } from '../../utils/api'
import AddCircle from '@mui/icons-material/AddCircle'
import placeholder_product from '../../assets/images/placeholder_product.svg'
import { useState } from 'react';
import { useQuery } from 'react-query';
import { REACT_QUERY_ADD_TO_CART } from '../../constants/react-query-constants';
import api from '../../utils/network_requests';
import { toast } from 'react-toastify';
import { User } from '../../contexts/auth/auth.context';
import { USER } from '../../constants/constants';

interface CartAddInfo  {
    product_id : number,
    cart_id : number
}


export default function ProductCard(props: any) {
    const { product } = props;
    let attributeKeys: any;
    if (product && product.attribute_info && product.attribute_info.length > 0) {
        attributeKeys = Object.keys(product.attribute_info[0]);
    }
    const [isUpdatingCart, setIsUpdatingCart] = useState(false);


    const handleAddCartButtonClick = () => {
        setIsUpdatingCart(true);
        toast.dismiss();
        toast.loading('Updating cart', { progress: undefined })
         // Trigger the query on button click
    };


    const myriadProFont = {
        fontFamily: "MyriadProRegular,Arial,sans-serif",

    }

    const  updateCart = async ()=>{
       
        const item = localStorage.getItem(USER);
        const user : User  = JSON.parse(item || '{}');
        const cartId = user.cartId
        const cartData : CartAddInfo = {
            product_id:product.pid,
            cart_id:cartId

        }
        const result = await api.post(BASE_URL+ADD_TO_CART,cartData);
        if (cartError){
            toast.dismiss();
            toast.error('Failed to add item to cart');
        }
        else{
            toast.dismiss();
            toast.info('Cart updated successfully');
        }
        
        
        setIsUpdatingCart(false);

    }

    const { isLoading, error:cartError, data } = useQuery(REACT_QUERY_ADD_TO_CART, updateCart, {
        enabled: isUpdatingCart,retry:1 // Only fetch data when isFetching is true
      });


    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', margin: 'auto' }}>

            {/* <ImageList sx={{ overflowY: 'visible' }}> */}
            <Card square sx={{ 'backgroundColor': 'white', marginTop: '0px', overflow: 'visible', margin: '1rem', borderRadius: '0.5rem', width: '10rem', padding: '0.1rem', boxShadow: '5', display: 'flex' }}>


                <CardContent sx={{ color: 'black', display: 'flex', flexDirection: 'column' }}>

                    <Box sx={{ height: '7rem', display: 'flex' }}>
                        {product && product.image_path && product.image_path.length > 0 ? <img src={BASE_URL + '/' + product.image_path[0]} style={{ 'objectFit': 'contain' }} width='100%' height='100%' alt={product && product.name} loading='lazy' /> : <img src={placeholder_product} />}


                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '0.5rem', flex: '1' }}>

                        <Typography sx={{ textTransform: 'capitalize', marginTop: '0.1rem', fontSize: '0.75rem', ...myriadProFont, textWrap: 'nowrap' }}>{product && product.bname} {product && product.name}</Typography>
                        <Typography sx={{ textTransform: 'capitalize', marginTop: '0.5rem', fontSize: '0.60rem', color: 'gray', ...myriadProFont }}>{product && product.cname}</Typography>
                        {attributeKeys && attributeKeys.map((key: any) =>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>

                                <Typography sx={{ textTransform: 'capitalize', fontSize: '0.6rem', ...myriadProFont }}>{key}</Typography>
                                <Typography> : </Typography>
                                <Typography sx={{ textTransform: 'capitalize', fontSize: '0.6rem', ...myriadProFont }}>{product && product.attribute_info[0][key]}</Typography>

                            </Box>

                        )}
                        <Box display={'flex'} flex={1} flexDirection={'row'} justifyContent={'space-between'}>
                            <Typography sx={{ textTransform: 'capitalize', fontSize: '0.8rem', ...myriadProFont }}>{product && `₹${product.price}`}</Typography>
                            <IconButton onClick={handleAddCartButtonClick}>
                                <AddCircle sx={{ width: '2rem', height: '2.5rem' }} />
                            </IconButton>

                        </Box>
                    </Box>

                </CardContent>

                {/*  */}
            </Card>
            {/* </ImageList> */}


        </Box>
    )
}

// 

