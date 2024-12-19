import React, { useEffect, useState,useRef} from "react";
import NovelDescription from '../template/NovelDescription';
import NovelCpt from '../template/NovelCpt';
import axios from "axios";
import { useParams } from "react-router-dom";  // Make sure this is correct


const Novelpage=()=>{
    const isFetchedRef=useRef(false)
    const {id}=useParams();
    const [chapterdata, setChapterData] = useState([])
    const [noveldata, setNovelData] = useState([])
   useEffect(()=>{
        if(isFetchedRef.current)return;
        isFetchedRef.current=true;
        const url1="http://127.0.0.1:8000/api/novel-info/chapters?novel_id="+id;
        const url2="http://127.0.0.1:8000/api/novels/novel/?novel_id="+id;
        
       Promise.all( 
        [
            axios.get(url1),
            axios.get(url2)
        ])
        .then(([chapterDataResponse,novelDataResponse])=>{
            setChapterData(chapterDataResponse.data.sort((a,b)=>a.cpt_no-b.cpt_no));
            setNovelData(novelDataResponse.data);
        })
        .catch((error)=>{
            console.log(chapterdata);
            console.log(id);
            console.log(error.message);
          })

   },[id]);


    return(
        console.log(noveldata),
    <div>
        {noveldata.map((novel)=>(
                    <NovelDescription 
                    key={novel.novel_id}  
                    id={novel.novel_id}
                    image={novel.novel_img_link}
                    title={novel.novel_name}
                    description={novel.intro}
                    status={novel.status}
                    rating={novel.rating}
                    />
        ))}
        
    <NovelCpt 
        chapters={chapterdata}
    />

    </div>
    )
}

export default Novelpage;