import React from 'react';

const MapRedirectButton = ({ startingPosition, destinationPosition }) => {
  const redirectToMap = () => {
    const startingPosition = encodeURIComponent("Hilsa Khaba, 13, Lalit Mitra Ln, Fariapukur, Shyam Bazar, Kolkata, West Bengal 700004");
    const destinationPosition = encodeURIComponent("Patna, Bihar");
    const coordinates = "24.0884269,85.4366766";
    
    const url = `https://www.google.com/maps/dir/${startingPosition}/${destinationPosition}/@${coordinates},8z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x3a02779d16fb21bd:0x47acd4a91f523ca1!2m2!1d88.3748016!2d22.5995804!1m5!1m1!1s0x39f29937c52d4f05:0x831a0e05f607b270!2m2!1d85.1375645!2d25.5940947!3e3?entry=ttu`;
  
    window.location.href = url;
  };

  return (
    <button onClick={redirectToMap} className="btn btn-primary">
      Show Map
    </button>
  );
};


export default MapRedirectButton;
