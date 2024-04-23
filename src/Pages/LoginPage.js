import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../Css/login.css";
import { localbasebackendurl } from "../Constants";
import { useNavigate } from "react-router-dom";
import MainContext from "../MainContext";
import { ToastContainer, toast } from "react-toastify";
function LoginPage() {
  const [kimlikNo, setKimlikNo] = useState();
  const [password, setPassword] = useState();
  const navigation = useNavigate();

  const { setAdminPage, setLoggedIn, setToken, isLoggedIn } =
    useContext(MainContext);

 
  const submit =async (e) => {
    e.preventDefault();
    const payload = {
      kimlikNo: kimlikNo,
      password: password,
    };
    
    try {
      const res = await axios.post(`${localbasebackendurl}api/signup/auth`, payload);
      if (res?.data?.isAdmin == true) {
        setAdminPage(true);
        setToken(res.data.token);
         setLoggedIn(true);
        navigation("/");
        window.localStorage.setItem("isLoggedIn", true);
        console.log("deneme", res.data.token);
      } else {
        window.localStorage.setItem("isLoggedIn", true);
        setToken(res.data.token);
         setLoggedIn(true);
        console.log("deneme", res.data.token)
        navigation("/");
       }
    } catch (err) {
      alert("yanlış şifre veya kimlik numarası");
      setKimlikNo("");
      setPassword("");
      
    }
    
      console.log(localStorage)
  };

  return (
    <div className="loginContainer">
      <div className="login">
        <div className="loginTitle">Giriş Yap</div>
        <div className="loginBody">
          <input
            autocomplete="off"
            className="loginInputs"
            onChange={(e) => setKimlikNo(e.target.value)}
            id="kimlikNo"
            value={kimlikNo}
            placeholder="Tc Kimlik Numarası"
          ></input>
          <input
            autocomplete="off"
            className="loginInputs"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            value={password}
            placeholder="şifte"
            type="password"
          ></input>
          <button onClick={(e) => submit(e)} className="loginButton">
            Giriş Yap
          </button>
          <div className="toRegister">
            {" "}
            Hesabınız Yok mu? <span> Hesap Oluştur</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
