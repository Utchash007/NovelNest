import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom"; 
import ChapterLayout from "../Layout/ChapterLayout";
const Novel_cpt=({chapters})=>{
    const navigate = useNavigate();
    return(
<div>
        <div class="chapter-list">
    <h2>Chapters</h2>
    
    <ul>
    {chapters.map((chapter) => (
                        <li key={chapter.descript_id}>
                            <Link to={`/ChapterLayout/${chapter.novel_id}/${chapter.cpt_no}`}>
                                Chapter {chapter.cpt_no}: {chapter.chapter_title}
                            </Link>
                        </li>
                    ))}
    </ul>
    </div>
</div>
    )
}

export default Novel_cpt;