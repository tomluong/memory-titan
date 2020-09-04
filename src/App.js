import React, { useState, useEffect } from "react";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";

import Card from "./components/card/card";

export default function App() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    generateImageSources();
  }, []);

  const onTurned = (imgId, imgSrc) => {
    console.log(`id: ${imgId}; source: ${imgSrc}`);

    let newImages = [...images];
    let image = newImages.filter((x) => x.id === imgId)[0];
    if (image.matched) return;
    image.turned = !image.turned;

    setImages(newImages);

    let turnedImages = newImages.filter((x) => x.turned && !x.matched);
    console.log(turnedImages);

    if (turnedImages.length === 2) {
      console.log("validate them");
      let matched = turnedImages[0].url === turnedImages[1].url;

      if (matched) {
        console.log("matched. do something");
        turnedImages.forEach((x) => (x.matched = true));
      } else {
        console.log("not matched. flip them back");
        setTimeout(() => {
          let clean = [...images];
          for (let i = 0; i < clean.length; i++) {
            if (clean[i].matched) {
              // ignore
            } else {
              clean[i].turned = false;
            }
          }
          setImages(clean);
        }, 1000);
      }
    }
  };
  return (
    <div className="App">
      <h1>Memory Titan</h1>
      <div className="cards">
        {images.map((x, index) => (
          <Card
            key={x.id}
            imgId={x.id}
            imgSrc={x.url}
            turned={x.turned}
            onTurned={onTurned}
          />
        ))}
      </div>
    </div>
  );

  function generateImageSources() {
    let imgSrcs = [];
    const imageCount = 2;
    for (let i = 0; i < imageCount; i++) {
      imgSrcs.push({
        id: uuidv4(),
        url: "https://loremflickr.com/200/200?v=" + i,
        turned: false,
        matched: false
      });
      imgSrcs.push({
        id: uuidv4(),
        url: "https://loremflickr.com/200/200?v=" + i,
        turned: false,
        matched: false
      });
    }

    for (let i = imgSrcs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = imgSrcs[i];
      imgSrcs[i] = imgSrcs[j];
      imgSrcs[j] = temp;
    }
    setImages(imgSrcs);
  }
}
