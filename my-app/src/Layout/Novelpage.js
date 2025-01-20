import React, { useEffect, useState,useRef} from "react";
import NovelDescription from '../template/NovelDescription';
import NovelCpt from '../template/NovelCpt';
import axios from "axios";
import { Link,useParams,useNavigate } from "react-router-dom";  // Make sure this is correct


const Novelpage=()=>{
    const isFetchedRef=useRef(false)
    const navigate = useNavigate();
    const {id}=useParams();
    const [chapterdata, setChapterData] = useState([])
    const [noveldata, setNovelData] = useState([])
    const [authorData, setAuthorData] = useState([])
   useEffect(()=>{
        if(isFetchedRef.current)return;
        isFetchedRef.current=true;
        const url1="http://127.0.0.1:8000/api/novel-info/chapters?novel_id="+id;
        const url2="http://127.0.0.1:8000/api/novels/novel/?novel_id="+id;
        const url3="http://127.0.0.1:8000/api/authors/get_authors/?novel_id="+id;
       Promise.all( 
        [
            axios.get(url1),
            axios.get(url2),
            axios.get(url3)
        ])
        .then(([chapterDataResponse,novelDataResponse,authorResponse])=>{
            setChapterData(chapterDataResponse.data.sort((a,b)=>a.cpt_no-b.cpt_no));
            setNovelData(novelDataResponse.data);
            setAuthorData(authorResponse.data);
        })
        .catch((error)=>{
            
            console.log(error.message);
          })

   },[id]);


    return(
        
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
                    author ={authorData[0].author}
                    />
        ))}
        
    <NovelCpt 
        chapters={chapterdata}
    />
    
    <div className="navbutton">
        <button onClick={() => navigate(`/`)} className="buttonBack">Back</button>
    </div>
    
    </div>
    )
}

export default Novelpage;