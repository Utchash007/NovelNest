import React, { useEffect, useState } from "react";
import Card from "../template/card";
import Slider from "../template/Slider";
import axios from "axios";
const Homepage=()=>{
    const novels = [
        { image: "./Assets/img1.jpeg", title: "Jujutsu Kaisen 0", description: "Action, Slice of Life", genres: ["#action", "#slice of life"] },
        { image: "./Assets/img2.jpg", title: "Your Name", description: "Adventure, Slice of Life", genres: ["#adventure", "#slice of life"] },
        { image: "https://i.postimg.cc/76yy4KmD/img5.png", title: "Path Of Peace", description: "Slice of Life", genres: ["#slice of life"] },
      ];
const [actionNovels,setActionNovels]=useState([])
const [adventureNovels,setadventureNovels]=useState([])
const [sliceoflifeNovels,setsliceoflifeNovels]=useState([])

useEffect(()=>{
    Promise.all([

      axios.get("http://127.0.0.1:8000/api/novels/novel_action/"),
      axios.get("http://127.0.0.1:8000/api/novels/novel_slice_of_life/"),

    ])

    .then(([actionResponse,sliceoflifeResponse])=>{
        setActionNovels(actionResponse.data);
        setsliceoflifeNovels(sliceoflifeResponse.data);
    })
    .catch((error)=>{
      alert(error.message);
    })

},[])



      return (
        <div>
          <Slider />
          <div className="field">
            <div className="heading">
              <h1><a href="#">Action</a></h1>
            </div>
            <div className="container">
              <div className="card__container">
              {actionNovels.map((novel) => (
                  <Card 
                  key={novel.novel_id}
                  image={novel.novel_img_link}
                  title={novel.novel_name}
                  description={novel.intro}
                  genres={[novel.action ? "#action":"", novel.adventure? "adventure": "",novel.isekai ? "#isekai" : "", novel.fantasy ? "#fantasy" : "", novel.slice_of_life ? "#slice_of_life" : ""].filter(Boolean)} 
                  />
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
                {sliceoflifeNovels.map((novel) => (
                  <Card 
                  key={novel.novel_id}
                  image={novel.novel_img_link}
                  title={novel.novel_name}
                  description={novel.intro}
                  genres={[novel.action ? "#action":"", novel.adventure? "adventure": "",novel.isekai ? "#isekai" : "", novel.fantasy ? "#fantasy" : "", novel.slice_of_life ? "#slice_of_life" : ""].filter(Boolean)} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
}

export default Homepage