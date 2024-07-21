import { Box, Card, CardContent, Chip, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { CartProduct } from '../constants/models'
import { useLocation } from 'react-router-dom'
import { BASE_URL } from '../utils/api'
import { setTitle } from '../store/actions'
import { useDispatch } from 'react-redux'
import { orange } from '@mui/material/colors'
import placeholder_product from '../../assets/images/placeholder_product.svg'
import { StyledButton } from '../components/buttons/styled_buttons'

const imageStyles = { width: '100%', height: '100%', objectFit: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center' } as React.CSSProperties;
const montserratSemiBold = {
    fontFamily: "MontserratSemiBold,Arial,sans-serif",

}
export default function SingleProductInfo() {
    const dispatch = useDispatch();

    const location = useLocation();
    const { state } = location;
    const product = state?.product as CartProduct;
    console.log(product);
    dispatch(setTitle(product.bname + " " + product.mname + " " + product.cname))


    return (<Box sx={{marginBottom:'4rem'}}>
        <Box>
            <Card sx={{ 'backgroundColor': 'white', borderRadius: '0px 0px 0px 2rem', boxShadow: '5' }}>
                <CardContent sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                    <Box sx={{ width: '50%' }}>

                        <Carousel height={'12rem'} autoPlay={false}>
                            {
                                product.image_path.map((item, i) =>
                                    <img style={imageStyles} key={i} src={BASE_URL + '/' + item} />)
                            }
                        </Carousel>
                    </Box>
                </CardContent>
            </Card>

        </Box>
        <Box padding={'1rem'} display={'flex'} flexDirection={'column'}>
            <Typography sx={{ color: orange[900], fontSize: '2rem' }}>&#8377;{product.price}</Typography>
            <Typography sx={{ fontSize: '1.3rem', ...montserratSemiBold }}>{product.bname} {product.mname}</Typography>
            <Typography sx={{ fontSize: '1.2rem', ...montserratSemiBold }}>Ram/Storage</Typography>
            <Chip sx={{ marginTop: '0.5rem',width:'40%' }} label={product.configuration} variant="outlined" />
            <Typography sx={{ fontSize: '1.2rem', marginTop: '1rem' }}>Description</Typography>
            <Typography sx={{ ...montserratSemiBold }}>{product.description}</Typography>
            <StyledButton sx={{alignSelf:'center'}}>Buy Now</StyledButton>

            
        </Box>
        
       


    </Box>


    )
}
