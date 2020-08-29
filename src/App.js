import React from "react";
import "./styles.css";

import Card from "./components/card/card";

export default function App() {
  return (
    <div className="App">
      <h1>Memory Titan</h1>
      <div className="cards">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
