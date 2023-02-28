import { ReactElement } from "react";
import SignupForm from "../../features/users/SignupForm/SignupForm";
import { Container } from "./styles";

const SignupPage = (): ReactElement => (
  <Container>
    <SignupForm />
  </Container>

);

export default SignupPage;
