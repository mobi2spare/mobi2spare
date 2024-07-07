import React, { useEffect, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { Product } from '../../constants/models';
import ProductCard from '../common/product_card';
import CircularProgress from '@mui/material/CircularProgress';
import api from '../../utils/network_requests';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';



function PaginatedGrid(props: any) {

  const { apiUrl, style,flexDirection,categoryId } = props;

  let queryKey;

  if (categoryId ){
     queryKey = `products-${categoryId}`
  }
  else{
     queryKey =  'products' ;
  }
  
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery(queryKey, ({ pageParam = 1 }) => api.get(`${apiUrl}?page=${pageParam}`), {
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.data.pagination.page >= lastPage.data.pagination.totalPages){
        return undefined;
      }
      return lastPage && lastPage.data.pagination.page+1;
    }
    
  });

  const flattenedData = useMemo(
    () => (data ? data?.pages.flatMap(item => item.data.data) : []),
    [data]
);



const { ref, inView } = useInView({threshold:0.5});

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <Box sx={{display:'flex',flexDirection:{flexDirection}}} > 
       <Grid container sx={style}>
        {data && flattenedData.map((product: Product,i) => (
          <Grid key={product && product.id} item md={4}>
          <ProductCard  product={product} />
          </Grid>
        ))}
        
      </Grid>
      <Box ref={ref}>
      {isFetching && hasNextPage && <CircularProgress />}
      </Box>
      {!hasNextPage && categoryId? <Box display={'flex'} justifyContent={'center'}>No more items to display.</Box>:null}  
    </Box>
  );
}

export default PaginatedGrid;
