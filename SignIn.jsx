
import { useState, useContext } from "react";
import { styled } from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../utils/AuthContext";

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 48px 16px;
`;

const SignUpLink = styled.div`
  display: flex;
  max-width: 535px;
  width: 100%;
  font-size: 16px;
  justify-content: center;
  margin-top: 15px;
  align-items: center;
  gap: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 16px;
  line-height: 24px;
  color: #666666;
  text-align: justify-left;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  max-width: 400px;
  &::placeholder {
    color: #d9d9d9;
    font-size: 1rem;
  }
  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px;
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

const ErrorMessage = styled.p`
  font-size: 13px;
  color: #990000;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

const SignLink = styled(Link)`
  color: #666666;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h3`
  font-size: 24px;
  text-align: center;
  font-weight: 600;
  padding-bottom: 32px;
`;

const MessagesContainer = styled.div`
  margin-top: 24px;
  text-align: center;
`;

const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const { loginUser } = useContext(AuthContext);
  const [serverError, setServerError] = useState(null);

  const onSubmit = async (data) => {
    try {
      await loginUser(data);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.status === 401) {
        setServerError("Incorrect email or password. Please try again.");
      } else if (error.response && error.response.status === 500) {
        setServerError(
          "An error occurred on the server. Please try again later.",
        );
      } else {
        setServerError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <Container>
      <Title>Sign in</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Email address</Label>
          <Input
            type="email"
            name="login"
            autoComplete="off"
            {...register("login", { required: "Email is required" })}
          />
          {errors.login && <ErrorMessage>{errors.login.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            autoComplete="off"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </FormGroup>

        <Button type="submit">Sign in</Button>
        {serverError && (
          <MessagesContainer>
            <ErrorMessage>{serverError}</ErrorMessage>
          </MessagesContainer>
        )}
        <SignUpLink>
          Don&apos;t have an account?{" "}
          <SignLink to="/register">Sign up</SignLink>
        </SignUpLink>
      </Form>
    </Container>
  );
};

export default SignIn;
