import React, { useEffect, useState, useRef } from "react";
import CptIntro from '../template/CptIntro';
import CptContent from '../template/CptContent';
import {  useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { decode } from "../decodeJWT";
import { create_read } from "../Generic_API/Create_Read_history";
import { getTime } from "../getTime";
import baseUrl from "../URLs";
const ChapterLayout = () => {
    const isFetchedRef = useRef(false);
    const user_id=(decode(localStorage.getItem("active"))).user_id;
    const { novel_id, cpt_no } = useParams();
    const navigate = useNavigate();
    const [chapterdata, setChapterData] = useState([]);
    const [noveldata, setNovelData] = useState([]);
    const [updatedata, setUpdateData] = useState([]);
    const [isUnauthorized, setIsUnauthorized] = useState(false); // Track redirection
    const currentISOTime = new Date().toISOString();
    const [chapterStatus,setChapterStatus]=useState();
    const[statusString,setStatusString]=useState()
    const nxt_cpt_no=(parseInt(cpt_no)+1).toString();
    const prev_cpt_no=(parseInt(cpt_no)-1).toString();

    useEffect(() => {
        const storedData = localStorage.getItem("active");
        if (!storedData) {
            setIsUnauthorized(true); 
            return;
        }
        const parsedToken = JSON.parse(storedData);
        const token = parsedToken?.access;
        if (!token) {
            setIsUnauthorized(true); // Trigger redirection
            return;
        }

        console.log(token);
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

       
        create_read(getTime() ,user_id,novel_id,cpt_no);
        const url1 = `http://127.0.0.1:8000/api/chapter/contents/?novel_id=${novel_id}&cpt_no=${cpt_no}`;
        const url2 = `http://127.0.0.1:8000/api/novels/novel/?novel_id=${novel_id}`;
        const url3 = `http://127.0.0.1:8000/api/update_novel/read_count_update/?novel_id=${novel_id}`;
        const url4=baseUrl()+"api/chapter/chapter_rank/?novel_id="+novel_id+"&cpt_no="+cpt_no;
        console.log(url4);
        Promise.all([
            axios.get(url1, axiosConfig),
            axios.get(url2, axiosConfig),
            axios.get(url3, axiosConfig),
            axios.get(url4,axiosConfig)
        ])
            .then(([chapterDataResponse, novelDataResponse, updateResponse,statusResponse]) => {
                setChapterData(chapterDataResponse.data);
                setNovelData(novelDataResponse.data);
                setUpdateData(updateResponse.data);
                setChapterStatus(statusResponse.data);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("active");
                    setIsUnauthorized(true); // Trigger redirection
                    return;
                }
                console.log(error.message);
            });
    }, [novel_id, cpt_no]);

    useEffect(()=>{
        const url4=baseUrl()+"api/chapter/chapter_rank/?novel_id="+novel_id+"&cpt_no="+cpt_no;
        axios.
        get(url4).
        then((response)=>{
            console.log(response.data);
            setChapterStatus(response.data);
            console.log(chapterStatus)
        }).catch((error)=>{
            console.log(error.message);
        })
    },[novel_id, cpt_no])

    useEffect(() => {
        if (chapterStatus) {
            console.log("Updated chapterStatus:", chapterStatus);
            setStatusString(chapterStatus.chapter)
            console.log(statusString)
        }
    }, [chapterStatus])

    // Redirect if unauthorized
    if (isUnauthorized) {
        return null; // Stop rendering
    }
    
    return (
        <div>
            <div className="content-wrap">
                <article id="chapter-article">
                    <section className="page-in content-wrap" />
                    {chapterdata.map((data) => (
                        <CptIntro
                            key={data.descript_id}
                            chapter_title={data.chapter_title}
                            novel_id={data.novel_id}
                            novelName={noveldata[0]?.novel_name} 
                        />
                    ))}

                    {chapterdata.map((data) => (
                        <CptContent
                            key={data.descript_id}
                            cpt_text={data.cpt_text}
                        />
                    ))}
                </article>
                
            </div>
            <div className="navbutton">
                  {statusString!==undefined && statusString==="First" && <button  onClick={() => {navigate(`/ChapterLayout/${novel_id}/${nxt_cpt_no}`)}} className="buttonBack">Next</button>}
                  {statusString!==undefined && statusString==="Middle" && <div><button onClick={() => {navigate(`/ChapterLayout/${novel_id}/${prev_cpt_no}`)}} className="buttonBack">Prev</button><button onClick={() => {navigate(`/ChapterLayout/${novel_id}/${nxt_cpt_no}`)}} className="buttonBack">Next</button></div>}
            </div>
            <div className="navbutton">
            <button onClick={() => navigate(`/Novelpage/${novel_id}`)} className="buttonBack">Back</button> 
            </div>
        </div>
    );
};

export default ChapterLayout;
