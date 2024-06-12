import React, { useContext } from "react";
import CreateElectionCandidate from "../Components/CreateElectionCandidate";
import ElectionProperty from "../Components/ElectionProperty";
import "../Css/CreateElection.css";
import Candidate from "../Components/Candidate";
function CreateElection() {
  return (
    <div className="CreateElectionContainer">
      <CreateElectionCandidate />
      <ElectionProperty />
      <Candidate />
    </div>
  );
}

export default CreateElection;
