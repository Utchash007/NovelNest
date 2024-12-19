import React, { useEffect, useState } from "react";
import axios from "axios";
const CptIntro=({chapter_title,novel_id, novelName})=>{
   
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