import React, { useContext, useEffect, useState } from "react";
import "../../Css/Navbar.css";
import logo from "../Asstest/Logo.png";
import { NavLink } from "react-router-dom";
import MainContext from "../../MainContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigation = useNavigate();
  const { isLoggedIn, setLoggedIn } = useContext(MainContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = window.localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
    const loggedInStatus = window.localStorage.getItem("isLoggedIn") === "true";
    setLoggedIn(loggedInStatus);
  }, [setLoggedIn, isLoggedIn]);

  const handleLogOut = () => {
    window.localStorage.setItem("jwtPrivateKey", "");
    window.localStorage.setItem("isLoggedIn", "false");
    window.localStorage.setItem("isAdmin", "false");
    setLoggedIn(false);
    setIsAdmin(false);
    navigation("/");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-manu">
        {isLoggedIn === true ? (
          <>
            <NavLink className={"navItem"} to="/">
              <i className="fa-solid fa-house"></i>
              Anasayfa
            </NavLink>
            <NavLink className={"navItem"} to="/secim-sonucları">
              <i className="fa-solid fa-check-to-slot"></i>
              Seçim Sonuçları
            </NavLink>
            <NavLink className={"navItem"} to="/secim-olustur">
              <i className="fa-solid fa-plus"></i>
              Seçim Oluştur
            </NavLink>
            <NavLink className={"navItem"} to="/" onClick={handleLogOut}>
              <i className="fa-solid fa-user"></i>
              Çıkış Yap
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className={"navItem"} to="/">
              <i className="fa-solid fa-house"></i>
              Anasayfa
            </NavLink>
            <NavLink className={"navItem"} to="/signup">
              <i className="fa-solid fa-right-to-bracket"></i>
              Kayıt ol
            </NavLink>
            <NavLink className={"navItem"} to="/login">
              <i className="fa-solid fa-right-to-bracket"></i>
              Giriş Yap
            </NavLink>
          </>
        )}
      </ul>
    </div>
  );
}
