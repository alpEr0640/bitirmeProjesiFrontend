import React, { useContext, useState } from "react";
import "../Css/Candidate.css";
import axios from "axios";
import { localbasebackendurl } from "../Constants";
import MainContext from "../MainContext";
import { ChromePicker } from "react-color";

function Candidate() {
  const [showModal, setShowModal] = useState(false);
  const [checkNo, setCheckNo] = useState("");
  const { candidate, setCandidate, temp, setTemp,color,setColor } = useContext(MainContext);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [check, setCheck] = useState(Boolean);
  
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [aboutCandidate, setAboutCandidate] = useState("");

  const handleClear = () => {
    setName("");
    setSurname("");
    setCheckNo("");
  }
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowColorPicker(false);
  };

  const handleShowColorPicker = () => {
    setShowColorPicker((showColorPicker) => !showColorPicker);
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${localbasebackendurl}api/signup/${checkNo}`
      );
      if (
        response.data.name.toLowerCase() === name.toLowerCase() &&
        response.data.surname.toLowerCase() === surname.toLowerCase()
      ) {
        const exists = candidate.some((cand) => cand.kimlikNo === checkNo);
        if (exists) {
          alert("Aday zaten mevcut");
          handleCloseModal();
        } else {
          const newCandidate = {
            ...response.data,
            about: aboutCandidate,
            choosenColor: color,
          };
          setCandidate([...candidate, newCandidate]);
          console.log(candidate);
          alert("Aday eklendi");
          handleCloseModal();
          setShowColorPicker(false);
          handleClear();
        }
      } else {
        throw new Error("Bilgiler eşleşmedi");
      }
    } catch (e) {
      alert("Yanlış bilgi girdiniz");
    }
  };

  return (
    <div className="candidateContainer">
      <div className="createNewCandidate" onClick={handleShowModal}>
        <div className="text">Yeni Aday Ekle</div>
        <i className="fa-solid fa-plus"></i>
      </div>
      {showModal ? (
        <>
          <div className="cndModal">
            <div className="close">
              <div className="closeTitle">Aday Bilgileri</div>
              <i
                onClick={handleCloseModal}
                className="fa-sharp fa-solid fa-xmark"
              ></i>
            </div>
            <div className="cndModalBody">
              <span>Aday Adı:</span>
              <input
                onChange={(e) => setName(e.target.value)}
                className="CandidateId"
              ></input>
              <span>Aday Soyadı:</span>
              <input
                onChange={(e) => setSurname(e.target.value)}
                className="CandidateId"
              ></input>
              <span>Aday Kimlik Numarası:</span>
              <input
                onChange={(e) => setCheckNo(e.target.value)}
                className="CandidateId"
              ></input>
              <span>Aday Hakkında:</span>
              <input
                onChange={(e) => setAboutCandidate(e.target.value)}
                className="CandidateId"
              ></input>
              <button
                className="colorPickerButton"
                onClick={handleShowColorPicker}
              >
                {showColorPicker ? "Tamamla" : "Renk Seç"}
              </button>
              {showColorPicker && (
                <>
                  <ChromePicker
                    color={color}
                    className="customChromePicker"
                    onChange={(updatedColor) => {
                      setColor(updatedColor.hex);
                      console.log(color);
                    }}
                  />
                </>
              )}
              <div className="submit">
                <button className="checkButton" onClick={fetchUser}>
                  Aday Ekle
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Candidate;
