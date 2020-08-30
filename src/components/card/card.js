import React from "react";
import "./card.css";

export default function Card({ imgId, imgSrc, onTurned, turned }) {
  const toggle = () => {
    onTurned(imgId, imgSrc);
  };
  return (
    <div className={`flip-card ${turned ? "turned" : ""}`} onClick={toggle}>
      <div className="flip-card-inner">
        <div className="flip-card-front"></div>
        <div className="flip-card-back">
          <img src={imgSrc} alt="random pic" width="200" height="200" />
        </div>
      </div>
    </div>
  );
}
