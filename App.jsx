import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { styled } from "styled-components";
import Home from "./pages/home/Home";
import Register from "./pages/user/Register";
import Paslaugos from "./pages/paslaugos/Paslaugos";
import Paslauga from "./pages/paslaugos/Paslauga";
import SukurtiPaslauga from "./pages/paslaugos/SukurtiPaslauga";
import { AuthContext } from "./utils/AuthContext";
import SignIn from "./pages/user/SignIn";
import EditPaslauga from "./pages/paslaugos/EditPaslauga";
// import Header from "./pages/components/Header";

const Content = styled.div`
  min-height: calc(100vh - 138px);
`;

function App() {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
     
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paslaugos" element={<Paslaugos />} />
          <Route path="/paslaugos/:id" element={<Paslauga />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          {isAdmin && (<Route path="/sukurti-paslauga" element={<SukurtiPaslauga />} />)}
          {isAdmin && (<Route path="/edit-paslauga/:id" element={<EditPaslauga />} />)}
        </Routes>
      </Content>
    </>
  );
}

export default App;
