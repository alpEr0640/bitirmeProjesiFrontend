import React, { useContext, useEffect, useState } from "react";
import MainContext from "../MainContext";
import { PieChart, Pie, Sector, Cell, Tooltip } from "recharts";
import "../Css/electionDetails.css";
import moment from "moment";

function ElectionDetails() {
  const { elections, selectedVoters, setSelectedVoters, selectedElectionData } =
    useContext(MainContext);
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format("MMMM Do YYYY, h:mm:ss a");
  const [winner, setWinner] = useState("");
  const [isTie, setIsTie] = useState("");

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    if (selectedVoters.length > 0) {
      console.log("Formatted Date: ", formattedDate);
      console.log("Election Init Date: ", selectedElectionData[0].endDate);

      const electionInitDate = new Date(selectedElectionData[0].endDate);

      if (electionInitDate < currentDate) {
        console.log("Election is ongoing or past.");
        const winningCandidate = selectedVoters.reduce((prev, current) =>
          prev.vote > current.vote ? prev : current
        );

        const isTie = selectedVoters.every(
          (voter) => voter.vote === winningCandidate.vote
        );

        if (!isTie) {
          setWinner(
            `${capitalizeFirstLetter(
              winningCandidate.candidateId.name
            )} ${capitalizeFirstLetter(winningCandidate.candidateId.surname)}`
          );
        } else {
          setWinner("Seçim Sonuçlanmadı");
        }
      }
      else {
      setWinner("")
      }
    } else {
      setWinner("");
    }
    console.log(winner);
  }, [selectedVoters, selectedElectionData, currentDate, formattedDate]);

  const handleCloseDetail = () => {
    setSelectedVoters([]);
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {capitalizeFirstLetter(selectedVoters[index].candidateId.name) + " "}
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };


  return (
    <>
      <div className="electionDetailsContainer">
        <PieChart width={500} height={500} className="pieChart">
          <Pie
            margin={1000}
            width={1000}
            height={1000}
            data={selectedVoters}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            radius={600}
            outerRadius={250}
            fill="#8884d8"
            dataKey="vote"
          >
            {selectedVoters.map((candidate, index) => (
              <Cell
                key={`cell-${index}`}
                fill={candidate.candidateColor}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} votes`, "Votes"]} />
        </PieChart>
      </div>
      {winner && (
        <div className="winner">
          <span className="spanWinner">Seçimi Kazanan:</span> {winner}
        </div>
      )}
      {selectedVoters.length > 0 && (
        <i
          onClick={handleCloseDetail}
          className="fa-sharp fa-solid fa-xmark closeDetails"
        ></i>
      )}
    </>
  );
}

export default ElectionDetails;
