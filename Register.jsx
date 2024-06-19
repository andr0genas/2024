
import { useState } from "react";
import { styled } from "styled-components";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/api";

const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  max-width: 400px;
  padding: 48px 16px;
`;

const FormTitle = styled.p`
  font-size: 24px;
  text-align: center;
  font-weight: 600;
  padding-bottom: 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 535px;
  width: 100%;
`;

const FormField = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 16px;
`;

const Label = styled.label`
  height: 24px;
  margin-bottom: 7px;
  font-size: 16px;
`;

const Input = styled.input`
  height: 40px;
  padding: 5px;
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 4px;
  outline: none;
  color: #333333;
  font-size: 16px;

  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #f0f0f0;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  max-width: 400px;
  font-weight: 600;
  font-size: 0.9rem;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  &:hover {
    background-color: #2a4b42;
  }
`;

const FormForSignIn = styled.p`
  display: flex;
  max-width: 535px;
  width: 100%;
  font-size: 16px;
  justify-content: center;
  margin-top: 15px;
  align-items: center;
  gap: 10px;
`;

const ErrorMessage = styled.p`
  color: #990000;
  line-height: 20px;
  font-size: 13px;
`;

const SignLink = styled(Link)`
  color: #666666;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const MessagesContainer = styled.div`
  margin-top: 24px;
`;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.repeatPassword) {
      setError("repeatPassword", {
        type: "manual",
        message: "Passwords do not match. Rewrite password.",
      });
      return;
    }

    try {
      await registerUser(data);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("email", {
          type: "manual",
          message: error.response.data.errors[0].msg,
        });
      } else {
        setServerError("Something went wrong. Please try again later");
      }
    }
  };

  return (
    <RegistrationContainer>
      <FormTitle>Create an account</FormTitle>
      <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Label htmlFor="username">Username</Label>
          <Input
            defaultValue=""
            {...register("username", {
              required: true,
              minLength: 6,
              maxLength: 32,
            })}
          />
          {errors.username && (
            <ErrorMessage>
              Username is required and must be between 6 and 32 characters
            </ErrorMessage>
          )}
        </FormField>

        <FormField>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            required
            defaultValue=""
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            defaultValue=""
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 128,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~#^_+=\-';,./|":<>?])[A-Za-z\d@$!%*?&~#^_+=\-';,./|":<>?]{8,128}$/,
            })}
          />
          {errors.password && (
            <ErrorMessage>
              Password must contain at least one uppercase letter, one lowercase
              letter, one number, and one special character
            </ErrorMessage>
          )}
        </FormField>

        <FormField>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            defaultValue=""
            {...register("repeatPassword", { required: true })}
          />
          {errors.repeatPassword && (
            <ErrorMessage>{errors.repeatPassword.message}</ErrorMessage>
          )}
        </FormField>

        <SubmitButton type="submit">Creacte an acount</SubmitButton>
      </Form>
      {serverError && (
        <MessagesContainer>
          <ErrorMessage>{serverError}</ErrorMessage>
        </MessagesContainer>
      )}
      <FormForSignIn>
        Do you already have an account?{" "}
        <SignLink to="/sign-in">Sign in</SignLink>
      </FormForSignIn>
    </RegistrationContainer>
  );
};

export default Register;
