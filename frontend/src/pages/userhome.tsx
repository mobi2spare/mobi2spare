
import { useEffect, useState } from 'react';
import Layout from "../components/layout/layout";
import { Box, Card, CardContent, ImageList, ImageListItem, Typography } from '@mui/material';
import SearchBar from '../components/common/search_bar';
import { Category } from '../constants/models';
import { BASE_URL, GET_CATEGORIES, GET_PRODUCTS } from '../utils/api';
import { TOKEN, USER } from '../constants/constants';
import PaginatedGrid from '../components/layout/grid_pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import api from '../utils/network_requests';
import { useQuery } from 'react-query';
import { setTitle } from '../store/actions';
import { useDispatch } from 'react-redux';
import { User } from '../contexts/auth/auth.context';

export default function UserHome() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle(""))
  
  }, [])
  
  
  const fetchCategories = async () => {
        const response = await api.get(BASE_URL + GET_CATEGORIES);
        const data =  response.data;
        return data.data;
    
  };

  const item = localStorage.getItem(USER);
  const user : User  = JSON.parse(item || '{}');
  const cartId = user.cartId
  
  const { isLoading: isLoadingCategory, error: errorCategories, data: categoriesData } = useQuery('categoryimages', fetchCategories);


  const headerStyles = { display: 'flex', flexDirection: 'column', marginBottom: '0.5rem' };
  const fontFamily = {fontFamily:'RalewayExtraBoldItalic'};
  const headerTypoGraphyStyles = { marginLeft: '1rem', marginTop: '1rem', color: 'text.primary', fontSize: '1.5rem', alignSelf: 'start' };
  const paginatedGridStyles = { overflowX: 'auto', flexWrap: 'nowrap', marginBottom: '2rem', padding: '0.5rem' };
  useEffect(() => {
    

    fetchCategories();
  }, []);

  
  // const ImageListItemClickable = (props:any,categoryId:number) => { // Include categoryId prop
    const navigate = useNavigate();
  
    const handleClick = (categoryId:number, categoryName:string) => {
      // Handle potential missing categoryId or empty string
      if (categoryId) {
        navigate(`/category/${categoryId}/${categoryName}`); // Navigate to category details
      } else {
        console.warn('Missing categoryId prop for ImageListItem navigation.');
      //   // Optionally: Handle missing categoryId (e.g., display error message)
      }
    }
  // }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
      <SearchBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1rem', justifyContent: 'start', padding: '0rem 1rem' }}>
        <Typography sx={{marginTop: '1rem', color: 'text.primary', fontSize: '1.5rem', marginBottom: '0.5rem',...fontFamily }}>Categories</Typography>
        <ImageList sx={{ marginTop: '0px' }} gap={16}>

          {!isLoadingCategory ?categoriesData &&  categoriesData.map((item:Category) => (
            <Card square sx={{ 'backgroundColor': 'white', boxShadow: '2', borderRadius: '0.5rem' }} onClick={()=>handleClick(item.id,item.name)}>
              <CardContent sx={{ color: 'black', display: 'flex', flexDirection: 'column', padding: "0rem !important" }}>
                <ImageListItem key={item.name} sx={{ width: '100%' }} cols={1}>
                  {item.image_path?.length > 0 ? <img src={BASE_URL + '/' + item.image_path[0]} style={{ 'objectFit': 'cover' }} width='100%' height='100%' alt={item.name} /> : null}
                </ImageListItem>
              </CardContent>
            </Card>
          )) : <Box sx={{ display: 'flex' ,justifyItems:'center'}}>
            <CircularProgress />
          </Box>}
        </ImageList>
      </Box>
      
      <Box sx={headerStyles}>
        <Typography sx={{...headerTypoGraphyStyles,...fontFamily}} >Explore</Typography>
      </Box>
      <PaginatedGrid flexDirection='row' apiUrl={BASE_URL + GET_PRODUCTS} style={paginatedGridStyles} cartId={cartId}/>

      <Box sx={headerStyles}>
        <Typography sx={{...headerTypoGraphyStyles,...fontFamily}}>Best Selling</Typography>
      </Box>
      <PaginatedGrid flexDirection='row' apiUrl={BASE_URL + GET_PRODUCTS} style={paginatedGridStyles} cartId={cartId}/>

   
    </Box>
  )
}


UserHome.Layout = Layout;