import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/auth/signup_steps/sign-up-form";
import Layout from "../components/layout/layout";
// import Container from "../components/ui/container";
import { ROOT_PATH } from "../router/router-path";
import { Box } from "@mui/material";
import ImageContainer from "../components/images/image_container";
import { StyledTextHeader } from "../components/text/text-styled";
export default function SignUp() {
  const navigate = useNavigate();

  function goBack() {
    navigate(ROOT_PATH);
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <ImageContainer height='25%'/>
        <StyledTextHeader sx={{verticalAlign:'middle'}}>Sign Up</StyledTextHeader>
      </Box>
      <SignUpForm />
    </Box>
  );
}

SignUp.Layout = Layout;