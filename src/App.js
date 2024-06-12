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
import CreateElection from "./Pages/CreateElection";
import ElectionResults from "./Pages/ElectionResults";

function App() {
  const [isAdminPage, setAdminPage] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [candidate, setCandidate] = useState([]);
  const [elections, setElections] = useState([]);
  const [selectedElectionData, setSelectedElectionData] = useState([]);
  const [selectedVoters, setSelectedVoters] = useState([]);
  const [lastCandidate, setLastCandidate] = useState([]); //bu state responseyi tutmak için oluşturuldu
  const [temp, setTemp] = useState([]); //bu state adayların idlerini tutacak olan dizi
  const [adayEkleCheck, setAdayEkleCheck] = useState(false);
  const [color, setColor] = useState("#fff");
  useEffect(() => {
    const loggedInStatus = window.localStorage.getItem("isLoggedIn") === "true";
    setLoggedIn(loggedInStatus);
    window.localStorage.getItem("jwtPrivateKey");
  }, []);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("jwtPrivateKey", JSON.stringify(token));
    }
  }, [token]);

  const data = {
    color,
    setColor,
    adayEkleCheck,
    setAdayEkleCheck,
    setTemp,
    lastCandidate,
    setLastCandidate,
    elections,
    selectedElectionData,
    setSelectedElectionData,
    selectedVoters,
    setSelectedVoters,
    setElections,
    setAdminPage,
    isLoggedIn,
    setLoggedIn,
    token,
    setToken,
    candidate,
    setCandidate,
  };

  return (
    <div style={{ backgroundColor: "#F2E3DB" }}>
      <MainContext.Provider value={data}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/" element={<Admin />} />
            <Route path="/secim-olustur" element={<CreateElection />} />
            <Route path="/secim-sonucları" element={<ElectionResults />} />
          </Routes>
        </BrowserRouter>
      </MainContext.Provider>
    </div>
  );
}

export default App;
