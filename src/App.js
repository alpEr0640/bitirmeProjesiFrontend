import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, json } from "react-router-dom";
import MainContext from "./MainContext";

import Navbar from "./Components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import Homepage from "./Pages/Homepage";
import "./Css/background.css";
import LoginPage from "./Pages/LoginPage";
import Admin from "./adminPage/Admin";
import Signup from "./Pages/Signup";
import CreateElection from "./Pages/CreateElection";
function App() {
  const [isAdminPage, setAdminPage] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");



  useEffect(() => {
    const login=window.localStorage.getItem("isLoggedIn");
    setLoggedIn(login);
    window.localStorage.getItem("jwtPrivateKey")
  },[])


  useEffect(() => {
  if (token.length > 0) {
    window.localStorage.setItem("jwtPrivateKey", JSON.stringify(token));
  } 
  }, [token]);

;
  const data = {
    setAdminPage,
    isLoggedIn,
    setLoggedIn,
    token,
    setToken,
  };

  return (
    <div style={{ backgroundColor: "#F2E3DB" }}>
      <MainContext.Provider value={data}>
        <BrowserRouter>
          {isAdminPage ? null : <Navbar />}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/" element={<Admin />} />
            <Route path="/secim-olustur" element={<CreateElection />} />
          </Routes>
        </BrowserRouter>
      </MainContext.Provider>
    </div>
  );
}

export default App;
