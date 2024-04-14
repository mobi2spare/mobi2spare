import { Paper ,Button} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import ImageCaraouselLoader from './imagecarousel';



export default function SingleProduct(props:any) {
    // var items = [
    //     {
    //         imageurl : "https://facts.net/wp-content/uploads/2023/07/20-facts-about-pikachu-1689578613.jpg"
    //     },
    //     {
    //         imageurl : "https://static1.srcdn.com/wordpress/wp-content/uploads/2021/10/pokemon-why-pikachu-never-evolved.jpg"
    //     }
    // ];

const [items, setItems] = useState([]); // State to store image URLs
  const [isLoading, setIsLoading] = useState(true); // State for loading

  useEffect(() => {
    // Fetch image URLs from a remote server (replace with your logic)
    fetch('http://localhost:8800/api/products/4', {
        headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiR2VuZXJhbFVzZXIiLCJpYXQiOjE3MTE4ODc5NDIsImV4cCI6MTcxMTk3NDM0Mn0.WoJX91orWpKa9eefJ5tF6yjuTMBJxqoIi85RCrDcgGo'}
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.data.image_path);
        setItems(data.data.image_path); // Update items with fetched URLs
        setIsLoading(false); // Set loading to false
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <Paper>
        {isLoading ? (
      // Display a loading indicator or placeholder content while loading
      <p>Loading product details...</p>
    ) : (
      <>
        {/* <h2>{props.item.name}</h2>
        <p>{props.item.description}</p> */}
        <Carousel>
        {items.length > 0 && ( // Check if items has elements
          <Carousel>
            {items.map((item, i) => (
              <ImageCaraouselLoader key={i} item={item} />
            ))}
          </Carousel>
        )}
        </Carousel>
        <Button className="CheckButton">Check it out!</Button>
      </>
    )}
        </Paper>
  )
}
