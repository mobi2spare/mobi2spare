import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import mobi2spareLogo from '../../assets/logo1.png';
import {
  AdharGenerateInputType,
  AdharVerifyInputType,
  SignUpInputType,
  useGenerateAdharMutation,
  useSignUpMutation,
  useVerifyAdhaarMutation,
} from '../../../helper/apis/auth/use-signup';
import { SIGN_IN } from '../../../router/router-path';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { SignUpButton } from '../sign-up-button';
import StepOneSignUpForm from './step-one-form';
import StepTwoSignUpForm from './step-two-form';
import StepThreeSignUpForm from './step-three-form';
import StepFourSignUpForm from './step-four-form';
import { toast } from 'react-toastify';
import { setAadharNumber, setClientId, setOtp, setUserPassword } from '../../../store/actions';
import { ROLES } from '../../../constants/constants';

const SignUpForm: React.FC = () => {
  const { mutateAsync: signUp, isLoading, isSuccess } = useSignUpMutation();
  const { mutateAsync: registerAdhar, isLoading: isLoadingAdhaarOTP, isSuccess: isSuccessAdharOtpGenerated } = useGenerateAdharMutation();
  const { mutateAsync: verifyAdharOtp, isLoading: isVerifyingAdhaarOTP, isSuccess: isSuccessAdharOtpVerified } = useVerifyAdhaarMutation();

  const methods = useForm();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitButtonDisabled, setisSubmitButtonDisabled] = useState(false);
  const userInfo = useSelector((store: any) => store.user);


  const isStepOneValid = ()=>{

    return userInfo.fullName.length > 0 && userInfo.password.length > 0 && userInfo.organizationName.length > 0 && userInfo.phoneNumber.length > 0;
        
  }

  const isStepTwoValid = ()=>{
    console.log(userInfo.address);
    return userInfo.address.length > 0
  }
  const handleNext = async () => {
    const isValid = (currentStep === 1 && isStepOneValid()) || (currentStep === 2 && isStepTwoValid());
    if(isValid){
      setCurrentStep(currentStep + 1);
    }
    else{
      toast.error('Please fill all fields');
    }
    
  };

  const handleBack = () => {
    if(currentStep >=1 ){
      setCurrentStep(currentStep - 1);
    }
    
  };


  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOneSignUpForm />;
      case 2:
        return <StepTwoSignUpForm />;
      case 3:
        return <StepThreeSignUpForm />
      case 4:
        return <StepFourSignUpForm />
      default:
        return <div>Form completed!</div>;
    }
  };
  const navigate = useNavigate();
  const {
    register: registerSignUp,
    handleSubmit,
    formState: { errors: errorsSignUp },
  } = useForm<SignUpInputType>();

  function handleSignIn() {
    navigate(SIGN_IN);
  }

  const {
    register: registerAdharOtpGenerate,
    handleSubmit: handleOtpSend,
  } = useForm<AdharGenerateInputType>();

  const {
    register: registerAdharOtpVerify,
    handleSubmit: handleOtpVerify,
  } = useForm<AdharVerifyInputType>();
  const dispatch = useDispatch();

  async function onGenerateOtp() {

    if (!userInfo.adharNumber || userInfo.adharNumber === '') {
      toast.error('Please enter a valid adhar number');
      return;
    }
    try {
      const status = await registerAdhar(userInfo.adharNumber);
      if (status.data.status_code === 200) {
        toast.success('OTP Sent successfully');
        dispatch(setAadharNumber(""));
        dispatch(setClientId(status.data.data.client_id));
        setCurrentStep(currentStep + 1);
      }


    } catch (error) {
      toast.error('Failed to send otp');
    }

  }

  async function onVerifyOtp() {
    if (!userInfo.otp && userInfo.otp.toString().length < 6) {
      toast.error('Please enter a valid otp');
      return;
    }
    const adharOtpInfo: AdharVerifyInputType = {
      otp: userInfo.otp,
      client_id: userInfo.clientid
    }
    try {
      const result = await verifyAdharOtp(adharOtpInfo);
      if (result.data.status_code === 200) {
        dispatch(setClientId(""));
        dispatch(setOtp(""));
        toast.success('OTP Verified Successfully');
        const signUpInfo: SignUpInputType = {
          fullName: userInfo.fullName,
          password: userInfo.password,
          organizationName: userInfo.organizationName,
          phoneNumber: userInfo.phoneNumber,
          address: userInfo.address,
          role: ROLES.GeneralUser

        }
        await signUp(signUpInfo);
        dispatch(setUserPassword(""));
        toast.success('Registered User Successfully');

      }

    } catch (error) {
      toast.error('Failed to verify otp.Please try again');

    }

  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={currentStep === 3 ? handleOtpSend(onGenerateOtp) : handleOtpVerify(onVerifyOtp)} style={{ display: 'grid', placeItems: 'center', justifyContent: 'space-between' }}>
        {renderStep()}

        {currentStep > 1 && currentStep < 4 && <SignUpButton to="" onClick={handleBack}>Back</SignUpButton>}
        {currentStep < 3 && <SignUpButton to="" onClick={handleNext}>Next</SignUpButton>}
        {currentStep >= 3 && <SignUpButton type='submit' disabled={isSubmitButtonDisabled} loading={isLoading} loadingIndicator={<CircularProgress color='primary' />} loadingPosition="end" to="" sx={{ color: 'text.secondary', backgroundColor: 'text.primary', marginTop: '1rem', alignSelf: 'center', marginBottom: '1rem' }}>Verify</SignUpButton>}


        {/* {errors.global && <span className="error">{errors.global.message}</span>} */}
      </form>
    </FormProvider>



  );
};

export default SignUpForm;
