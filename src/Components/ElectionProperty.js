import React, { useContext, useEffect, useState } from "react";
import "../Css/ElectionPrp.css";
import axios from "axios";
import { localbasebackendurl } from "../Constants";
import { useNavigate } from "react-router-dom";
import MainContext from "../MainContext";
import { jwtDecode } from "jwt-decode";

export default function ElectionProperty() {
  const navigate = useNavigate();
  const [elcTypes, setElcTypes] = useState([]);
  const [initDate, setInitDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [electionTitle, setElectionTitle] = useState("");
  const [electionExplanation, setElectionExplanation] = useState("");
  const [electionType, setElectionType] = useState("");
  const [isAdminCheck, setIsAdminCheck] = useState(false);
  const [postWinCondition, setPostWinCondition] = useState("");
  const [winCondition, setWinCondition] = useState([]);
  const [voterList, setVoterList] = useState([]);
  const [spcElcType, setSpcElcType] = useState([]);
  const [electionId, setElectionId] = useState("");
  const [lastVoters, setLastVoters] = useState([]);
  const {
    candidate,
    setCandidate,
    token,
    adayEkleCheck,
    lastCandidate,
    setLastCandidate,
  } = useContext(MainContext);

  useEffect(() => {
    const userToken = window.localStorage.getItem("jwtPrivateKey");
    if (userToken) {
      const userIsAdmin = jwtDecode(userToken);
      setIsAdminCheck(userIsAdmin._isAdmin);
    }
  }, []);

  useEffect(() => {
    const fetchElcs = async () => {
      try {
        const response = await axios.get(
          `${localbasebackendurl}api/electiontypes`
        );
        setElcTypes(response.data);
      } catch (err) {
        console.log("error fetch election types api:", err);
      }
    };
    fetchElcs();
  }, [token]);

    useEffect(() => {
      const fetchSpecialElectionType = async () => {
        try {
          const response = await axios.get(
            `${localbasebackendurl}api/specialelectiontype`
          );
          setSpcElcType(response.data);
        } catch (err) {
          console.log("error fetch election types api:", err);
        }
      };
      fetchSpecialElectionType();
    }, [isAdminCheck===false]);

  useEffect(() => {
    const fetchWinConditions = async () => {
      try {
        const response = await axios.get(
          `${localbasebackendurl}api/specialelection`
        );
        setWinCondition(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchWinConditions();
  }, [token]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        try {
          const jsonContent = JSON.parse(fileContent);
          if (Array.isArray(jsonContent)) {
            const formattedVoterList = jsonContent.map((voter) => ({
              ...voter,
              kimlikNo: String(voter.kimlikNo),
            }));
            setVoterList(formattedVoterList);
          } else {
            console.error("JSON format is incorrect, should be an array.");
          }
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const electionSubmit = async (e) => {
    e.preventDefault();

    const electionPayload = {
      electionTitle: electionTitle,
      electionExplanation: electionExplanation,
      initDate: initDate,
      endDate: endDate,
      electionType: electionType,
      candidates: lastCandidate,
      winCondition: postWinCondition,
    };

    try {
      if (adayEkleCheck) {
        const postResponse = await axios.post(
          `${localbasebackendurl}api/elections`,
          electionPayload
        );
        const electionId = postResponse.data._id;
        setElectionId(electionId);

        const voterIds = [];
        for (const voter of voterList) {
          const voterPayload = {
            kimlikNo: voter.kimlikNo,
          };

          try {
            const voterPostRequest = await axios.post(
              `${localbasebackendurl}api/voterlist`,
              {
                ...voterPayload,
                electionId,
              }
            );
            voterIds.push(voterPostRequest.data._id);
          } catch (error) {
            console.error(
              `Seçmen eklenirken hata oluştu: ${voter.kimlikNo}`,
              error
            );
          }
        }

        try {
          await axios.put(`${localbasebackendurl}api/elections/${electionId}`, {
            voter: voterIds,
          });
          console.log("elections tablosu güncellendi");
        } catch (error) {
          console.error("Elections tablosu güncellenirken hata oluştu:", error);
        }
        navigate("/");
      } else {
        alert("Seçime aday eklemediniz");
        throw new Error("Seçime aday eklemediniz");
      }
    } catch (e) {
      console.log(e);
    }
    setLastCandidate([]);
  };

  const renderSpecialElection = () => {
    return (
      <>
        <option> --Seçim Türü--</option>
        {spcElcType.map((type, index) => (
          <option key={index} value={type._id}>
            {type.electionType}
          </option>
        ))}
      </>
    );
  }

  const renderData = () => {
    return (
      <>
        <option> --Seçim Türü--</option>
        {elcTypes.map((type, index) => (
          <option key={index} value={type._id}>
            {type.electionType}
          </option>
        ))}
      </>
    );
  };

  const renderWinConditions = () => {
    return (
      <>
        <option>--Seçim Kazanma Şartı</option>
        {winCondition.map((type, index) => (
          <option key={index} value={type._id}>
            {type.winCondition}
          </option>
        ))}
      </>
    );
  };

  return (
    <div className="ElectionPrpContainer">
      <div className="elcProperty">
        <div className="elcPropertyTitle">Seçim Özellikleri</div>
        <div className="elcPropertyBody">
          <div className="electionType">
            {isAdminCheck ? (
              <div>
                {" "}
                <span>Secim Türü:</span>
                <select
                  className="electionSelect"
                  name="electionTypes"
                  id="electionTypes"
                  onChange={(e) => setElectionType(e.target.value)}
                >
                  {renderData()}
                </select>
              </div>
            ) : (
              <div>
                {" "}
                <span>Secim Türü:</span>
                <select
                  className="electionSelect"
                  name="electionTypes"
                  id="electionTypes"
                  onChange={(e) => setElectionType(e.target.value)}
                >
                  {renderSpecialElection()}
                </select>
              </div>
            )}

            <div>
              {" "}
              <span>Seçim Başlığı:</span>
              <input
                className="electionTitle"
                onChange={(e) => setElectionTitle(e.target.value)}
              ></input>{" "}
            </div>
            <div>
              {" "}
              <span>Seçim Açıklaması:</span>
              <input
                className="electionExplanation"
                onChange={(e) => setElectionExplanation(e.target.value)}
              ></input>{" "}
            </div>
            <div>
              Seçim Başlangıç Zamanı:
              <input
                type="datetime-local"
                className="initDate"
                onChange={(e) => setInitDate(e.target.value)}
              />
            </div>
            <div>
              Seçim Bitiş Zamanı:
              <input
                type="datetime-local"
                className="endDate"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <span>Kazanma Koşulu:</span>
              <select
                className="winCondition"
                id="winCondition"
                onChange={(e) => setPostWinCondition(e.target.value)}
              >
                {renderWinConditions()}
              </select>
            </div>
            <div>
              <input type="file" accept=".json" onChange={handleFileUpload} />
            </div>
            <button className="createElection" onClick={electionSubmit}>
              {" "}
              Seçim Oluştur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
