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
import { UI_BASE_URL, USER } from '../../constants/constants';
import { AttributeInfo, CartProduct } from '../../constants/models';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';
import { PRODUCT, PRODUCT_INFO } from '../../router/router-path';

interface CartAddInfo  {
    product_id : number,
    cart_id : number
}

interface ProductProps {
    product:CartProduct
}

export const ProductCard: React.FC<ProductProps> = ({ product }) => {
    const [isUpdatingCart, setIsUpdatingCart] = useState(false);
    const navigate = useNavigate();

    const handleAddCartButtonClick = () => {

        setIsUpdatingCart(true);
        toast.dismiss();
        
         // Trigger the query on button click
    };


    const myriadProFont = {
        fontFamily: "MyriadProRegular,Arial,sans-serif",

    }

    const handleProductCardClick = (_:any)=>{
        navigate(`/${UI_BASE_URL+PRODUCT}/${product.id}`,{ state: { product: product } });
    }

    const  updateCart = async ()=>{
        if (product.cart_quantity==null ||  product.cart_quantity < product.quantity){
        toast.loading('Updating cart', { progress: undefined })
        const item = localStorage.getItem(USER);
        const user : User  = JSON.parse(item || '{}');
        const cartId = user.cartId
        const cartData : CartAddInfo = {
            product_id:product.id,
            cart_id:cartId

        }
        await api.post(BASE_URL+ADD_TO_CART,cartData);
        if (cartError){
            toast.dismiss();
            toast.error('Failed to add item to cart');
        }
        else{
            if (product.cart_quantity===null){
                product.cart_quantity = 1
            }
            else{
                product.cart_quantity +=1
            }
            console.log(product);
            toast.dismiss();
            toast.info('Cart updated successfully');
        }
        
        
        setIsUpdatingCart(false);
    }
    else{
        console.log(product);
        toast.info('You have reached the maximum quantity for this item')
    }

    }

    const { isLoading, error:cartError } = useQuery(REACT_QUERY_ADD_TO_CART, updateCart, {
        enabled: isUpdatingCart ,retry:1 // Only fetch data when isFetching is true
      });


    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', margin: 'auto' }}>

            <Card square sx={{ 'backgroundColor': 'white', marginTop: '0px', overflow: 'visible', margin: '1rem', borderRadius: '0.5rem', width: '10rem', padding: '0.1rem', boxShadow: '5', display: 'flex' }}>

                <CardActionArea onClick={handleProductCardClick}>
                <CardContent sx={{ color: 'black', display: 'flex', flexDirection: 'column',padding:'0.5rem',paddingBottom:'0rem'  }}>

                    <Box sx={{ height: '7rem', display: 'flex',width:'100%' }}>
                        {product && product.image_path && product.image_path.length > 0 ? <img src={BASE_URL + '/' + product.image_path[0]} style={{ 'objectFit': 'contain' }} width='100%' height='100%' alt={product && product.name} loading='lazy' /> : <img src={placeholder_product} />}


                    </Box>
                    <Typography sx={{ textTransform: 'capitalize', marginTop: '0.5rem', fontSize: '0.75rem', color: 'gray', ...myriadProFont }}>{product && product.configuration}</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '0.5rem', flex: '1' }}>

                        <Typography sx={{ textTransform: 'capitalize', marginTop: '0.1rem', fontSize: '0.75rem', ...myriadProFont, textWrap: 'nowrap' }}>{product && product.bname} {product && product.name}</Typography>
                        <Typography sx={{ textTransform: 'capitalize', marginTop: '0.5rem', fontSize: '0.60rem', color: 'gray', ...myriadProFont }}>{product && product.cname}</Typography>
                        {product.attribute_info.map((attributeItem: AttributeInfo) =>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ textTransform: 'capitalize', fontSize: '0.6rem', ...myriadProFont }}>{attributeItem.attribute_name}</Typography>
                                <Typography> : </Typography>
                                <Typography sx={{ textTransform: 'capitalize', fontSize: '0.6rem', ...myriadProFont }}>{attributeItem.attribute_value}</Typography>

                            </Box>

                        )}
                        <Box display={'flex'} flex={1} flexDirection={'row'} justifyContent={'space-between'}>
                        <Typography sx={{ textTransform: 'capitalize', fontSize: '0.8rem', ...myriadProFont }}>{product && `${product.mname}`}</Typography>
                            <Typography sx={{ textTransform: 'capitalize', fontSize: '0.8rem', ...myriadProFont }}>{product && `₹${product.price}`}</Typography>
                            <IconButton onClick={handleAddCartButtonClick}>
                                <AddCircle sx={{ width: '2rem', height: '2rem' }} />
                            </IconButton>

                        </Box>
                    </Box>

                </CardContent>
                </CardActionArea>

                {/*  */}
            </Card>


        </Box>
    )
}

// 

