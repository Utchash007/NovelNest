import React, { useEffect, useState } from "react";
import { useParams,useNavigate} from "react-router-dom";
import Card from "../template/card";
import axios from "axios";

const SearchResultLayout=()=>{
    const navigate = useNavigate();
    const [searchNovels, setSearchNovel]=useState([]);
    const {searchQuery}=useParams();
    useEffect(()=>{

        var url1="";
        
        if(!searchQuery || searchQuery.trim()===""){
            url1="http://127.0.0.1:8000/api/novels/"
        }
       else {url1="http://127.0.0.1:8000/api/novels/search/?novel_name="+searchQuery;}
        console.log(searchQuery);
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
            <div className="searchresult">
            <div className="field">
                <div className="heading">
                <h1><a href="#">Search Results for <i>{searchQuery}</i></a></h1>
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
        <div className="navbutton">
            <button onClick={() => navigate(`/`)} className="buttonBack">Back</button>
        </div>
        </div>
    )
}

export default SearchResultLayout;