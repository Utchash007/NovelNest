import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import ChapterLayout from "../Layout/ChapterLayout";
const Novel_cpt=()=>{
    return(
<div>
        <div class="chapter-list">
    <h2>Chapters</h2>
    <ul>
        <li><Link to ="/ChapterLayout">Chapter 1</Link></li>
        <li><a href="chapterPage.php?novel_id=1&chapter_no=2&chapter_title=Chapter+2&chapter_text=This+is+chapter+2+text">Chapter 2</a></li>
        <li><a href="chapterPage.php?novel_id=1&chapter_no=3&chapter_title=Chapter+3&chapter_text=This+is+chapter+3+text">Chapter 3</a></li>
    </ul>
    </div>
</div>
    )
}

export default Novel_cpt;