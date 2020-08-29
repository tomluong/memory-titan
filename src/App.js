import React from "react";
import "./styles.css";

import Card from "./components/card/card";

export default function App() {
  let imgSrcs = [];
  for (let i = 0; i < 5; i++) {
    imgSrcs.push("https://loremflickr.com/200/200?v=" + i);
    imgSrcs.push("https://loremflickr.com/200/200?v=" + i);
  }
  for (let i = imgSrcs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = imgSrcs[i];
    imgSrcs[i] = imgSrcs[j];
    imgSrcs[j] = temp;
  }
  return (
    <div className="App">
      <h1>Memory Titan</h1>
      <div className="cards">
        {imgSrcs.map((x) => (
          <Card imgSrc={x} />
        ))}
      </div>
    </div>
  );
}
