import { styled } from "styled-components";
import SyncLoader from "react-spinners/SyncLoader";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
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

const PaslaugosCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 300px;
  margin: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer; 
`;

const PaslaugosImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PaslaugosInfo = styled.div`
  padding: 20px;
`;

const PaslaugosTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const PaslaugosDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

const Paslaugos = () => {
  const [paslaugos, setPaslaugos] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaslaugos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/paslaugos/`);
        setPaslaugos(response.data);
      } catch (error) {
        console.error("Error fetching paslaugos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaslaugos();
  }, [loading]);

  return (
    <Container>
      <PaslaugosSection>
        <SectionTitle>All Paslaugos</SectionTitle>
        <PaslaugosList>
          {paslaugos ? (
            paslaugos.map((paslauga) => (
              <PaslaugosCard
                key={paslauga.id}
                onClick={() => navigate(`/paslaugos/${paslauga.id}`)}
              >
                <PaslaugosImage src={paslauga.image} alt={paslauga.title} />
                <PaslaugosInfo>
                  <PaslaugosTitle>{paslauga.title}</PaslaugosTitle>
                  <PaslaugosDescription>{paslauga.description}</PaslaugosDescription>
                </PaslaugosInfo>
              </PaslaugosCard>
            ))
          ) : (
            <SyncLoader color={"#f0f0f0"} loading={loading} size={20} />
          )}
        </PaslaugosList>
      </PaslaugosSection>
    </Container>
  );
};

export default Paslaugos;
