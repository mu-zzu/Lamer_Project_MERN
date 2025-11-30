import React from "react";
import "./Hero.css";
import lamerImage from "../Assets/Lamer1.png";

const Hero = ({ onClick }) => {
  return (
    <div className="hero" onClick={onClick} style={{ cursor: "pointer" }}>
      <img src={lamerImage} alt="Lamer" style={{ width: "100%", height: "auto" }} />
    </div>
  );
};

export default Hero;
