import React, { useState } from "react";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";
import Card from "./components/card/card";

export default function App() {
  const [images, setImages] = useState(generateImageSources(3));
  const [moves, setMoves] = useState(0);

  const restart = (count) => {
    setMoves(0);
    if (count) setImages(generateImageSources(count));
    else setImages(generateImageSources(3));
  };

  const onTurned = (imageId, imgSrc) => {
    let _images = [...images];
    // [start] turn the image
    let selectedImage = _images.filter((image) => image.id === imageId)[0];
    if (selectedImage.matched) return;
    selectedImage.turned = !selectedImage.turned;
    setImages(_images);
    // [end] turn the image

    let turnedImages = _images.filter((x) => x.turned && !x.matched);
    if (turnedImages.length === 2) {
      let matched = turnedImages[0].url === turnedImages[1].url;

      if (matched) {
        turnedImages.forEach((x) => (x.matched = true));
      } else {
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
      setMoves(moves + 1);
    }
  };
  return (
    <div className="App">
      <h1>#Memory</h1>
      <div>Moves = {moves}.</div>
      <button onClick={() => restart(3)}>3 images</button>
      <button onClick={() => restart(5)}>5 images</button>
      <button onClick={() => restart(7)}>7 images</button>
      <button onClick={() => restart()}>Restart</button>
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

  function generateImageSources(imageCount) {
    let imgSrcs = [];
    for (let i = 0; i < imageCount; i++) {
      let v = uuidv4();
      const url = "https://loremflickr.com/200/200?v=" + v;
      imgSrcs.push({
        id: uuidv4(),
        url: url,
        turned: false,
        matched: false
      });
      imgSrcs.push({
        id: uuidv4(),
        url: url,
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
    return imgSrcs;
  }
}
