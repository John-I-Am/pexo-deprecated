/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { Input, Label, Error } from "../../../sharedStyles";
import { apiSlice, useCreateUserMutation } from "../../api/apiSlice";

import {
  Container, Header, Form,
} from "./styles";

type FormValues = {
  email: string,
  name: string,
  surname: string,
  password: string,
  confirmPassword: string,
};

const SignupForm = (): ReactElement => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const [createUser, { isSuccess, isLoading }] = useCreateUserMutation();
  const [trigger, {
    data: token,
    isSuccess: isSuccessAuth,
  }] = apiSlice.endpoints.authenticateUser.useLazyQuery();

  const handleSignup = async (formData: any): Promise<void> => {
    await createUser(formData);
    if (!isSuccess && isLoading) {
      setError("email", {
        type: "manual",
        message: "Email unavilable",
      });
    } else {
      trigger(formData);
    }
  };

  if (isSuccessAuth && !isLoading) {
    window.localStorage.setItem("currentUser", JSON.stringify(token));
    navigate("/main/learn");
    showNotification({
      title: "Welcome back",
      message: "Successfully logged in",
    });
  }

  return (
    <Container>
      <Header>
        <h1>Create Account</h1>
        <p>
          Already registered? Log in
          {" "}
          <Link to="/login">here </Link>
        </p>
      </Header>

      <Form aria-label="form" onSubmit={handleSubmit(handleSignup)}>
        <span>
          <div>
            <Label htmlFor="name">
              First Name
              <Input
                placeholder="Name"
                {...register("name", {
                  required: "required",
                  pattern: {
                    value: /^[a-zA-Z]{1,15}$/i,
                    message: "invalid name / length exceeded",
                  },
                })}
              />
            </Label>

            <Error role="alert">{errors.name && errors.name.message }</Error>
          </div>

          <div>
            <Label htmlFor="surname">
              Surname
              <Input
                placeholder="Surname"
                {...register("surname", {
                  required: "required",
                  pattern: {
                    value: /^[a-zA-Z]{1,15}$/i,
                    message: "invalid surname / length exceeded",
                  },
                })}
              />
            </Label>

            <Error role="alert">{errors.surname && errors.surname.message}</Error>
          </div>
        </span>

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

          <Error role="alert">{errors.email && errors.email.message}</Error>
        </div>

        <div>
          <Label htmlFor="password">
            Password
            <Input
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "required",
                minLength: {
                  value: 8,
                  message: "minimum of 8 characters",
                },
              })}
            />
          </Label>

          <Error role="alert">{errors.password && errors.password.message}</Error>
        </div>

        <div>
          <Label htmlFor="confirm-password">
            Confirm Password
            <Input
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword", {
                required: "required",
                minLength: {
                  value: 8 || "testing",
                  message: "minimum of 8 characters",
                },
                validate: {
                  value: (value: any) => value === getValues("password") || "password does not match",
                },
              })}
            />
          </Label>

          <Error role="alert">{errors.confirmPassword && errors.confirmPassword.message}</Error>
        </div>

        <Button type="submit">Sign up</Button>
      </Form>
    </Container>
  );
};

export default SignupForm;
