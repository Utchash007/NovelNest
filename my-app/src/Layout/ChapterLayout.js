import React, { useEffect, useState,useRef } from "react";
import CptIntro from '../template/CptIntro';
import CptContent from '../template/CptContent';
import { useParams } from 'react-router-dom';
import axios from "axios";
const ChapterLayout=()=>{
    const isFetchedRef=useRef(false)
    const {novel_id, cpt_no}=useParams();
    console.log(novel_id);
    const [chapterdata, setChapterData] = useState([]);
    const [noveldata, setNovelData] = useState([]);
    const [updatedata, setUpdatelData] = useState([]);
   useEffect(()=>{
        if(isFetchedRef.current)return;
        isFetchedRef.current=true;  
        const url1="http://127.0.0.1:8000/api/chapter/contents/?novel_id="+novel_id+"&cpt_no="+cpt_no;
        const url2="http://127.0.0.1:8000/api/novels/novel/?novel_id="+novel_id;
        const url3="http://127.0.0.1:8000/api/update_novel/read_count_update/?novel_id="+novel_id;
       Promise.all( 
        [   
            axios.get(url1),
            axios.get(url2),
            axios.get(url3)
        ])
        .then(([chapterDataResponse,novelDataResponse,updateResponse])=>{
            setChapterData(chapterDataResponse.data);
            setNovelData(novelDataResponse.data);
            setUpdatelData(updateResponse.data);
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