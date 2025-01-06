import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import Card from "../template/card";

const AllNovels=()=>{
    const [allNovels,setallNovels]=useState([]);
    useEffect(()=>{
        const url="http://127.0.0.1:8000/api/novels/";
        axios.get(url)
        .then((response)=>{
            setallNovels(response.data);
        })
        .catch((error)=>{
            console.log(error.message);
        });
},[]);

return (
    <div>
        <div className="field">
            <div className="heading">
              <h1><a href="#">Novel List</a></h1>
            </div>
            <div className="container">
              <div className="card__container">
              {allNovels.map((novel) => (
                  <Card 
                  key={novel.novel_id}
                  id={novel.novel_id}
                  image={novel.novel_img_link}
                  title={novel.novel_name}
                  description={novel.intro}
                  genres={[novel.action ? "#action":"", novel.adventure? "#adventure": "",novel.isekai ? "#isekai" : "", novel.fantasy ? "#fantasy" : "", novel.slice_of_life ? "#slice_of_life" : ""].filter(Boolean)} 
                  />
                ))}
              </div>
            </div>
          </div>
    </div>
)
}

export default AllNovels;