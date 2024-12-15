import React, { useState, useEffect } from "react";

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "/Assets/img1.jpeg",
    "/Assets/img2.jpg",
    "/Assets/img3.png",
    "/Assets/img4.jpg",
    "/Assets/img5.png"
  ];

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <div className="list">
        {images.map((image, index) => (
          <div
            key={index}
            className={`item ${activeIndex === index ? "active" : ""}`}
          >
            <img src={image} alt={`Novel ${index + 1}`} />
            <div className="content">
              <p>Trending</p>
              <h2>Novel {index + 1}</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="arrows">
        <button onClick={handlePrev}>{"<"}</button>
        <button onClick={handleNext}>{">"}</button>
      </div>

      <div className="thumbnail">
        {images.map((image, index) => (
          <div
            key={index}
            className={`item ${activeIndex === index ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
