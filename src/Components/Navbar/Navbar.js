import React, { useContext, useEffect } from "react";
import "../../Css/Navbar.css";
import logo from "../Asstest/Logo.png";
import { NavLink, Navigate } from "react-router-dom";
import MainContext from "../../MainContext";
import { useNavigate } from "react-router-dom";
import { homepageurl } from "../../Constants/index.js";

export default function Navbar() {
    const navigation = useNavigate();
  const { isLoggedIn, setLoggedIn } = useContext(MainContext);
  const IsLoggin = window.localStorage.getItem(isLoggedIn)
  const handleLogOut = () => {
    setLoggedIn(false);
    window.localStorage.setItem("isLoggedIn", false)
    window.localStorage.setItem("jwtPrivateKey", "");
  };
  
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <ul className="nav-manu">
        {isLoggedIn || IsLoggin ? (
          <>
            <NavLink className={"navItem"} to="/">
              {" "}
              <i class="fa-solid fa-house"></i>
              Anasayfa
            </NavLink>
            <NavLink className={"navItem"}>
              <i class="fa-solid fa-check-to-slot"></i>
              Seçim Sonuçları
            </NavLink>
            <NavLink className={"navItem"} to="/secim-olustur">
              {" "}
              <i className="fa-solid fa-plus"></i>
              Seçim Oluştur
            </NavLink>
            <NavLink className={"navItem"} to="/" onClick={handleLogOut}>
              {" "}
              <i className="fa-solid fa-user"></i>
              Çıkış Yap
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className={"navItem"} to="/">
              {" "}
              <i class="fa-solid fa-house"></i>
              Anasayfa
            </NavLink>

            <NavLink className={"navItem"} to="/signup">
              {" "}
              <i class="fa-solid fa-right-to-bracket"></i>
              Kayıt ol
            </NavLink>

            <NavLink className={"navItem"} to="/login">
              {" "}
              <i class="fa-solid fa-right-to-bracket"></i>
              Giriş Yap
            </NavLink>
          </>
        )}
      </ul>
    </div>
  );
}
