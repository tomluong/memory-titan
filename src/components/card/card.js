import React from "react";
import "./card.css";

export default function Card() {
  const [turned, setTurned] = React.useState("");
  const [imgSrc] = React.useState(
    "https://loremflickr.com/200/200?v=" + Math.random()
  );
  const toggle = () => {
    if (turned === "" || turned === "unturned") setTurned("turned");
    else {
      setTurned("unturned");
    }
  };
  return (
    <div className={`flip-card ${turned}`} onClick={toggle}>
      <div className="flip-card-inner">
        <div className="flip-card-front"></div>
        <div className="flip-card-back">
          <img src={imgSrc} alt="random pic" width="200" height="200" />
        </div>
      </div>
    </div>
  );
}
