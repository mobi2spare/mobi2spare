import { useNavigate } from "react-router-dom";
// import Layout from "../components/layout/layout";
import Container from "../components/ui/container";
import { REGISTER } from "../router/router-path";
import OtpForm from "../components/auth/otp-form";

export default function Otp() {
  const navigate = useNavigate();

  function goBack() {
    navigate(REGISTER);
  }
  return (
    <div className="flex items-center justify-center h-screen">
      {/* <PageHeader pageHeader="Sign In" /> */}
      <Container>
        <div className="py-16 lg:py-20">
          <OtpForm />
          
        </div>
        {/* <Subscription /> */}
      </Container>
    </div>
  );
}