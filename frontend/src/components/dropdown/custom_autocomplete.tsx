import { Autocomplete, Box, Popover, TextField } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';
import InfoIcon from '@mui/icons-material/Info';
export default function CustomControlledAutoComplete(props: any) {

    const { control, handleValueChange, itemData, onCustomInputChange, isLoading, component_name, required_text, title, freeSolo,defaultValue } = props
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    }

    return (
        <Box>
            <Controller
                name={component_name}
                control={control}
                rules={{
                    required: required_text
                }}
                render={({ field, fieldState }) => {
                    return (
                        <Autocomplete freeSolo={freeSolo} sx={{ marginBottom: '1rem' }} {...field} aria-labelledby={`${component_name}-select`} openOnFocus onChange={(event, newValue) => {
                            field.onChange(newValue);  // Update the form state
                            handleValueChange(event, newValue);  // Call your custom handler
                        }} ListboxProps={
                            {
                                sx: {
                                    background: "#F8F8F8",
                                    color: "black",
                                },
                            }
                        }
                            value={
                                defaultValue || field.value || `${required_text}`
                            }
                            options={
                                itemData
                            }

                            onInputChange={(event, newValue) => {
                                onCustomInputChange(event, newValue);
                                if (event && event.type === 'change') {
                                    field.onChange(newValue);  // Update the form state with the custom input value
                                }
                            }}
                            getOptionLabel={(option: any) => typeof option === 'string' ? option : option.name}
                            getOptionKey={(options: any) => options.id}
                            isOptionEqualToValue={(option: any, value: any) => {
                                return JSON.stringify(option) === JSON.stringify(value)

                            }}
                            renderInput={(params) => {

                                if (freeSolo) {
                                    return (<TextField {...params} label={title} error={!!fieldState.error}
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InfoIcon color="primary" style={{ marginRight: 8 }} onMouseEnter={handlePopoverOpen}
                                                    onMouseLeave={handlePopoverClose} />
                                            ),
                                        }}
                                        helperText={fieldState.error?.message} />)
                                }
                                else {
                                    return (<TextField {...params} label={title} error={!!fieldState.error}
                                        InputProps={{
                                            ...params.InputProps,

                                        }}
                                        helperText={fieldState.error?.message} />)
                                }


                            }
                            }
                            loading={isLoading}

                        />


                    );
                }}


            />
            {freeSolo ? <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom', // Adjust for desired placement (top, bottom)
                    horizontal: 'left',  // Adjust for desired placement (left, right)
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}>
                <div style={{ padding: '1rem', color: 'white' }}>You can enter a custom {component_name} if you don't find it in the list. Please try searching first. Please note that a new item will need to be approved by us.</div>
            </Popover> : null}



        </Box>
    )

}

