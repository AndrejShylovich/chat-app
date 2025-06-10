import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/Navbar/NavBar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const {user} = useContext(AuthContext)
  return (
    <ChatContextProvider user = {user}>
      <Container className="text-secondary">
      <NavBar/>

      <Routes>
        <Route path="/" element={user ? <Chat /> : <Login/>}></Route>
        <Route path="/login" element={user ? <Chat /> : <Login />}></Route>
        <Route path="/register" element={user ? <Chat /> : <Register />}></Route>
        <Route path="/*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Container>
    </ChatContextProvider>   
  );
}

export default App;
