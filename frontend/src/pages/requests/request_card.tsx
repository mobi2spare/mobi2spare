import { Box, Card, CardContent, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import placeholder_product from '../../assets/images/placeholder_product.svg'

import { BASE_URL } from '../../utils/api';
import { Product } from '../../constants/models';

interface RequestCardProps {
    product: Product

}
export const RequestCard: React.FC<RequestCardProps> = ({ product }) => {
    const myriadProFont = {
        fontFamily: "MyriadProRegular,Arial,sans-serif",

    }
    return (
        <Box>
            <Card sx={{ backgroundColor: 'white', margin: '0.5rem', flexGrow: 0 }} >
                <CardContent sx={{ height: '5rem', color: 'black', display: 'flex', flexDirection: 'row' }}>

                    <Box sx={{ height: '3rem', width: '3rem', display: 'flex', alignSelf: 'center' }}>
                        {product && product.image_path && product.image_path.length > 0 ? <img src={BASE_URL + '/' + product.image_path[0]} style={{ 'objectFit': 'cover' }} width='100%' height='100%' alt={product && product.name} loading='lazy' /> : <img src={placeholder_product} />}


                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '0.5rem', flex: '1', marginLeft: '2rem' }}>

                        <Typography sx={{ textTransform: 'capitalize', marginTop: '0.1rem', fontSize: '0.75rem', ...myriadProFont, textWrap: 'nowrap' }}>{product && product.cname}</Typography>
                        <Typography sx={{ textTransform: 'capitalize', marginTop: '0.5rem', fontSize: '0.75rem', color: 'gray', ...myriadProFont }}>{product.bname} {product.mname}</Typography>
                        <Typography sx={{ textTransform: 'capitalize', marginTop: '0.1rem', fontSize: '0.75rem', ...myriadProFont, textWrap: 'nowrap' }}>{product.configuration}</Typography>

                    </Box>

                </CardContent>
            </Card>
        </Box>
    )
}
