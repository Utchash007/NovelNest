import React, { useState } from "react";
import Card from "../template/card";
import Slider from "../template/Slider";
const homepage=()=>{
    const novels = [
        { image: "./Assets/img1.jpeg", title: "Jujutsu Kaisen 0", description: "Action, Slice of Life", genres: ["#action", "#slice of life"] },
        { image: "./Assets/img2.jpg", title: "Your Name", description: "Adventure, Slice of Life", genres: ["#adventure", "#slice of life"] },
        { image: "/Assets/img3.png", title: "Path Of Peace", description: "Slice of Life", genres: ["#slice of life"] },
      ];

      return (
        <div>
          <Slider />
          <div className="field">
            <div className="heading">
              <h1><a href="#">Action</a></h1>
            </div>
            <div className="container">
              <div className="card__container">
                {novels.map((novel, index) => (
                  <Card key={index} {...novel} />
                ))}
              </div>
            </div>
          </div>
          <div className="field">
            <div className="heading">
              <h1><a href="#">Slice of Life</a></h1>
            </div>
            <div className="container">
              <div className="card__container">
                {novels.map((novel, index) => (
                  <Card key={index} {...novel} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
}

export default homepage