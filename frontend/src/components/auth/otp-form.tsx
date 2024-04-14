import { useForm } from "react-hook-form";
import mobi2spareLogo from "../../assets/logo1.png";
import Button from "../ui/button";
import Input from "../ui/input";
import Logo from "../ui/logo";
import { useNavigate } from "react-router-dom";
import { REGISTER } from "../../router/router-path";
import { OtpInputType, useOtpGenerateMutation } from "../../helper/apis/auth/use-otp";

const OtpForm: React.FC = () => {
  const navigate = useNavigate();
//   const { mutate: login, isLoading } = useLoginMutation();
  const { mutate: otpgenerate, isLoading} = useOtpGenerateMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpInputType>();

  function onSubmit() {
    otpgenerate();
  }

  function countdown(targetElementId:string) {
    const targetElement = document.getElementById(targetElementId);
    const deadline = Date.now() + 10 * 60 * 1000; // 10 minutes in milliseconds
  
    const updateTimer = function() {
      const now = Date.now();
      const remainingTime = deadline - now;
  
      // Calculate remaining time in minutes and seconds
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  
      // Format time string with leading zeros
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');
  
      // Update the target element with remaining time
      if (targetElement){
        targetElement.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
      }
      
  
      // Check if timer has expired
      if (remainingTime <= 0) {
        clearInterval(intervalId);
        if (targetElement != null){
            targetElement.innerHTML = "Otp expired";
        }
       
      }
    };
  
    const intervalId = setInterval(updateTimer, 1000); // Update timer every second
    if (targetElement != null){
        updateTimer(); // Call updateTimer initially to display initial time
    }
    
  }

  return (
    <div className="w-full px-5 py-5 mx-auto overflow-hidden bg-white border border-gray-300 rounded-lg sm:w-96 md:w-450px sm:px-8">
      <div className="text-center mb-6 pt-2.5">
        <div className="flex justify-center">
          <Logo src={mobi2spareLogo} alt={"mobi2spare"} />
        </div>
        <p className="mt-2 mb-8 text-sm md:text-base text-body sm:mb-10">
          Please check your mobile number for the otp
        </p>
        <div id="timer-element"></div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        noValidate
      >
        <div className="flex flex-col space-y-3.5">
          <Input
            labelKey="Otp"
            type="text"
            variant="solid"
            {...register("otp", {
              pattern: {
                value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                message: "Enter valid number",
              },
              required: "Otp is required",
            })}
            errorKey={errors.otp?.message}
          />
         
          
          <div className="relative flex flex-row">
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="h-11 md:h-12 w-full mt-1.5 mr-5"
            >
              Resend OTP
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="h-11 md:h-12 w-full mt-1.5"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
      
    </div>
  );
};

export default OtpForm;
