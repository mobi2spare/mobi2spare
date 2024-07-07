import { useForm } from "react-hook-form";
import mobi2spareLogo from "../../assets/logo1.png";
import {
  LoginInputType,
  useLoginMutation,
} from "../../helper/apis/auth/use-login";
import Logo from "../ui/logo";
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { useNavigate } from "react-router-dom";
import { REGISTER } from "../../router/router-path";
import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
import UserIcon from "../icons/user-icon";
import LockIcon from '@mui/icons-material/Lock';
import { LoginButton } from "./login-button";
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { StyledTextInput } from "../text/text-styled";

const LoginForm: React.FC = () => {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  const label = { inputProps: { 'aria-label': 'Remember me' } };

  function onSubmit({ phoneNumber, password }: LoginInputType) {
    login({
      phoneNumber,
      password,
    });
  }

  function handleSignUp() {
    navigate(REGISTER);
  }

  return (


    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

      <StyledTextInput {...register('phoneNumber', { required: true })} error={!!errors.phoneNumber} InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <UserIcon />
          </InputAdornment>
        ),
      }} id='phoneNumber' variant="outlined" name='phoneNumber' placeholder='Enter your phone number' ></StyledTextInput>

      {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber.message || 'Phone number is required'}</p>}  {/* Provide a default error message */}

      <StyledTextInput {...register('password',{required:true})}  InputProps={{
        color: 'primary',
        startAdornment: (
          <InputAdornment position="start" >
            <LockIcon />
          </InputAdornment>


        ),
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
      }} id='password' variant="outlined" name='password' type={showPassword ? "text" : "password"} sx={{marginTop:'1rem'}} placeholder='Enter your password'></StyledTextInput>
      {errors.password && <p style={{ color: 'red' }}>{errors.password.message || 'A valid password is required'}</p>}  {/* Provide a default error message */}

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',marginTop:'1rem' }}>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked sx={{color:'text.primary'}}/>} label="Remember me" sx={{color:'text.primary'}}></FormControlLabel>
        </FormGroup>
        <Button sx={{color:'text.primary'}}> Forgot Password?</Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
        <LoginButton loading={isLoading}loadingIndicator={<CircularProgress color='primary' />} loadingPosition="end" disabled={isLoading}
          to="" type="submit">Login</LoginButton>
        <FingerprintIcon sx={{ marginTop: '1rem',color:'#EB4634',height:'50px',width:'50px' }} />
        <Typography sx={{ textDecoration: 'underline', fontSize: '1rem', marginTop: '1rem',color:'text.primary' }}>Login with biometrics</Typography>
      </Box>

    </form>
   
  );
};

export default LoginForm;
