import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext.js";

// Starting position of AddNote component
const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({start:"",end:"", title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.start,note.end,note.title, note.description, note.tag);
    setNote({start:"",end:"", title: "", description: "", tag: "" });
    // this.props.showAlert("Added successfully","success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="con">
      <h2>Add a Bus</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Starting Position
          </label>
          <input
            type="text"
            className="form-control"
            id="start"
            name="start"
            aria-describedby="emailHelp"
            value={note.start}
            onChange={onChange}
            required
            placeholder="Enter Your Starting Position"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Destination
          </label>
          <input
            type="text"
            className="form-control"
            id="end"
            name="end"
            aria-describedby="emailHelp"
            value={note.end}
            onChange={onChange}
            required
            placeholder="Enter Your Destination Position"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Bus Name
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title}
            onChange={onChange}
            placeholder="Enter Your Bus Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="number" className="form-label">
            Bus Number
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            placeholder="Enter Your Bus Number"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Choose an option:
          </label>
          <select
            className="form-select"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          >
            <option value="CNG">CNG</option>
            <option value="ELECTRIC">ELECTRIC</option>
          </select>
        </div>

        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Bus
        </button>
      </form>
    </div>
  );
};
// Ending position of AddNote component

export default AddNote;
