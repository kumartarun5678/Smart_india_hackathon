import React, { useState } from 'react';
import Compare from './Compare.js'; // Correct the import statement
import MapComponent from './MapComponent.js';
const About = () => {
  const [showCompare, setShowCompare] = useState(true); // Set showCompare to true by default

  return (
    <div className='home'>
      <h1>This is User page page</h1>
      {showCompare && <Compare onCompare={() => {}} />} Render Compare component conditionally
      <MapComponent/>
    </div>
  );
};

export default About;
