import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../Css/login.css";
import { localbasebackendurl } from "../Constants";
import { useNavigate } from "react-router-dom";
import MainContext from "../MainContext";
function LoginPage() {
  const [kimlikNo, setKimlikNo] = useState();
  const [password, setPassword] = useState();
  const navigation = useNavigate();

  const { setAdminPage, setLoggedIn, setToken } = useContext(MainContext);

 
  const submit =async (e) => {
    e.preventDefault();
    const payload = {
      kimlikNo: kimlikNo,
      password: password,
    };
    try {
      const res = await axios.post(`${localbasebackendurl}api/signup/auth`, payload);
      // localStorage.setItem('token', res?.token);
      console.log(res.data);
      if (res?.data?.isAdmin == true) {
        setAdminPage(true);
        setToken(res.data.token);
        setLoggedIn(true);
      navigation("/admin");
      } else {
        setToken(res.data.token);
        setLoggedIn(true);
        
      navigation("/");
       }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="loginContainer">
      <div className="login">
        <div className="loginTitle">Giriş Yap</div>
        <div className="loginBody">
          <input
            onChange={(e) => setKimlikNo(e.target.value)}
            id="kimlikNo"
            value={kimlikNo}
            placeholder="Tc Kimlik Numarası"
          ></input>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            value={password}
            placeholder="şifte"
            type="password"
          ></input>
          <button onClick={(e) => submit(e)} className="loginButton">
            Giriş Yap
          </button>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
