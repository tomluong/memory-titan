import React from "react";
import "./card.css";

export default function Card(props) {
  const [turned, setTurned] = React.useState("");
  const toggle = () => {
    console.log("inactive " + props.inactive);
    if (props.inactive) return;
    if (turned === "" || turned === "unturned") {
      props.onTurned(props.imgSrc);
      setTurned("turned");
    } else {
      setTurned("unturned");
    }
  };
  return (
    <div className={`flip-card ${turned}`} onClick={toggle}>
      <div className="flip-card-inner">
        <div className="flip-card-front"></div>
        <div className="flip-card-back">
          <img src={props.imgSrc} alt="random pic" width="200" height="200" />
        </div>
      </div>
    </div>
  );
}
