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

  const resetUnmatchedImages = () => {
    let _images = [...images];
    for (let i = 0; i < _images.length; i++) {
      if (_images[i].matched) {
        // ignore
      } else {
        _images[i].turned = false;
      }
    }
    setImages(_images);
  };
  const turnImage = (imageId) => {
    let _images = [...images];
    let selectedImage = _images.filter((image) => image.id === imageId)[0];
    if (selectedImage.matched) return;
    selectedImage.turned = !selectedImage.turned;
    setImages(_images);
  };

  const onTurned = (imageId, imgSrc) => {
    turnImage(imageId);
    validateImages();
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

  function validateImages() {
    let _images = [...images];
    let turnedImages = _images.filter((x) => x.turned && !x.matched);
    if (turnedImages.length === 2) {
      let matched = turnedImages[0].url === turnedImages[1].url;

      if (matched) {
        turnedImages.forEach((x) => (x.matched = true));
      } else {
        setTimeout(resetUnmatchedImages, 1000);
      }
      setMoves(moves + 1);
    }
  }

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
