import React from "react";
import Announcements from "../Components/Announcements";
import Directory from "../Components/Directory";
import "../Css/Homepage.css";
import { jwtDecode } from "jwt-decode";
export default function Homepage() {
  // const userToken = localStorage.getItem("token");
  // const user = jwtDecode(userToken);
  // const fullname = user.isAdmin;
  // console.log(fullname);
  return (
    <div>
      <div className="homepage-container">
        <Announcements />
        <Directory />
      </div>
    </div>
  );
}
