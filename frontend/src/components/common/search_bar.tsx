import React, { useEffect, useState } from 'react'
import { Autocomplete, TextField } from '@mui/material';

function debounce(func:Function, delay:number) {
    let timeout : null | NodeJS.Timeout =null
    return (query:string) => {
        if(timeout) clearTimeout(timeout)
        timeout=setTimeout(() => {
            func(query)
        }, delay)
    }
}

export default function SearchBar(props: any) {
    const [showClearIcon, setShowClearIcon] = useState("none");

    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState([]);

    const fetchData = async (query: string) => {
        // Implement your logic to fetch data based on the query
        // // This can be an API call, database query, etc.
        console.log(query);
        // const response = await fetch(`your-api-endpoint?q=${query}`);
        // const data = await response.json();
        // setItems(data.items); // Replace with your data structure
    };

    const debouncedFetchData = debounce(fetchData, 500);


    useEffect(() => {
        if (searchTerm.length > 0) { // Adjust minimum search length (optional)
            debouncedFetchData(searchTerm);
        } else {
            setItems([]); // Clear items if query is too short
        }
    }, [searchTerm]); // Re-run effect on searchTerm change


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setShowClearIcon(event.target.value === "" ? "none" : "flex");
    };

    const handleClick = (): void => {
        // TODO: Clear the search input
        console.log("clicked the clear icon...");
    };

    const getOptionLabel = (option: any) => option.label || option.name; // Handle data structure

    const options = items; // Filtered list
    return (

        <Autocomplete sx={{ display: 'flex', minWidth: '80%', alignSelf: 'center' }}
            filterOptions={(x) => x}
            forcePopupIcon={false}
            options={options}
            getOptionLabel={getOptionLabel}
            onInputChange={(_, inputValue) => {
                setSearchTerm(inputValue)
            }}
            renderInput={(params) => (
                <TextField sx={{
                    '& .MuiOutlinedInput-root': { // Target the outlined input root
                        borderRadius: '0 !important',
                        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
                    },
                }} {...params} label="Search Items" placeholder='Search'
                    size="small" variant="outlined" />
            )}

        />
    );
};



