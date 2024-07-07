import { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Product } from '../../../constants/models';


interface InfiniteScrollProps {
    fetchProducts: (page: number, pageSize: number) => Promise<Product[]> // Function to fetch more data
    pageSize: number; // Define the page size
    initialItems?: Product[];
}

const useInfiniteScroll = ({ fetchProducts, pageSize, initialItems = [] }: InfiniteScrollProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState(initialItems);
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const [hasMore, setHasMore] = useState(true); // Track availability of more data
    const [scrollX, setScrollX] = useState(0);
    const ref = useRef<HTMLInputElement>(null);
    
    // const {  inView, entry } = useInView({
    //     /* Optional options */
    //     threshold: 0.8,
    //     rootMargin: "0px -100%"
    // });

    const fetchMoreData = async () => {
        
        const containerWidth = ref?.current?.getBoundingClientRect().width; // Get container width
        const scrollRightEdge = window.scrollX + window.innerWidth; // Right edge of viewport
        if (!isLoading && hasMore && containerWidth!=undefined && scrollRightEdge >= containerWidth - 0.2) {
            setIsLoading(true);
            const newData = await fetchProducts(currentPage, pageSize);
            console.log(newData);
            if (newData!= undefined){
                setItems(prevItems => [...prevItems, ...newData]);
                setCurrentPage(prevPage => prevPage + 1);
                setHasMore(newData.length > 0); // Check if there's more data to fetch based on new data length
            }
          
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (scrollX >0 && !isLoading) {
            fetchMoreData();
        }
    }, [scrollX, isLoading, fetchMoreData]);

    useEffect(() => {
       fetchMoreData();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
          setScrollX(window.scrollX);
        };
      
        window.addEventListener('scroll', handleScroll);
      
        return () => window.removeEventListener('scroll', handleScroll); // Cleanup
      }, [window]);
    

    return { items, isLoading, hasMore, ref, currentPage, pageSize };
};

export default useInfiniteScroll;
