import React, { useEffect, useState } from "react";
import CptIntro from '../template/CptIntro';
import CptContent from '../template/CptContent';
import { useParams } from 'react-router-dom';
import axios from "axios";
const ChapterLayout=()=>{

    const {novel_id, cpt_no}=useParams();
    console.log(novel_id);
    const [chapterdata, setChapterData] = useState([]);
    const [noveldata, setNovelData] = useState([]);
   useEffect(()=>{
        const url1="http://127.0.0.1:8000/api/chapter/contents/?novel_id="+novel_id+"&cpt_no="+cpt_no;
        const url2="http://127.0.0.1:8000/api/novels/novel/?novel_id="+novel_id;
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
            console.log(novel_id);
            console.log(error.message);
          })

   },[novel_id,cpt_no]);

   
    return(
        
        <div>
            <div class="content-wrap">
            <article id="chapter-article">
            <section className="page-in content-wrap"/>
                    {chapterdata.map((data)=>(
                        <CptIntro
                        key={data.descript_id}
                        chapter_title={data.chapter_title}
                        novel_id={data.novel_id}
                        novelName={noveldata[0].novel_name} 
                         />
                    ))}
                    
                    {chapterdata.map((data)=>(
                        <CptContent
                        key={data.descript_id}
                        cpt_text={data.cpt_text} 
                         />
                    ))}
                
            </article>
            </div>
        </div>
    )
};

export default ChapterLayout;