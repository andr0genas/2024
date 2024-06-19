import { styled } from "styled-components";
import Paslaugos from "../paslaugos/Paslaugos";

const Container = styled.div`
  text-align: center;
  padding: 48px 16px;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
`;

const Home = () => {
  return (
    <Container>
      <HeroSection>
        <Title>Sveiki atvyke</Title>
        <Subtitle>Grožis musu rankose</Subtitle>
      </HeroSection>
      {/* <Tours /> */}
    </Container>
  );
};

export default Home;