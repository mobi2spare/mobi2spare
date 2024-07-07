
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setOtp } from '../../../store/actions';

export default function StepFourSignUpForm() {
  const { register, watch,formState: { errors } } = useFormContext();
  const dispatch = useDispatch();
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    dispatch(setOtp(event.target.value)); // Dispatch action to update state
  };

  const handleResend = () => {
    setIsResendDisabled(true);
    setTimeout(() => setIsResendDisabled(false), 45000); // 45 seconds in milliseconds
  };

  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>

      <TextField {...register('otp')} onChange={handleOtpChange} id='otp' type='number' variant="outlined" name='shopaddress' placeholder='OTP' sx={{ marginTop: '1rem' }} error={!!errors.otp} inputProps={{
        style: {
          padding: '0.5rem 1rem'
        }
      }}></TextField>
      <Box display={'flex'} alignSelf={'end'}>
        <IconButton>
          <Button disabled={isResendDisabled} onClick={handleResend} color='primary' variant="text" sx={{ fontSize: '1rem', textTransform: 'capitalize' }}>
            Resend <RefreshIcon sx={{ marginLeft: 1 }} />
          </Button>
        </IconButton>
      </Box>


    </Box>
  )
}