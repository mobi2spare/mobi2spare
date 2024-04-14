import { Box, Card, CardContent, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material'
import { BASE_URL } from '../../utils/api'
import AddCircle from '@mui/icons-material/AddCircle'
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function ProductCard(props: any) {
    const { product } = props;
    let attributeKeys: any;
    console.log(product);
    if (product && product.attribute_info.length > 0) {
        attributeKeys = Object.keys(product.attribute_info[0]);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>

            {/* <ImageList sx={{ overflowY: 'visible' }}> */}
            <Card square sx={{ 'backgroundColor': 'white', marginTop: '0px', overflow: 'visible', margin: '1rem 0.5rem' }}>

                <CardContent sx={{ color: 'black', display: 'flex', flexDirection: 'column' }}>

                            <Box sx={{width:'100px',height:'100px'}}>
                            {product.image_path.length > 0 ? <img src={BASE_URL + '/' + product.image_path[0]} style={{ 'objectFit': 'cover' }} width='100%' height='100%' alt={product.name} /> : null}
                            {/* <ImageListItemBar
                                    actionIcon={
                                        <IconButton
                                            onClick={() => { }}
                                            color='primary'
                                        >
                                            <FavoriteIcon />
                                        </IconButton>
                                    }
                                /> */}
                            </Box>

                    {console.log(product)}
                    <Typography sx={{ textTransform: 'capitalize', marginTop: '1rem',fontSize:'0.8rem' }}>{product.bname} {product.name}</Typography>
                    <Typography sx={{ textTransform: 'capitalize', marginTop: '1rem',fontSize:'0.8rem',color:'gray' }}>{product.cname}</Typography>
                    {attributeKeys.map((key: any) =>
                        <Box sx={{ display: 'flex' }}>

                            <Typography sx={{ textTransform: 'capitalize', fontSize:'0.8rem' }}>{key}</Typography>
                            <Typography>:</Typography>
                            <Typography sx={{ textTransform: 'capitalize', fontSize:'0.8rem' }}>{product.attribute_info[0][key]}</Typography>
                        </Box>

                    )}



                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <Typography sx={{ textTransform: 'capitalize', fontSize:'0.8rem'}}>{product.price}</Typography>
                        <AddCircle />
                    </Box>



                </CardContent>
            </Card>
            {/* </ImageList> */}


        </Box>
    )
}

// 

