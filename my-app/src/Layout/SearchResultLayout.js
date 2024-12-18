import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../template/card";
import axios from "axios";

const SearchResultLayout=()=>{
    const [searchNovels, setSearchNovel]=useState([]);
    const {searchQuery}=useParams();
    useEffect(()=>{
        const url1="http://127.0.0.1:8000/api/novels/search/?novel_name="+searchQuery;
        console.log(url1);
       Promise.all( 
        [
            axios.get(url1)
        ])
        .then(([searchNovelResponse])=>{
            console.log(searchNovelResponse.data);
          setSearchNovel(searchNovelResponse.data);
        })
        .catch((error)=>{
            console.log(url1);
            console.log(error.message);
          })
  
   },[searchQuery]);
    return(
        <div>
            <div className="field">
                <div className="heading">
                <h1><a href="#">Search Results</a></h1>
                </div>
                <div className="container">
                <div className="card__container">
                    {searchNovels.map((novel) => (
                    <Card 
                    key={novel.novel_id}
                    id={novel.novel_id}
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
    )
}

export default SearchResultLayout;