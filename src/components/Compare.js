import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext.js";
import Noteitem from "./Noteitem.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Compare = () => {
  const context = useContext(noteContext);
  const { notes } = context;
  console.log(notes);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
console.log(navigate)
  const handleCompare = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/notes/compare?start=${start}&end=${end}`
      );

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
      <h2>Get Bus Details</h2>
      <div className="mb-3">
        <label htmlFor="start" className="form-label">
          Starting Position
        </label>
        <input
          type="text"
          className="form-control"
          id="start"
          name="start"
          placeholder="Enter Starting position"
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
          placeholder="Enter Destination position"
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
        Get Bus
      </button>
      {loading && <p>Loading...</p>}
      {searchResult.length === 0 && !loading && (
        <p>No bus details found for the given criteria.</p>
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
