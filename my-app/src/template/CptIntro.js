import React, { useEffect, useState } from "react";
import axios from "axios";
const CptIntro=({chapter_title,novel_id, novelName})=>{

    const [noveldata, setNovelData] = useState([]);
    useEffect(()=>{
        const url1="http://127.0.0.1:8000/api/novels/novel/?novel_id="+novel_id;
       Promise.all( 
        [
            axios.get(url1)
        ])
        .then(([novelDataResponse])=>{
            setNovelData(novelDataResponse.data);
            console.log(novelDataResponse.data);
            
        })
        .catch((error)=>{
            console.log(error.message);
          })

   },[novel_id]);

   
    return(
        
    <div>   
        <div class="titles">
        <h1 itemprop="headline">
            <a class="booktitle">
                {novelName}
            </a>
            <br /><br/><span class="chapter-title">
                {chapter_title}
                
            </span>
        </h1>
    </div>
    </div> 
    )
};

export default CptIntro;