import { Navigate, useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/login-form";
// import Layout from "../components/layout/layout";
import Container from "../components/ui/container";
import { ROOT_PATH, USERHOME } from "../router/router-path";
import { Box, Typography } from "@mui/material";
import ImageContainer from "../components/images/image_container";
import { StyledTextHeader } from "../components/text/text-styled";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth/auth.context";

export default function Login() {
  const navigate = useNavigate();
  const { authenticated } = useContext(AuthContext);

  function goBack() {
    navigate(ROOT_PATH);
  }

   if (authenticated){
    return <Navigate to={USERHOME} replace />
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
