import React, { useContext, useEffect, useState } from "react";
import "../Css/Elections.css";
import { localbasebackendurl } from "../Constants";
import axios from "axios";
import MainContext from "../MainContext";
const { jwtDecode } = require("jwt-decode");

function Elections() {
  const {
    elections,
    setElections,
    selectedElectionData,
    setSelectedElectionData,
    selectedVoters,
    setSelectedVoters,
  } = useContext(MainContext);

  const [userKimlikNo, setUserKimlikNo] = useState(null);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await axios.get(`${localbasebackendurl}api/elections`);
        console.log("Elections Data:", res.data);
        setElections(res.data.reverse());
      } catch (e) {
        console.log(e);
      }
    };

    const fetchUserKimlikNo = () => {
      const token = localStorage.getItem("jwtPrivateKey");
      if (token) {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        setUserKimlikNo(decodedToken._kimlikNo);
      }
    };

    fetchElections();
    fetchUserKimlikNo();
  }, [setElections]);

  const handleElectionClick = (election) => {
    setSelectedElectionData([election]);
    setSelectedVoters(election.candidates);
  };

  return (
    <div className="electionContainer">
      <div className="elections">
        <div className="electionsTitle">Seçimler</div>
        <div className="electionsBody">
          {elections && elections.length ? (
            <>
              {elections.map((type, index) => {
                return (
                  type.voter.some(
                    (voter) => voter.kimlikNo === userKimlikNo
                  ) && (
                    <div
                      className="specialElections"
                      key={index}
                      onClick={() => handleElectionClick(type)}
                    >
                      <div className="leftElections">{type.electionTitle}</div>
                      <div className="rightElections">
                        <i className="fa-solid fa-circle-arrow-right"></i>
                      </div>
                    </div>
                  )
                );
              })}
            </>
          ) : null}
        </div>  
      </div>
    </div>
  );
}

export default Elections;
