import mobi2spareLogo from '../../assets/logo1.png';
import {
  useSignUpMutation,
} from '../../../helper/apis/auth/use-signup';
import Logo from '../../ui/logo';
import PasswordInput from '../../ui/password-input';
import { ROLES } from '../../../constants/constants';
import { Box, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { SignUpButton } from '../sign-up-button';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setOrgName, setPhoneNumber, setUserName, setUserPassword } from '../../../store/actions';
import { StyledTextInput } from '../../text/text-styled';

const StepOneSignUpForm: React.FC = () => {
  const { mutate: signUp, isLoading, isSuccess } = useSignUpMutation();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const { register, formState: { errors } } = useFormContext();

  const dispatch = useDispatch();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserName(event.target.value)); 
  };

  const handleOrgNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setOrgName(event.target.value)); 
  };

  const handleMobileNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPhoneNumber(event.target.value)); 
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserPassword(event.target.value)); 
  };

  
  return (
    // <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
      <StyledTextInput {...register('fullName', { required:true,onChange: (event) => handleNameChange(event) })} inputProps={{
        style: {
          padding: '0.5rem 1rem'
        }
      }} id='fullName' variant="outlined" placeholder='Full name'  error={!!errors.fullName} ></StyledTextInput>
      {/* {errors.fullName && <p className="error-message">{errors.fullName.message}</p>} */}

      <StyledTextInput {...register('organizationName', {required:true, onChange: (event) => handleOrgNameChange(event) })} id='organizationName'  variant="outlined" name='organizationName' placeholder='Organization name' error={!!errors.organizationName} inputProps={{
        style: {
          padding: '0.5rem 1rem'
        }
      }}></StyledTextInput>
    
      {/* <TextField id='aadharNumber' variant="outlined"  {...register('aadharNumber', { required: true })} placeholder='Enter your adhar number' sx={{ marginTop: '1rem' }} error={!!errors.aadharNumber} inputProps={{
        style: {
          padding: '0.5rem 1rem'
        }
      }} required ></TextField> */}
      <StyledTextInput {...register('phoneNumber', { required:true,onChange: (event) => handleMobileNumberChange(event) })} id='phoneNumber' variant="outlined"  placeholder='Mobile Number' error={!!errors.phoneNumber} inputProps={{
        style: {
          padding: '0.5rem 1rem'
        }
      }} required ></StyledTextInput>
      <StyledTextInput {...register('password', { required:true,onChange: (event) => handlePasswordChange(event) })} InputProps={{
        color: 'primary',
        endAdornment: (
          <InputAdornment position="end" >
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>

        )
      }} inputProps={{
        style: {
          padding: '0.5rem 1rem'
        }
      }} id='password' variant="outlined"   name='password' type={showPassword ? "text" : "password"}  placeholder='Password'></StyledTextInput>
      {/* <SignUpButton loading={isLoading}loadingIndicator={<CircularProgress color='primary' />} loadingPosition="end"  to="" sx={{ color: 'text.secondary', backgroundColor: 'text.primary', marginTop: '1rem', width: '50%', alignSelf: 'center', marginBottom: '1rem' }}>Sign Up</SignUpButton> */}
      </Box>
    
  );
};

export default StepOneSignUpForm;
