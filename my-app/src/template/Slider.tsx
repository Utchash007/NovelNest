import React, { useEffect, useState } from "react";
import api from "../api";
import { handleImgError } from "../utils";

interface Novel {
  novel_id?: string;
  novelId?: string;
  novel_name?: string;
  novelName?: string;
  novel_img_link?: string;
  novelImgLink?: string;
  imageLink?: string;
  intro: string;
}

const Slider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [topnovels, setTopNovels] = useState<Novel[]>([]);

  useEffect(() => {
    api
      .get("/api/novels/top")
      .then((res) => setTopNovels(res.data?.data || res.data || []))
      .catch(() => {});
  }, []);

  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % topnovels.length);
  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + topnovels.length) % topnovels.length);

  useEffect(() => {
    if (topnovels.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % topnovels.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [topnovels.length]);

  return (
    <div className="slider">
      <div className="list">
        {topnovels.map((novel, index) => {
          const id = novel.novel_id || novel.novelId;
          return (
            <div
              key={id}
              className={`item ${activeIndex === index ? "active" : ""}`}
            >
              <img
                src={novel.imageLink || novel.novelImgLink || novel.novel_img_link}
                alt={`Novel ${index + 1}`}
                data-novel-id={id}
                onError={handleImgError}
              />
              <div className="content">
                <p>Trending</p>
                <h2>{novel.novel_name || novel.novelName}</h2>
                <p>{novel.intro}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="arrows">
        <button onClick={handlePrev}>{"<"}</button>
        <button onClick={handleNext}>{">"}</button>
      </div>

      <div className="thumbnail">
        {topnovels.map((novel, index) => {
          const id = novel.novel_id || novel.novelId;
          return (
            <div
              key={id}
              className={`item ${activeIndex === index ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={novel.imageLink || novel.novelImgLink || novel.novel_img_link}
                alt={`Thumbnail ${index + 1}`}
                data-novel-id={id}
                onError={handleImgError}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
