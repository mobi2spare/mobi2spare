import { ImageList, ImageListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Image {
  id: string;
  url: string;
  title?: string; // Optional title for alt text
}

interface ImageListWithPaginationProps {
  images: Image[];
  fetchMoreImages: (page: number) => Promise<void>;
  isLoading: boolean;
}

const ImageListWithPagination: React.FC<ImageListWithPaginationProps> = ({
  images,
  fetchMoreImages,
  isLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [ref, inView] = useInView({ threshold: 0.5 }); // Observe element when 50% in viewport

  useEffect(() => {
    if (inView && !isLoading) { // Ensure not fetching while already loading
      fetchMoreImages(currentPage);
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, [inView, isLoading, fetchMoreImages, currentPage]);

  return (
    <div ref={ref}>
      <ImageList cols={3}> {/* Adjust column count as needed */}
        {images.map((image) => (
          <ImageListItem key={image.id}>
            <img
              src={image.url}
              alt={image.title || 'Image'} // Provide default alt text
              onError={(event) => {
                // event.target.src = 'placeholder-image.jpg'; // Handle broken images gracefully
              }}
            />
          </ImageListItem>
        ))}
        {isLoading && <div>Loading more images...</div>} {/* Display loading indicator */}
      </ImageList>
    </div>
  );
};

export default ImageListWithPagination;
