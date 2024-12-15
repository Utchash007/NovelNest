import React, { useState } from "react";
import CptIntro from '../template/CptIntro';
import CptContent from '../template/CptContent';
const ChapterLayout=()=>{
    return(
        <div>
            <div class="content-wrap">
            <article id="chapter-article">
            <section className="page-in content-wrap"/>
                    <CptIntro/>
                    <CptContent/>
            </article>
            </div>
        </div>
    )
};

export default ChapterLayout;