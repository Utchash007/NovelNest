import React, { useEffect, useState } from "react";
import CptIntro from '../template/CptIntro';
import CptContent from '../template/CptContent';
import { useParams } from 'react-router-dom';
import axios from "axios";
const ChapterLayout=()=>{

    const id=useParams();
    const [chapterdata, setChapterData] = useState(null);
    const [noveldata, setNovelData] = useState(null);
   useEffect(()=>{
        const url1="http://127.0.0.1:8000/api/novel-info/chapters?novel_id="+id;
        const url2="http://127.0.0.1:8000/api/novels/novel/?novel_id="+id;
       Promise.all( 
        [
            axios.get(url1),
            axios.get(url2)
        ])
        .then(([chapterDataResponse,novelDataResponse])=>{
            setChapterData(chapterDataResponse.data);
            setNovelData(novelDataResponse.data);
        })
        .catch((error)=>{
            alert(error.message);
          })

   },[id]);


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