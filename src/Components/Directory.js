import React, { useEffect, useState } from "react";
import "../Css/directory.css";
import axios from "axios";
import { localbasebackendurl } from "../Constants";
export default function Directory() {
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(1);

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${localbasebackendurl}api/directory`);
        setImages(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTodos();
  }, []);

  const indexOfLastItem = currentPage * 1;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = images.slice(indexOfFirstItem, indexOfLastItem);;

  const renderData = (data) => {
    return (
      <div className="image">
        {data.map((item, index) => {
          return (
            <div key={index} className="photos">
              <img src={`${item.picturePath}`} />
            </div>
          );
        })}
      </div>
    );
  };

  const handleNextbtn = () => {
    if(currentPage != images.length)
    setcurrentPage(currentPage + 1);    
  };

  const handlePrevbtn = () => {
    if (currentPage != 1) setcurrentPage(currentPage - 1);
  };

  return (
    <div className="directoryContainer">
      <div className="directory">
        <div className="directoryTitle">Rehber</div>
        <div className="directoryBody">
          <div
            className={`directoryBody ${
              currentPage === 1 ? "disable" : ""
            } back`}
            onClick={handlePrevbtn}
          >
            <i className="fa-solid fa-backward-step"></i>
          </div>
          {renderData(currentItems)}
          <div
            className={`directoryBody ${
              currentPage === 1 ? "disable" : ""
            } next`}
            onClick={handleNextbtn}
          >
            <i className="fa-solid fa-forward-step"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
