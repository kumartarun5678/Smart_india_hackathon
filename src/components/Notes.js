import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext.js";
import Noteitem from "./Noteitem.js";
import AddNote from "./AddNote.js";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [showBusesSection, setShowBusesSection] = useState(true);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    estart: "",
    eend: "",
    etitle: "",
    edescription: "",
    etag: "",
  });



  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    const { _id, StatingPosition, endingPosition, busName, busNumber, tag } =
      currentNote;
    setNote({
      id: _id,
      estart: StatingPosition || "",
      eend: endingPosition || "",
      etitle: busName || "",
      edescription: busNumber,
      etag: tag || "",
    });
  };

  const handleClick = (e) => {
    editNote(
      note.id,
      note.estart,
      note.eend,
      note.etitle,
      note.edescription,
      note.etag
    );
    refClose.current.click();
    // props.showAlert("Update successfully", "success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleBusesSection = () => {
    setShowBusesSection(!showBusesSection);
  };

  return (
    <>
      <div
        class="btn-group my-2"
        role="group"
        aria-label="Button group with nested dropdown"
      >
        <div
          class="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button
            type="button"
            className="btn btn-success mx-1 my-1"
            onClick={toggleForm}
          >
            {showForm ? "Hide" : "Add Bus"}
          </button>
          <button
            type="button"
            className="btn btn-primary mx-1 my-1"
            onClick={toggleBusesSection}
          >
            {showBusesSection ? "Hide Buses" : "Show Buses"}
          </button>
        </div>
      </div>
      {showForm && <AddNote showAlert={props.showAlert} />}

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Bus
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="estart" className="form-label">
                    Starting Position
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="estart"
                    name="estart"
                    value={note.estart}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eend" className="form-label">
                    Destination
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="eend"
                    value={note.eend}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Bus Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Bus Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    cng/electric
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length <= 1 || note.edescription.length <= 1
                }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Bus Details
              </button>
            </div>
          </div>
        </div>
      </div>
      {showBusesSection && (
        <div className="row my-3">
          <h2>Your Buses</h2>
          <div className="container mx-2">
            {notes.length === 0 && "No buses to display"}
          </div>
          {notes.map((note) => {
            return (
              <Noteitem key={note._id} updateNote={updateNote} note={note} />
            );
          })}
        </div>
      )}

      
    </>
  );
};

export default Notes;
