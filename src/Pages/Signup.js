import React, { useState } from "react";
import { localbasebackendurl } from "../Constants";
import axios from "axios";
import "../Css/signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [kimlikNo, setKimlikNo] = useState();
  const [password, setPassword] = useState();
  const [telNo, setTelNo] = useState();
  const [dogumTrh, setDogumTrh] = useState();

  const navigation = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      name: name,
      surname: surname,
      kimlikNo: kimlikNo,
      password: password,
      telNo: telNo,
      dogumTrh: dogumTrh,
    };
    try {
      const res = await axios.post(
        `${localbasebackendurl}api/signup/create`,
        payload
      );
      navigation("/");
    } catch (err) {
      alert(err.response.data);
      console.log(err);
    }
  };
  return (
    <div className="signupContainer">
      <div className="signup">
        <div className="signupTitle">Kayıt Ol</div>
        <div className="signupBody">
          <input
            className="signupInputs"
            autocomplete="off"
            onChange={(e) => setName(e.target.value)}
            id="name"
            value={name}
            placeholder="Ad"
          ></input>
          <input
            autocomplete="off"
            className="signupInputs"
            onChange={(e) => setSurname(e.target.value)}
            id="surname"
            value={surname}
            placeholder="Soyad"
          ></input>
          <input
            autocomplete="off"
            className="signupInputs"
            onChange={(e) => setKimlikNo(e.target.value)}
            id="kimlikNo"
            value={kimlikNo}
            placeholder="Tc Kimlik Numarası"
          ></input>
          <input
            autocomplete="off"
            className="signupInputs"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            value={password}
            placeholder="şifte"
            type="password"
          ></input>
          <div className="double">
            <input
              className="doubleInput"
              autocomplete="off"
              onChange={(e) => setDogumTrh(e.target.value)}
              id="dogumTrh"
              value={dogumTrh}
              type="date"
            ></input>
            <input
              className="doubleInput"
              autocomplete="off"
              onChange={(e) => setTelNo(e.target.value)}
              id="telNo"
              value={telNo}
              type="number"
              placeholder="şifte"
            ></input>
          </div>
          <button onClick={(e) => submit(e)} className="signupButton">
            Giriş Yap
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
