import React, { useContext, useState } from "react";
import axios from "axios";
import "../Css/login.css";
import { localbasebackendurl } from "../Constants";
import { Navigate, useNavigate } from "react-router-dom";
import MainContext from "../MainContext";
import { ToastContainer, toast } from "react-toastify";

function LoginPage() {
  const [kimlikNo, setKimlikNo] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  const { setAdminPage, setLoggedIn, setToken } = useContext(MainContext);



  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      kimlikNo: kimlikNo,
      password: password,
    };

    try {
      const res = await axios.post(
        `${localbasebackendurl}api/signup/auth`,
        payload
      );
      console.log(res.data);
      if (res?.data?.isAdmin === true) {
        console.log("Admin doğrulandı");
        setAdminPage(true);
        setToken(res.data.token);
        window.localStorage.setItem("isAdmin", "true");
        window.localStorage.setItem("isLoggedIn", "true");
        setLoggedIn(true);
        navigation("/");
      } else {
        setToken(res.data.token);
        window.localStorage.setItem("isLoggedIn", "true");
        setLoggedIn(true);
        navigation("/");
      }
    } catch (err) {
      alert("Yanlış şifre veya kimlik numarası");
      setKimlikNo("");
      setPassword("");
    }
  };

  return (
    <div className="loginContainer">
      <div className="login">
        <div className="loginTitle">Giriş Yap</div>
        <div className="loginBody">
          <input
            autoComplete="off"
            className="loginInputs"
            onChange={(e) => setKimlikNo(e.target.value)}
            id="kimlikNo"
            value={kimlikNo}
            placeholder="Tc Kimlik Numarası"
          ></input>
          <input
            autoComplete="off"
            className="loginInputs"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            value={password}
            placeholder="Şifre"
            type="password"
          ></input>
          <button onClick={(e) => submit(e)} className="loginButton">
            Giriş Yap
          </button>
          <div className="toRegister" >
            Hesabınız Yok mu? <span >Hesap Oluştur</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
