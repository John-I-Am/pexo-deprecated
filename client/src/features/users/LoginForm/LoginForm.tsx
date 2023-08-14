/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { Input, Label, Error } from "../../../sharedStyles";
import { Container, Header, Form } from "./styles";
import { apiSlice } from "../../api/apiSlice";

type FormValues = {
  email: string,
  password: string,
};

const LoginForm = (): ReactElement => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const [trigger,
    {
      data: token,
      isSuccess,
      isLoading,
    }] = apiSlice.endpoints.authenticateUser.useLazyQuery();

  const handleLogin = async (data: any): Promise<void> => {
    await trigger(data);
  };

  useEffect(() => {
    if (isSuccess) {
      window.localStorage.setItem("currentUser", JSON.stringify(token));
      navigate("/main/learn");
      showNotification({
        title: "Welcome back",
        message: "Successfully logged in",
      });
    } else if (!isSuccess && isLoading) {
      setError("password", {
        type: "manual",
        message: "Incorrect Login",
      });
    }
  }, [isLoading]);

  return (
    <Container>
      <Header>
        <Title order={1} c="black">Log In</Title>
        <p>
          Not yet a learner? Start your journey
          {" "}
          <Link to="/signup">here </Link>
        </p>
        <p>Forgotten password? Recover details here</p>
      </Header>

      <Error>{errors.email && errors.email.message}</Error>

      <Form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <Label htmlFor="email">
            Email Address
            <Input
              placeholder="Email"
              {...register("email", {
                required: "required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
          </Label>

          <Error>{errors.email && errors.email.message}</Error>
        </div>
        <div>
          <Label htmlFor="password">
            Password
            <Input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "required",
              })}
            />
          </Label>
          <Error>{errors.password && errors.password.message}</Error>
        </div>
        <Button id="login-button" type="submit" loading={isLoading}>Login</Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
