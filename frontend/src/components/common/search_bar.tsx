import React, { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { Box, FormControl, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './styles.module.css';

export default function SearchBar(props:any) {
    const [showClearIcon, setShowClearIcon] = useState("none");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setShowClearIcon(event.target.value === "" ? "none" : "flex");
    };

    const handleClick = (): void => {
        // TODO: Clear the search input
        console.log("clicked the clear icon...");
    };

    return (
        <Box sx={{display:'flex',alignSelf:'center'}}>
            <FormControl>
                <TextField
                 sx={{
                    '& .MuiOutlinedInput-root': { // Target the outlined input root
                      borderRadius: 0,
                      boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
                    },
                  }}
                placeholder='Search'
                    size="small"
                    variant="outlined"
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                style={{ display: showClearIcon }}
                                onClick={handleClick}
                            >
                                <ClearIcon />
                            </InputAdornment>
                        )
                    }}
                />
            </FormControl>
        </Box> 
  )
}
