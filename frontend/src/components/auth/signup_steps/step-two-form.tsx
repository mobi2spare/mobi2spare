import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setAddress } from '../../../store/actions';
import { StyledTextInput } from '../../text/text-styled';

export default function StepTwoSignUpForm() {

const { register, formState: { errors } } = useFormContext();
const dispatch = useDispatch();

const handleAdddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value);
  dispatch(setAddress(event.target.value)); 
};

  return (
    <Box>
    
    <StyledTextInput {...register('address', {required:true, onChange: (event) => handleAdddressChange(event) })} id='address'  variant="outlined" placeholder='Shop address' error={!!errors.organizationName} inputProps={{
      style: {
        padding: '0.5rem 1rem'
      }
    }}></StyledTextInput>
    </Box>
  )
}

