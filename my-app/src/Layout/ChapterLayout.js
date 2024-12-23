import React, { useEffect, useState, useRef } from "react";
import CptIntro from '../template/CptIntro';
import CptContent from '../template/CptContent';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

const ChapterLayout = () => {
    const isFetchedRef = useRef(false);
    const { novel_id, cpt_no } = useParams();
    const navigate = useNavigate();
    const [chapterdata, setChapterData] = useState([]);
    const [noveldata, setNovelData] = useState([]);
    const [updatedata, setUpdateData] = useState([]);
    const [isUnauthorized, setIsUnauthorized] = useState(false); // Track redirection

    useEffect(() => {
        const storedData = localStorage.getItem("active");
        if (!storedData) {
            setIsUnauthorized(true); // Trigger redirection
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

        if (isFetchedRef.current) return;
        isFetchedRef.current = true;

        const url1 = `http://127.0.0.1:8000/api/chapter/contents/?novel_id=${novel_id}&cpt_no=${cpt_no}`;
        const url2 = `http://127.0.0.1:8000/api/novels/novel/?novel_id=${novel_id}`;
        const url3 = `http://127.0.0.1:8000/api/update_novel/read_count_update/?novel_id=${novel_id}`;

        Promise.all([
            axios.get(url1, axiosConfig),
            axios.get(url2, axiosConfig),
            axios.get(url3, axiosConfig)
        ])
            .then(([chapterDataResponse, novelDataResponse, updateResponse]) => {
                setChapterData(chapterDataResponse.data);
                setNovelData(novelDataResponse.data);
                setUpdateData(updateResponse.data);
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

    // Redirect if unauthorized
    if (isUnauthorized) {
        navigate('/LoginSignup', { replace: true });
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
                            novelName={noveldata[0]?.novel_name} // Use optional chaining
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
        </div>
    );
};

export default ChapterLayout;
