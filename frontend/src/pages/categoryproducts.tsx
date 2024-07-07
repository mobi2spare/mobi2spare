import { Box, Typography } from '@mui/material'
import SearchBar from '../components/common/search_bar'
import { useParams } from 'react-router-dom';
import { BASE_URL, GET_PRODUCTS_FOR_CATEGORY } from '../utils/api';

import PaginatedGrid from '../components/layout/grid_pagination';
import { useEffect } from 'react';


export default function CategoryProducts(props: any) {

  const headerStyles = { display: 'flex', flexDirection: 'column', marginBottom: '0.5rem' };
  const fontFamily = { fontFamily: 'RalewayExtraBoldItalic' };
  const headerTypoGraphyStyles = { marginLeft: '1rem', marginTop: '1rem', color: 'text.primary', fontSize: '1.5rem', alignSelf: 'start' };
  const paginatedGridStyle= {display:'grid',gridTemplateColumns : '1fr 1fr'}

  const { categoryId, categoryName } = useParams();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1rem',marginBottom:'3rem' }}>
      <SearchBar />
      <Box sx={headerStyles}>
        <Typography sx={{ ...headerTypoGraphyStyles, ...fontFamily,marginBottom:'1rem' }}>{categoryName}</Typography>
      </Box>
      <PaginatedGrid flexDirection='column' categoryId={categoryId} apiUrl={BASE_URL + `${GET_PRODUCTS_FOR_CATEGORY}${categoryId}`} style={paginatedGridStyle} />
    </Box>
  )
}
