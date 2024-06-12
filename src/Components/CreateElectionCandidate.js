import React, { useContext, useState } from "react";
import "../Css/CreateElcPrp.css";
import MainContext from "../MainContext";
import axios from "axios";
import { localbasebackendurl } from "../Constants";
import CandidateModal from "./CandidateModal";

function CreateElectionCandidate() {
  const {
    candidate,
    setCandidate,
    color,
    temp,
    setTemp,
    lastCandidate,
    setLastCandidate,
    adayEkleCheck,
    setAdayEkleCheck,
  } = useContext(MainContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [array, setArray] = useState([]);

  const handleDelete = (kimlikNo) => {
    const updatedCandidates = candidate.filter(
      (cand) => cand.kimlikNo !== kimlikNo
    );
    setCandidate(updatedCandidates);
  };

  const handleSet = async () => {
    const candidateIds = candidate.map((element) => element._id);
    setArray(candidateIds);
    if (!adayEkleCheck) {
      try {
        const responses = [];

        for (let element of candidate) {
          console.log(candidate);
          const payload = {
            candidateId: element._id,
            aboutCandidate: element.about,
            candidateColor: element.choosenColor,
          };
          const response = await axios.post(
            `${localbasebackendurl}api/candidate`,
            payload
          );
          responses.push(response.data);
        }

        setLastCandidate(responses);
        console.log("array: ", candidateIds);
        console.log("last candidate: ", responses);
      } catch (e) {
        console.log(e);
      }
    }
    else {
    alert("Aday Ekleme İşlemini Tamamladınız");
    }
    
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const confirmAddCandidates = () => {
    handleSet();
    closeModal();
    setAdayEkleCheck(true);
  setCandidate([]);
  };

  return (
    <div className="CreateElectionCndContainer">
      <div className="elcCandidates">
        <div className="elcCandidatesTitle">Adaylar</div>
        <div className="elcCandidatesBody">
          {candidate && candidate.length ? (
            <>
              {candidate.map((type, index) => (
                <div className="candidates" key={index}>
                  <div className="candidatesLeft">
                    <i className="fa-solid fa-user" />
                  </div>
                  <div className="candidatesMid">
                    {type.name + " " + type.surname}
                  </div>
                  <div
                    className="candidatesRight"
                    onClick={() => handleDelete(type.kimlikNo)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </div>
              ))}
              <button className="createCandidate" onClick={openModal}>
                Adayları Ekle
              </button>
            </>
          ) : null}
        </div>
      </div>
      <CandidateModal
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        confirmAddCandidates={confirmAddCandidates}
      />
    </div>
  );
}

export default CreateElectionCandidate;
