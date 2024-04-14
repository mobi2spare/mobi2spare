
import { useEffect, useState } from 'react';
import Layout from "../components/layout/layout";
import { Box, Card, CardContent, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, InputAdornment, TextField, Typography } from '@mui/material';
import SearchBar from '../components/common/search_bar';
import { Category, Product } from '../constants/models';
import { BASE_URL, GET_CATEGORIES, GET_PRODUCTS } from '../utils/api';
import { TOKEN } from '../constants/constants';
import AddCircle from '@mui/icons-material/AddCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import ProductCard from '../components/common/product_card';


export default function UserHome() {

  const [categoryImages, setCategoryImages] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [isLoadingCategory, setisLoadingCategory] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      // setLoading(true); // Set loading state to indicate data fetching
      try {
        const token = localStorage.getItem(TOKEN);
        if (token !== undefined && token !== null) {
          const headers = new Headers();
          headers.append('Authorization', `Bearer ${token}`);
          setisLoadingCategory(true);
          const response = await fetch(BASE_URL + GET_CATEGORIES, {
            method: 'GET',
            headers,
          });
          const data = await response.json();
          setCategoryImages(data.data);

        }

      } catch (error) {
        // setError(error);
      } finally {
        // setLoading(false); // Set loading state to false after completion
        setisLoadingCategory(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      // setLoading(true); // Set loading state to indicate data fetching
      try {
        const token = localStorage.getItem(TOKEN);
        if (token !== undefined && token !== null) {
          const headers = new Headers();
          headers.append('Authorization', `Bearer ${token}`);
          setIsLoadingProduct(true);
          const response = await fetch(BASE_URL + GET_PRODUCTS, {
            method: 'GET',
            headers,
          });
          const data = await response.json();
          setProducts(data.data);
          console.log(data.data);
        }

      } catch (error) {
        // setError(error);
      } finally {
        // setLoading(false); // Set loading state to false after completion
        setIsLoadingProduct(false);
      }
    };

    fetchProducts();
  }, []);



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1rem', alignItems: 'center'}}>
      <SearchBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1rem', alignItems: 'center',justifyContent:'center' }}>
        <Typography sx={{ marginLeft: '1rem', marginTop: '1rem',color:'text.primary',fontSize:'1.5rem',marginBottom:'1rem' }}>Categories</Typography>
        <ImageList sx={{marginTop: '0px'}}>
          {categoryImages != undefined && categoryImages.map((item) => (
            <Card square sx={{ 'backgroundColor': 'white',  }}>
              <CardContent sx={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
                <ImageListItem key={item.name} sx={{ width: '100%' }} cols={2}>
                <Box sx={{width:'100px',height:'100px'}}>
                  {item.image_path?.length > 0 ? <img src={BASE_URL + '/' + item.image_path[0]} style={{ 'objectFit': 'cover' }} width='100%' height='100%' alt={item.name} /> : null}
                  </Box>
                </ImageListItem>
                <Typography sx={{ textTransform: 'capitalize', alignSelf: 'center', marginTop: '1rem' }}>{item.name}</Typography>
              </CardContent>
            </Card>
          ))}
        </ImageList>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginBottom:'1rem'  }}>
        <Typography sx={{ marginLeft: '1rem', marginTop: '1rem',color:'text.primary',fontSize:'1.5rem' }}>Explore</Typography>
      </Box>
      {!isLoadingProduct ? <Grid container spacing={2} style={{ overflowX: 'auto',flexWrap:'nowrap',marginBottom:'1rem',padding:'1rem'}}>
        {products.map(product => (
          <ProductCard key={product.pid} product={product} />
        ))}

      </Grid> : null}

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginBottom:'1rem' }}>
        <Typography sx={{ marginLeft: '1rem', marginTop: '1rem',alignSelf:'start',color:'text.primary',fontSize:'1.5rem' }}>Best Selling</Typography>
      </Box>
      {!isLoadingProduct ? <Grid container spacing={2} style={{ overflowX: 'auto',flexWrap:'nowrap',marginBottom:'1rem',padding:'1rem' }}>
      {products.map(product => (
          <ProductCard key={product.pid} product={product} />
        ))}
      </Grid> : null}
    </Box>
  )
}


UserHome.Layout = Layout;