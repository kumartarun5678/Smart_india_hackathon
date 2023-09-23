import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext.js';
import MapRedirectButton from './MapRedirectButton.js'; // Import the MapRedirectButton component

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  // Assuming that your 'note' object has properties 'title', 'description', and 'tag'
  const { title, description, tag } = note;

  return (
    <div className="bus">
      <div className="con">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{title}</h5>
            <i className="far fa-trash-alt mx-2" onClick={() => { deleteNote(note._id); }}></i>
            <i className="far fa-edit mx-2" onClick={() => { updateNote(note); }}></i>
          </div>
          
          <p className="card-text">Starting: {title}</p>
          <p className="card-text">Destination: {description}</p>
          <p className="card-text">Bus Name: {tag}</p>

          {/* Render the MapRedirectButton component with starting and destination positions */}
          <MapRedirectButton startingPosition={title} destinationPosition={description} />
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
