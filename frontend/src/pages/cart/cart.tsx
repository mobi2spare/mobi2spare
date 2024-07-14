import { Box, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { setTitle } from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { MENU_LABELS, USER } from '../../constants/constants'
import { CartProduct, Product } from '../../constants/models'
import CartInfoCard from './cartinfocard'
import { CartItem } from '../../store/store'
import api from '../../utils/network_requests'
import { toast } from 'react-toastify'
import { BASE_URL, GET_FROM_CART } from '../../utils/api'
import { useQuery } from 'react-query'
import { REACT_QUERY_GET_FROM_CART } from '../../constants/react-query-constants'
import { User } from '../../contexts/auth/auth.context'
import { StyledButton } from '../../components/buttons/styled_buttons'

export default function ShoppingCart() {
  const montserratBold = {
    fontFamily: "MontserratBold,Arial,sans-serif",

  }

  const montserratSemiBold = {
    fontFamily: "MontserratSemiBold,Arial,sans-serif",

  }

  const [selectedItemTotalPrice, setSelectedItemTotalPrice] = useState(0);
  const [cartData, setCartData] = useState<CartProduct[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle(MENU_LABELS.CHECKOUT))

  }, [])

  const getDataFromCart = async () => {

    const item = localStorage.getItem(USER);
    const user: User = JSON.parse(item || '{}');
    const cartId = user.cartId
    const result = await api.get(`${BASE_URL}${GET_FROM_CART}/${cartId}`);
    setCartData(result.data.data);
    let totalPrice = 0;
    result.data.data.forEach((cartItem: CartProduct) => {
      totalPrice += (cartItem.price*cartItem.cart_quantity);
      cartItem.isChecked = true;
    });
    setSelectedItemTotalPrice(totalPrice);

  }

  const onPriceChange = (priceChange: number) => {
    setSelectedItemTotalPrice(selectedItemTotalPrice + priceChange)
  }


  const { isLoading, error: cartError } = useQuery(REACT_QUERY_GET_FROM_CART, getDataFromCart, {
    retry: 3,
  });

  return (
    <Box display={'grid'} gridTemplateRows={'1fr 1fr'} gap={'3rem'} sx={{ justifyContent: 'center' }}>

      {cartData?.map((product: CartProduct) => {

        return (

          <CartInfoCard product={product} onPriceChange={onPriceChange} />)

      })}
      {cartData.length > 0 ? <Box margin={'0.5rem'} display={'flex'} flexDirection={'column'}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography sx={{ ...montserratBold, color: 'gray' }}>Selected items</Typography>
          <Typography sx={{ ...montserratSemiBold }}>&#8377;{selectedItemTotalPrice}</Typography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography sx={{ ...montserratBold, color: 'gray' }}>Shipping</Typography>
          <Typography sx={{ ...montserratSemiBold }}>&#8377;200</Typography>
        </Box>
      </Box> : isLoading ? <CircularProgress /> : <p>No items in the cart</p>}
      {cartData.length > 0 ?<StyledButton sx={{width:'50%',justifySelf:'center'}}>Checkout</StyledButton>:null}
      

    </Box>
  )

}
