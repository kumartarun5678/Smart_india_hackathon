import React, { useState } from 'react';
import Compare from './Compare.js'; 
import MapComponent from './MapComponent.js';
// import Footer from './Footer.js';
const About = () => {
  const [showCompare, setShowCompare] = useState(true); // Set showCompare to true by default
 console.log(setShowCompare);
  return (
    <div className='home'>
      
      {showCompare && <Compare onCompare={() => {}} />} Render Compare component conditionally
      <MapComponent/>
      {/* <Footer/> */}
    </div>
  );
};

export default About;
