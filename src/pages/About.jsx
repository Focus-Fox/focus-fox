import './About.css'
import React from "react";

import TeamMembers from "../components/TeamMembers.jsx";

import AjImage from "../assets/aj.png";
import ArcieImage from "../assets/arciee.jpg";
import Bakari from "../assets/bakari.jpeg";
import Caden from "../assets/caden.jpeg"; 
import luna from "../assets/luna.jpeg";
import Phil from "../assets/phil.jpg";
import KatImage from "../assets/kat.jpg";
import Phoenix from "../assets/pheonix.jpg";

const membersCard = [
  {
    name: "Aj",
    role: " Front-End Developer",
    description:
      "Aj is a passionate developer specializing in front-end technologies and user experience.",
    image: AjImage,
  },
  {
    name: "Arcie",
    role: " Front-End Developer",
    description:
      "Arcie is a passionate developer specializing in front-end technologies and user experience.",
    image: ArcieImage,
  },
  {
    name: "Bakari",
    role: "Backend Developer",
    description:
      "Bakari is a backend expert focusing on building scalable APIs and server-side logic",
    image: Bakari,
  },
  {
    name: "Caden",
    role: "Web Developer",
    description:
      "Caden focused on developing the website that was presented for presentation",
    image: Caden,
  },
  {
    name: "Lex",
    role: "Backend Developer",
    description:
      "Lex is a backend expert focusing on building scalable APIs and server-side logic.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Luna",
    role: "UX/UI Designer",
    description:
      "Luna designs intuitive interfaces and is dedicated to creating the best user experiences..",
    image: luna,
  },
  {
    name: "kat",
    role: "Designer",
    description:
      "Kat designs intuitive interfaces and is dedicated to creating the best user experiences..",
    image: KatImage,
  },
  {
    name: "Pheonix",
    role: "Product Manager",
    description:
      "Pheonix is a seasoned project manager with over 1 year of experience in the tech industry..",
    image: Phoenix,
  },
  {
    name: "Phil",
    role: "Backend Developer",
    description:
      "Phil is a backend expert focusing on building scalable APIs and server-side logic.",
    image: Phil,
  },
];
const About = () => {
  return (
    <div className="about-team">
      <h1>Meet Our Team</h1>
      <div className="member-list">
        {membersCard.map((member, index) => (
          <TeamMembers
            key={index}
            name={member.name}
            role={member.role}
            description={member.description}
            image={member.image}
          />
        ))}
      </div>
    </div>
  );
};

export default About;