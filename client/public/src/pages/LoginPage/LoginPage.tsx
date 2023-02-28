import { ReactElement } from "react";
import LoginForm from "../../features/users/LoginForm/LoginForm";
import { Container } from "./styles";

const LoginPage = (): ReactElement => (
  <Container>
    <LoginForm />
  </Container>

);

export default LoginPage;
