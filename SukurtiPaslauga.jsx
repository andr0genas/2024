import { useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/api";

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 48px 16px;
`;

const Title = styled.h3`
  font-size: 24px;
  text-align: center;
  font-weight: 600;
  padding-bottom: 32px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 16px;
  line-height: 24px;
  color: #666666;
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const TypeSelect = styled.select`
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

const ErrorMessage = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  color: #990000;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

const CreatePaslauga = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      title: "",
      image: "",
      type: "group",
      duration: "",
      price: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/paslaugas/create`, {
        title: data.title,
        image: data.image,
        category: data.category, // Adjust as needed for your backend
        duration: data.duration,
        price: data.price,
      });

      navigate("/paslaugas");
    } catch (error) {
      console.error("Error creating paslauga:", error);
      setError("api", {
        message: "Error creating paslauga: " + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Create new paslauga</Title>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            {...register("title", {
              required: "Title is required.",
              minLength: {
                value: 2,
                message: "Title must be between 2 and 50 characters long.",
              },
              maxLength: {
                value: 50,
                message: "Title must be between 2 and 50 characters long.",
              },
            })}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </FormField>
        <FormField>
          <Label>Image URL</Label>
          <Input
            type="text"
            id="image"
            {...register("image", {
              required: "Image URL is required.",
            })}
          />
          {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
        </FormField>
        <FormField>
          <Label>Type</Label>
          <TypeSelect {...register("type")}>
            <option value="group">Group</option>
            <option value="individual">Individual</option>
          </TypeSelect>
        </FormField>
        <FormField>
          <Label>Duration</Label>
          <Input
            name="duration"
            type="text"
            {...register("duration", {
              required: "Duration is required.",
            })}
          />
          {errors.duration && (
            <ErrorMessage>{errors.duration.message}</ErrorMessage>
          )}
        </FormField>
        <FormField>
          <Label>Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register("price", {
              required: "Price is required.",
              valueAsNumber: true,
              validate: {
                positive: (value) =>
                  value > 0 || "Price must be a positive number.",
              },
            })}
          />
          {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
        </FormField>

        {errors.api && <ErrorMessage>{errors.api.message}</ErrorMessage>}
        {loading ? (
          <LoadingContainer>
            <SyncLoader size={8} color={"#ffffff"} />
          </LoadingContainer>
        ) : (
          <Button type="submit" disabled={loading}>
            Create
          </Button>
        )}
      </StyledForm>
    </Container>
  );
};

export default CreatePaslauga;
