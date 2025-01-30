import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "./MyApp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // History sections

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((respond) => respond.json())
      .then((data) => {
        setHistory(data.reverse());
        setLoading(false);
      });
  }, []);

  // Delete section

  const deleteAll = () => {
    fetch("http://localhost:3000/", {
      method: "DELETE",
    })
      .then(() => {
        console.log("Data deleted successfully");
        setHistory([]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="mainBox">
        <div className="historyField">
          <h1>History</h1>

          {loading ? (
            <p>Loading...</p>
          ) : history.length === 0 ? (
            <p style={{ fontSize: 20 }}>No Search History</p>
          ) : (
            <div style={{ width: "100%" }}>
              <table className="historyTable">
                <thead>
                  <tr>
                    <th>City</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((data) => (
                    <tr key={data._id}>
                      <td>{data.city}</td>
                      <td>{dayjs(data.createdAt).format("DD/MM/YY")}</td>
                      <td>{dayjs(data.createdAt).format("hh:mm A")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button onClick={deleteAll} className="deleteAllBtn">
            <FontAwesomeIcon icon={faTrash} />
          </button>

        </div>
      </div>
      ;
    </>
  );
};

export default History;
