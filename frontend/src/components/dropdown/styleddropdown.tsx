
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, useTheme } from '@mui/material'
import { Autocomplete, TextField } from '@mui/material';



export default function StyledDropDown(props: any) {


  const { title, items, onChange, itemValue, register, error, required, field_name } = props;
  // console.log(itemValue,items)
  return (
    <Box>
      <FormControl variant='outlined' fullWidth sx={{ marginBottom: '1rem' }}>
        <Paper elevation={3} sx={{ backgroundColor: '#F8F8F8', boxShadow: 'none' }} >
        <InputLabel shrink={true} id={`${title}-label`}>{title}</InputLabel>

          <Select {...register(field_name, { required: required })} onChange={onChange} error={`${error}.${field_name}`} native={true} label={title} labelId={`${title}-label`} value={

            itemValue ? itemValue : ""} name={field_name} MenuProps={{
              PaperProps: {
                sx: {
                  background: "#F8F8F8",
                  color: "black",
                }

              },

            }}
          >
            <option key={`Select-${title}`} value="">Select {title}</option>
            {items.map((items: any, idx: number) => (
              <option key={idx} value={items.name || Object.values(items)[0]}>{items.name || Object.values(items)[0]}</option>
            ))}
          </Select>
        </Paper>

      </FormControl>


    </Box>
  )
}
