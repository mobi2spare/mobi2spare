import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import mobi2spareLogo from '../../assets/logo1.png';
import {
  SignUpInputType,
  useSignUpMutation,
} from '../../helper/apis/auth/use-signup';
import { SIGN_IN } from '../../router/router-path';
import Logo from '../ui/logo';
import PasswordInput from '../ui/password-input';
import { ROLES } from '../../constants/constants';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { SignUpButton } from './sign-up-button';

const SignUpForm: React.FC = () => {
  const { mutate: signUp, isLoading, isSuccess } = useSignUpMutation();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputType>();

  function handleSignIn() {
    navigate(SIGN_IN);
  }

  function onSubmit({
    phoneNumber,
    password,
    fullName,
    organizationName,
    address,
    dateOfEstablishment,
    aadharNumber,
    role
  }: SignUpInputType) {
    signUp({
      phoneNumber,
      password,
      fullName,
      organizationName,
      address,
      dateOfEstablishment,
      aadharNumber,
      role

    });

    if (!isLoading && isSuccess) {
      navigate(SIGN_IN);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

      <TextField id='fullName' variant="outlined" placeholder='Enter your full name' sx={{ marginTop: '1rem' }} {...register('fullName', { required: true })} error={!!errors.fullName} inputProps={{
        style: {
          padding: '0.5rem 1rem'
        }
      }}></TextField>
      <TextField id='organizationName' {...register('organizationName', { required: true })} variant="outlined" name='organizationName' placeholder='Enter your organization name' sx={{ marginTop: '1rem' }} error={!!errors.organizationName} inputProps={{
        style: {
          padding: '0.5rem 1rem'
        }
      }}></TextField>
      <TextField   {...register('dateOfEstablishment', { required: true })} id='dateOfEstablishment' variant="outlined" name='dateOfEstablishment' type='date' error={!!errors.dateOfEstablishment} placeholder='Enter your date of establishment' sx={{ marginTop: '1rem' }} required inputProps={{
        style: {
          padding: '0.5rem 1rem'
        }
      }} ></TextField>
      <TextField id='aadharNumber' variant="outlined"  {...register('aadharNumber', { required: true })} placeholder='Enter your adhar number' sx={{ marginTop: '1rem' }} error={!!errors.aadharNumber} inputProps={{
        style: {
          padding: '0.5rem 1rem'
        }
      }} required ></TextField>
      <TextField id='phoneNumber' variant="outlined" {...register('phoneNumber', { required: true })} placeholder='Enter your mobile number' sx={{ marginTop: '1rem' }} error={!!errors.phoneNumber} inputProps={{
        style: {
          padding: '0.5rem 1rem'
        }
      }} required ></TextField>
      <TextField InputProps={{
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
      }} id='password' variant="outlined" {...register('password')}  name='password' type={showPassword ? "text" : "password"} sx={{ marginTop: '1rem' }}  placeholder='Enter your password'></TextField>
      <SignUpButton type='submit' to="" sx={{ color: 'text.secondary', backgroundColor: 'text.primary', marginTop: '1rem', width: '50%', alignSelf: 'center', marginBottom: '1rem' }}>Sign Up</SignUpButton>
    </form>
    // <div>
    //   <div className='text-center mb-6 pt-2.5'>
    //     <div className='flex justify-center'>
    //       <Logo src={mobi2spareLogo} alt={'mobi2spare'} />
    //     </div>
    //     <p className='text-sm md:text-base text-body mt-2 mb-8 sm:mb-10'>
    //       By signing up, you agree to our terms & privacy policy
    //     </p>
    //   </div>
    //   <form
    //     onSubmit={handleSubmit(onSubmit)}
    //     className='flex flex-col justify-center'
    //     noValidate
    //   >
    //     <div className='flex flex-col space-y-4'>
    //       <Input
    //         labelKey='Mobile number'
    //         type='text'
    //         variant='solid'
    //         {...register('number', {
    //           pattern: {
    //             value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
    //             message: 'Enter valid number'
    //           },
    //           required: 'Mobile number is required',
    //         })}
    //         errorKey={errors.number?.message}
    //       />
    //       <PasswordInput
    //         labelKey='Password'
    //         errorKey={errors.password?.message}
    //         {...register('password', {
    //           required: 'Password is required',
    //         })}
    //       />
    //       <Input
    //         labelKey='Full name'
    //         type='text'
    //         variant='solid'
    //         {...register('fullName', {
    //           pattern: {
    //             value: /^[a-zA-Z ]*$/,
    //             message: 'Please enter valid name'
    //           },
    //           required: 'A valid name is required',
    //         })}
    //         errorKey={errors.fullName?.message}
    //       />
    //        <Input
    //         labelKey='Adhar Number'
    //         type='text'
    //         variant='solid'
    //         {...register('aadharNumber', {
    //           required: 'A Valid Adhar Number is required',
    //         })}
    //         errorKey={errors.aadharNumber?.message}
    //       />
    //       <Input
    //         labelKey='Company name'
    //         type='text'
    //         variant='solid'
    //         {...register('companyName', {
    //           required: 'Company name is required',
    //         })}
    //         errorKey={errors.companyName?.message}
    //       />
    //        <Input
    //         labelKey='Address'
    //         type='text'
    //         variant='solid'
    //         {...register('address', {
    //           required: 'Address is required',
    //         })}
    //         errorKey={errors.address?.message}
    //       />
    //       <Input
    //         labelKey='Date of establishment'
    //         type='date'
    //         variant='solid'
    //         {...register('dateOfEstablishment', {
    //           required: 'Date of establishment is required',
    //         })}
    //         errorKey={errors.dateOfEstablishment?.message}
    //       />
    //        <Input
    //         labelKey='Role'
    //         type='text'
    //         variant='solid'
    //         disabled
    //         defaultValue='GeneralUser'
    //         {...register('role', )}
    //         errorKey={errors.role?.message}
    //       />
    //       <div className='relative'>
    //         <Button
    //           type='submit'
    //           loading={isLoading}
    //           disabled={isLoading}
    //           className='h-11 md:h-12 w-full mt-2'
    //         >
    //           Register
    //         </Button>
    //       </div>
    //     </div>
    //   </form>

    //   <div className='text-sm sm:text-base text-body text-center mt-5 mb-1'>
    //     {'Already have an account? '}
    //     <button
    //       type='button'
    //       className='text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none'
    //       onClick={handleSignIn}
    //     >
    //       {'Login'}
    //     </button>
    //   </div>
    // </div>
  );
};

export default SignUpForm;
