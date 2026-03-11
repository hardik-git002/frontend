import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inventory from "./pages/Inventory";
import Posts from "./pages/Posts";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <BrowserRouter>
      <Navbar onLogout={handleLogout} token={token} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inventory" element={token ? <Inventory /> : <Navigate to="/login" />} />
        <Route path="/posts" element={token ? <Posts /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;