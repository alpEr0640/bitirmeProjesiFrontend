import React, { useEffect, useState } from "react";
import "../Css/Announcements.css";
import axios from "axios";
import { localbasebackendurl } from "../Constants";
export default function Announcements() {
const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  /////////////////////////////////////////////////
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${localbasebackendurl}api/announcement`);
        setTodos(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTodos();
  }, []);
  /////////////////////////////////////////////////////////
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(1);

  const [pageNumberLimit, setpageNumberLimit] = useState(1);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
    if (Number(event.target.id) <= 3) {
      setminPageNumberLimit(0);
      setmaxPageNumberLimit(5);
    }
    if (
      Number(event.target.id) > 3 &&
      Number(event.target.id) <= todos.length - 2
    ) {
      setminPageNumberLimit(Number(event.target.id) - 3);
      setmaxPageNumberLimit(Number(event.target.id) + 2);
    }
    if (Number(event.target.id) > todos.length - 2) {
      setmaxPageNumberLimit(todos.length);
      setminPageNumberLimit(todos.length - 5);
    }
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(todos.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const indexOfLastItem = currentPage * 1;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = todos.slice(indexOfFirstItem, indexOfLastItem);

  const renderData = (data) => {
    return (
      <div className="entries">
        {data.map((item, index) => {
          return (
            <div className="SpecialAnnouncement" key={index}>
              <div className="announcementsTitle">{item.announcementTitle}
              </div>
              <div className="announcementsBody">{item.announcementBody}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage >= 3 && currentPage < 7) {
      setcurrentPage(currentPage + 1);
      setmaxPageNumberLimit(maxPageNumberLimit + 1);
      setminPageNumberLimit(minPageNumberLimit + 1);
    }
    if (currentPage > 7 && currentPage != todos.length) {
      setmaxPageNumberLimit(todos.length);
      setminPageNumberLimit(todos.length - 5);
    }
    if (currentPage === todos.length) {
      setcurrentPage(currentPage);
    }
  };

  const handlePrevbtn = () => {
    if (currentPage != 1) setcurrentPage(currentPage - 1);

    if (currentPage > 4 && currentPage <= todos.length - 2) {
      setmaxPageNumberLimit(maxPageNumberLimit - 1);
      setminPageNumberLimit(minPageNumberLimit - 1);
    }
    if (currentPage <= 4) {
      setmaxPageNumberLimit(5);
      setminPageNumberLimit(0);
    }
  };
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "deneme" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  return (
    <div className="container">
      <div className="announcements">
        <div className="title">DUYURULAR</div>
        {renderData(currentItems)}
        <div className="pagination">
          <div className="paginationBody">
            <ul className="paginationItem">
              <li
                className={currentPage === 1 ? "disable" : null}
                onClick={handlePrevbtn}
              >
                <i className="fa-solid fa-backward-step"></i>
              </li>
              {renderPageNumbers}
              <li
                className={currentPage === todos.length ? "disable" : null}
                onClick={handleNextbtn}
              >
                <i className="fa-solid fa-forward-step"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}