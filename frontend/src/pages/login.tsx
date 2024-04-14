import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/login-form";
// import Layout from "../components/layout/layout";
import Container from "../components/ui/container";
import { ROOT_PATH } from "../router/router-path";
import { Box, Typography } from "@mui/material";
import ImageContainer from "../components/images/image-container";
import { StyledTextHeader } from "../components/text/text-styled";

export default function Login() {
  const navigate = useNavigate();

  function goBack() {
    navigate(ROOT_PATH);
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',minHeight:'100vh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <ImageContainer height='25%'/>
        <StyledTextHeader sx={{verticalAlign:'middle'}}>Login</StyledTextHeader>
      </Box>

        <LoginForm />
    </Box>
  );
}

// SignInPage.Layout = Layout;
