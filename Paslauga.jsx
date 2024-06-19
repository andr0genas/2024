import { useEffect, useState } from "react";
import { styled } from "styled-components";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/api";

const Container = styled.div`
  text-align: center;
  padding: 48px 16px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PaslaugosSection = styled.section`
  padding: 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const PaslaugosList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PaslaugaCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 300px;
  margin: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const PaslaugaImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PaslaugaInfo = styled.div`
  padding: 20px;
`;

const PaslaugaTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const PaslaugaDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #f0f0f0;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  &:hover {
    background-color: #2a4b42;
    color: #fff;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const Paslauga = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paslauga, setPaslauga] = useState(null);

  useEffect(() => {
    const fetchPaslauga = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/paslaugas/${id}`);
        setPaslauga(response.data);
      } catch (error) {
        console.error("Error fetching paslauga:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaslauga();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/paslaugas/${id}`);
      navigate("/paslaugas");
    } catch (error) {
      console.error("Error deleting paslauga:", error);
    }
  };

  return (
    <Container>
      <PaslaugosSection>
        <PaslaugosList>
          {loading ? (
            <LoadingContainer>
              <SyncLoader color={"#f0f0f0"} loading={true} size={20} />
            </LoadingContainer>
          ) : (
            paslauga && (
              <>
                <SectionTitle>Title: {paslauga.title}</SectionTitle>
                <PaslaugaCard key={id}>
                  <PaslaugaImage src={paslauga.image} alt={paslauga.title} />
                  <PaslaugaInfo>
                    <PaslaugaTitle>{paslauga.price} EUR</PaslaugaTitle>
                    <PaslaugaDescription>{paslauga.duration}</PaslaugaDescription>
                  </PaslaugaInfo>
                  <Button onClick={handleDelete}>Delete</Button>
                  <Button onClick={() => navigate(`/edit-paslauga/${id}`)}>
                    Edit
                  </Button>
                </PaslaugaCard>
              </>
            )
          )}
        </PaslaugosList>
      </PaslaugosSection>
    </Container>
  );
};

export default Paslauga;
