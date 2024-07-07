import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setAadharNumber } from '../../../store/actions';
import { StyledTextInput } from '../../text/text-styled';


export default function StepThreeSignUpForm() {
  const { register, formState: { errors } } = useFormContext();
  const dispatch = useDispatch();

  const handleAadharChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAadharNumber(event.target.value)); // Dispatch action to update state
  };

  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
      <StyledTextInput {...register('adharNumber', { onChange: (event) => handleAadharChange(event) })} type='number' id='adharNumber' variant="outlined" placeholder='Adhar Number' sx={{ marginTop: '1rem' }} error={!!errors.adharNumber} inputProps={{
        style: {
          padding: '0.5rem 1rem'
        }
      }}></StyledTextInput>
    </Box>
  )
}