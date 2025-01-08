import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";   
import Card from "../template/card";

const AdvSearchResultLayout = () => {
    const {action,adventure, isekai,fantasy,slice_of_life,search} = useParams();
    console.log(search);
    const [advSearchResult,setadvSearchResult]=useState([]);
    useEffect(()=>{
        const url="http://127.0.0.1:8000/api/novels/advanced_search/?action="+action+"&adventure="+adventure+"&isekai="+isekai+"&slice_of_life="+slice_of_life+"&fantasy="+fantasy+"&novel_name="+search+"";
        axios.get(url)
        .then((response)=>{
            setadvSearchResult(response.data);
            console.log(response.data);
        })
        .catch((error)=>{
            console.log(error.message);
        });
    },[action,adventure,isekai,fantasy,slice_of_life]);

    return (
        <div>
          <div className="searchresult">
        <div className="field">
            <div className="heading">
              <h1><a href="#">Advanced Search Results</a></h1>
            </div>
            <div className="container">
              <div className="card__container">
              {advSearchResult.map((novel) => (
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
    </div>
    )
}

export default AdvSearchResultLayout;