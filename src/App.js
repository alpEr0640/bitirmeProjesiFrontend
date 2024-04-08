import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContext from "./MainContext";

import Navbar from "./Components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import Homepage from "./Pages/Homepage";
import "./Css/background.css";
import LoginPage from "./Pages/LoginPage";
import Admin from "./adminPage/Admin";
import Signup from "./Pages/Signup";
function App() {
  const [isAdminPage, setAdminPage] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const logdata = window.localStorage.getItem("loggedIn");
    if (logdata !== null) setLoggedIn(JSON.parse(logdata));
  }, []);
  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(isLoggedIn));
    console.log("islooged: ", isLoggedIn)
  }, [isLoggedIn]);

 
  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

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
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />}/>
            <Route path="/admin/" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </MainContext.Provider>
    </div>
  );
}

export default App;
