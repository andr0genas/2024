import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/api";

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 48px 16px;
`;

const Title = styled.h3`
  font-size: 24px;
  text-align: center;
  font-weight: 700;
  color: #333;
  font-family: 'Roboto', sans-serif;
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
  color: #444;
  font-family: 'Roboto', sans-serif;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  max-width: 400px;
  &::placeholder {
    color: #bbbbbb;
    font-size: 1rem;
  }
  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  margin-top: 10px;
  background-color: #007BFF;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  max-width: 400px;
  font-weight: 600;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const ErrorMessage = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
  color: #FF0000;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

const EditPaslauga = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    category: "",
    duration: "",
    price: 0,
  });

  useEffect(() => {
    const fetchPaslauga = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/paslaugos/${id}`);
        const PaslaugaData = response.data[0];
        setFormData({
          title: PaslaugaData.title || "",
          image: PaslaugaData.image || "",
          category: PaslaugaData.category || "",
          duration: PaslaugaData.duration || "",
          price: PaslaugaData.price || 0,
        });
      } catch (error) {
        console.error("Error fetching tour:", error);
      }
    };

    fetchPaslauga();
  }, [id, loading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: formData,
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await axios.patch(`${BASE_URL}/paslaugos/update/${id}`, {
        title: data.title,
        image: data.image,
        category: data.category,
        duration: data.duration,
        price: data.price,
      });

      navigate("/paslaugos");
    } catch (error) {
      console.error("Error updating tour:", error);
      setError("api", {
        message: "Error updating paslauga: " + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Edit Paslauga</Title>
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
            name="image"
            {...register("image", {
              required: "Image URL is required.",
            })}
          />
          {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
        </FormField>
        <FormField>
          <Label>Type</Label>
          <Input
            type="text"
            name="category"
            {...register("category")}
          />
        </FormField>
        <FormField>
          <Label>Duration</Label>
          <Input
            type="text"
            name="duration"
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
            type="number"
            name="price"
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
            <SyncLoader size={8} color={"#007BFF"} />
          </LoadingContainer>
        ) : (
          <Button type="submit" disabled={loading}>
            Update
          </Button>
        )}
      </StyledForm>
    </Container>
  );
};

export default EditPaslauga;
