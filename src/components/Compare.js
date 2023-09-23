import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext.js";
import Noteitem from "./Noteitem.js";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for making API requests

const Compare = () => {
  const context = useContext(noteContext);
  const { notes } = context;

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/home");
  //   }
  // }, [navigate]);

  const handleCompare = async () => {
    setLoading(true);
    try {
      // Send a GET request to your backend API to fetch matching notes
      const response = await axios.get(
        `http://localhost:8000/api/notes/compare?start=${start}&end=${end}`
      );
      console.log(response)

      if (response.data.length === 0) {
        setSearchResult([]);
      } else {
        setSearchResult(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="con">
      <h2>Compare Buses</h2>
      <div className="mb-3">
        <label htmlFor="start" className="form-label">
          Starting Position
        </label>
        <input
          type="text"
          className="form-control"
          id="start"
          name="start"
          placeholder="Enter Starting positon"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="end" className="form-label">
          Destination Position
        </label>
        <input
          type="text"
          className="form-control"
          id="end"
          name="end"
          placeholder="Enter Destination positon"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
        />
      </div>
      <button
        type="button"
        className="btn1"
        onClick={handleCompare}
        disabled={loading || start.trim() === "" || end.trim() === ""}
      >
        Compare Buses
      </button>
      {loading && <p>Loading...</p>}
      {searchResult.length === 0 && !loading && (
        <p></p> // Corrected the message here
      )}
      {searchResult.length > 0 && (
        <div className="row my-3">
          {searchResult.map((note) => (
            <Noteitem key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Compare;
