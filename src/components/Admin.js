
import React from 'react';
import Notes from './Notes.js';


const Home = (props) => {
    const {showAlter}=props;
    return (
        <div> 
            {/* <h1>This is admin Page</h1> */}
            <Notes showAlter={showAlter} />
        </div>
    )
}

export default Home