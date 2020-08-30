import React from "react";
import "./styles.css";

import Card from "./components/card/card";

export default function App() {
  let turnedCard = "";
  let imgSrcs = [];
  const [completedCard, setCompleteCard] = React.useState({});
  const imageCount = 5;
  for (let i = 0; i < imageCount; i++) {
    imgSrcs.push("https://loremflickr.com/200/200?v=" + i);
    imgSrcs.push("https://loremflickr.com/200/200?v=" + i);
  }
  for (let i = imgSrcs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = imgSrcs[i];
    imgSrcs[i] = imgSrcs[j];
    imgSrcs[j] = temp;
  }

  const validate = (id) => {
    console.log("validate card: " + id);

    if (turnedCard === "") {
      turnedCard = id;
    } else {
      if (turnedCard === id) {
        console.log("matched");
        let temp = {};
        temp[id] = true;
        setCompleteCard(Object.assign(temp, completedCard));
      } else {
        console.log("not matched");
      }
    }
  };
  return (
    <div className="App">
      <h1>Memory Titan</h1>
      <div className="cards">
        {imgSrcs.map((x, index) => (
          <Card
            key={x + index}
            imgSrc={x}
            onTurned={validate}
            inactive={completedCard[x]}
          />
        ))}
      </div>
    </div>
  );
}
