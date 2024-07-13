import { Box, Card, CardContent, IconButton, Paper, TextField, Typography, useTheme } from '@mui/material'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import placeholder_product from '../../assets/images/placeholder_product.svg'
import { BASE_URL, UPDATE_CART_QTY } from '../../utils/api';
import { orange } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add'
import AddRemoveQuantityButtons from '../../components/buttons/add_remove_buttons';
import { USER } from '../../constants/constants';
import { User } from '../../contexts/auth/auth.context';
import api from '../../utils/network_requests';
import Checkbox from '@mui/material/Checkbox';
import { CartProduct, Product } from '../../constants/models';

interface CartInfoProps {
  product:CartProduct,
  onPriceChange : (price:number)=>void
}

export default function CartInfoCard(props: CartInfoProps) {

 
  // console.log(props);
  const { product,onPriceChange } = props;
  const [quantity, setQuantity] = useState(product.cartQuantity);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const myriadProFont = {
    fontFamily: "MyriadProRegular,Arial,sans-serif",

  }
  const updateQtyInCart = async (quantity:number) => {

    const item = localStorage.getItem(USER);
    const user: User = JSON.parse(item || '{}');
    const cartId = user.cartId
    const cartData = {
        cart_id:cartId,
        product_id:product.id,
        quantity:quantity
      
    }
    await api.patch(`${BASE_URL}${UPDATE_CART_QTY}/`,cartData);
    

  }

  const onCartItemSelectionChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    product.isChecked = event.target.checked;
    if (product.isChecked){
      onPriceChange(product.price);
    }
    else{
      onPriceChange(-product.price);
    }
    
  }

  const increaseQuantity = () => {
    console.log(product);
    if (quantity >= product.quantity){
      return;
    }
    const newPrice = (quantity+1) * product.price
    onPriceChange(product.price);
    setTotalPrice(newPrice);
    updateQtyInCart(quantity + 1)
    setQuantity(quantity + 1);
    
    
}
  const decreaseQuantity = () => {
    if (quantity > 1) {
        const newPrice = (quantity-1) * product.price
        onPriceChange(-product.price);
        setTotalPrice(newPrice);
        updateQtyInCart(quantity-1);
        setQuantity(quantity - 1);
        
    }
    else{
      if (window.confirm('This product will be deleted from the cart. Are you sure?')){
        updateQtyInCart(0);
      };
    }
   
}

  return (
    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-evenly'}>
      <Checkbox checked={product.isChecked} sx={{color: orange[900]}} onChange={onCartItemSelectionChange} />
      <Card sx={{ backgroundColor: 'white', margin: '0.5rem', flexGrow: 0 }} >
        <CardContent sx={{ height: '5rem',color: 'black', display: 'flex', flexDirection: 'row' }}>

          <Box sx={{ height: '3rem',width:'3rem', display: 'flex',alignSelf:'center' }}>
            {product && product.image_path && product.image_path.length > 0 ? <img src={BASE_URL + '/' + product.image_path[0]} style={{ 'objectFit': 'cover' }} width='100%' height='100%' alt={product && product.name} loading='lazy' /> : <img src={placeholder_product} />}


          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '0.5rem', flex: '1', marginLeft: '2rem' }}>

            <Typography sx={{ textTransform: 'capitalize', marginTop: '0.1rem', fontSize: '0.75rem', ...myriadProFont, textWrap: 'nowrap' }}>{product && product.cname}</Typography>
            <Typography sx={{ textTransform: 'capitalize', marginTop: '0.5rem', fontSize: '0.75rem', color: 'gray', ...myriadProFont }}>{product.bname} {product.mname}</Typography>
            <Typography sx={{ textTransform: 'capitalize', marginTop: '0.1rem', fontSize: '0.75rem', ...myriadProFont, textWrap: 'nowrap' }}>{product.configuration}</Typography>
            <Box alignSelf={'end'} marginLeft={'1rem'} paddingLeft={'1rem'}>
              <Typography sx={{ color: orange[900], textTransform: 'capitalize', marginLeft: '2rem', marginTop: '0.1rem', fontSize: '0.75rem', ...myriadProFont, textWrap: 'nowrap' }}>&#8377;{product && product.price}</Typography>

            </Box>
          </Box>

        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', alignItems: 'center', flexBasis:'min-content',flexGrow:1,justifyContent:'center' }}>
      <AddRemoveQuantityButtons width='70%' quantity={quantity} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
      <Typography marginTop={'1rem'} justifyContent={'center'} sx={{ color: orange[900],marginRight:'1rem', fontSize: '1rem', ...myriadProFont, textWrap: 'nowrap' }}>&#8377;{totalPrice}</Typography>


      </Box>
      
      
    </Box>
  )
}
