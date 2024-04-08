import React, { useContext, useEffect } from "react";
import "../../Css/Navbar.css";
import logo from "../Asstest/Logo.png";
import { NavLink } from "react-router-dom";
import MainContext from "../../MainContext";
export default function Navbar() {
  
  const { isLoggedIn } = useContext(MainContext);
  

  console.log(isLoggedIn);
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <ul className="nav-manu">
        {isLoggedIn ? (
          <>
            <NavLink className={"navItem"} to="/">
              {" "}
              <i class="fa-solid fa-house"></i>
              Anasayfa
            </NavLink>
            <NavLink className={"navItem"}>
              <i class="fa-solid fa-check-to-slot"></i>
              Oy Kullan
            </NavLink>
            <NavLink className={"navItem"} to="/signup">
              {" "}
              <i className="fa-solid fa-user"></i>
              Çıkış Yap
            </NavLink>
            <NavLink className={"navItem"} to="/signup">
              {" "}
              <i className="fa-solid fa-user"></i>
              Profil
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className={"navItem"} to="/">
              {" "}
              <i class="fa-solid fa-house"></i>
              Anasayfa
            </NavLink>

            <NavLink className={"navItem"}>
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
