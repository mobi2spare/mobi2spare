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
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
import UserIcon from "../icons/user-icon";
import LockIcon from '@mui/icons-material/Lock';
import { LoginButton } from "./login-button";
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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

    // <FormControl>
    //     <InputLabel htmlFor="user-phone">Mobile Number</InputLabel>
    //     <Input id="user-phone" aria-describedby="Please enter your phone number" />
    //     <InputLabel htmlFor="user-password" >Mobile Number</InputLabel>
    //     <Input id="user-password" type="password" aria-describedby="Please enter your password" />
    // </FormControl>
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

      <TextField {...register('phoneNumber', { required: true })} error={!!errors.phoneNumber} InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <UserIcon />
          </InputAdornment>
        ),
      }} id='phoneNumber' variant="outlined" name='phoneNumber' placeholder='Enter your phone number' ></TextField>
      <TextField {...register('password')}  InputProps={{
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
      }} id='password' variant="outlined" name='password' type={showPassword ? "text" : "password"} sx={{marginTop:'1rem'}} placeholder='Enter your password'></TextField>

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',marginTop:'1rem' }}>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked sx={{color:'text.primary'}}/>} label="Remember me" sx={{color:'text.primary'}}></FormControlLabel>
        </FormGroup>
        <Button sx={{color:'text.primary'}}> Forgot Password?</Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
        <LoginButton to="" type="submit">Login</LoginButton>
        <FingerprintIcon sx={{ marginTop: '1rem',color:'#EB4634',height:'50px',width:'50px' }} />
        <Typography sx={{ textDecoration: 'underline', fontSize: '1rem', marginTop: '1rem',color:'text.primary' }}>Login with biometrics</Typography>
      </Box>

    </form>
    // <div className="w-full px-5 py-5 mx-auto overflow-hidden bg-white border border-gray-300 rounded-lg sm:w-96 md:w-450px sm:px-8">
    //   <div className="text-center mb-6 pt-2.5">
    //     <div className="flex justify-center">
    //       <Logo src={mobi2spareLogo} alt={"mobi2spare"} />
    //     </div>
    //     <p className="mt-2 mb-8 text-sm md:text-base text-body sm:mb-10">
    //       Login with your mobile number & password
    //     </p>
    //   </div>
    //   <form
    //     onSubmit={handleSubmit(onSubmit)}
    //     className="flex flex-col justify-center"
    //     noValidate
    //   >
    //     <div className="flex flex-col space-y-3.5">
    //       <Input
    //         labelKey="Mobile number"
    //         type="text"
    //         variant="solid"
    //         {...register("number", {
    //           pattern: {
    //             value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
    //             message: "Enter valid number",
    //           },
    //           required: "Mobile number is required",
    //         })}
    //         errorKey={errors.number?.message}
    //       />
    //       <PasswordInput
    //         labelKey="Password"
    //         errorKey={errors.password?.message}
    //         {...register("password", {
    //           required: "Password is required",
    //         })}
    //       />

    //       <div className="relative">
    //         <Button
    //           type="submit"
    //           loading={isLoading}
    //           disabled={isLoading}
    //           className="h-11 md:h-12 w-full mt-1.5"
    //         >
    //           Login
    //         </Button>
    //       </div>
    //     </div>
    //   </form>
    //   <div className="mt-5 mb-1 text-sm text-center sm:text-base text-body">
    //     <div>
    //       {`Don't you have any account? `}
    //       <button
    //         type="button"
    //         className="text-sm font-bold underline sm:text-base text-heading hover:no-underline focus:outline-none"
    //         onClick={handleSignUp}
    //       >
    //         {"Register"}
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default LoginForm;
