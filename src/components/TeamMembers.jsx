import React from "react";

import "./TeamMembers.css";

const TeamMembers = ({ name, role, description, image }) => {
  console.log(image, "image");
  return (
  
      <div className="team-member-card">
      <img
        src={image}
        alt={`${name}'s profile`}
        className="team-member-image"
      />
       <h3 className="team-member-name">{name}</h3>
      <div className="overlay">
     
      <h4 className="role">{role}</h4>
      <p className=" text description">{description}</p>
      </div>
      
     
    </div>
    
  );
};

export default TeamMembers;
