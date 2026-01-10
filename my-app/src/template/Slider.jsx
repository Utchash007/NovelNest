import axios from "axios";
import React, { useState, useEffect } from "react";

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [topnovels, setTopNovels] = useState([]);
  const images = [
    "/Assets/img1.jpeg",
    "/Assets/img2.jpg",
    "/Assets/img3.png",
    "/Assets/img4.jpg",
    "/Assets/img5.png"
  ];

  useEffect(()=>{
    axios
    .get("http://127.0.0.1:8000/api/novels/top/")
    .then((response)=>{
      setTopNovels(response.data)
    })
    .catch((error)=>{
      alert(error.message)
    });

  },[])




  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % topnovels.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + topnovels.length) % topnovels.length);
  };

  useEffect(() => {

    if(topnovels.length===0)return

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [topnovels]);

  return (
    <div className="slider">
      <div className="list">
        {topnovels.map((novel, index) => (
          <div
            key={novel.novel_id}
            className={`item ${activeIndex === index ? "active" : ""}`}
          >
            <img src={novel.novel_img_link} alt={`Novel ${index + 1}`} />
            <div className="content">
              <p>Trending</p>
              <h2>{novel.novel_name}</h2>
              <p>
                {novel.intro}
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
      {topnovels.map((novel, index) => (
          <div
            key={novel.novel_id}  // Use unique id as the key
            className={`item ${activeIndex === index ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            <img src={novel.novel_img_link} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
