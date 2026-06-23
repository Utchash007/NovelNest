import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";
import NovelDescription from "../template/NovelDescription";
import NovelCpt from "../template/NovelCpt";

interface Chapter {
  descript_id?: string;
  descriptId?: string;
  cpt_no?: number;
  cptNo?: number;
  chapterNo?: number;
  chapter_no?: number;
  chapter_title?: string;
  chapterTitle?: string;
  novel_id?: string;
  novelId?: string;
}

interface Novel {
  novel_id?: string;
  novelId?: string;
  novel_name?: string;
  novelName?: string;
  novel_img_link?: string;
  novelImgLink?: string;
  imageLink?: string;
  intro: string;
  status: number;
  rating: number;
}

interface Author {
  author: string;
}

const Novelpage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [chapterdata, setChapterData] = useState<Chapter[]>([]);
  const [noveldata, setNovelData] = useState<Novel[]>([]);
  const [authorData, setAuthorData] = useState<Author[]>([]);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      api.get(`/api/novel-info/chapters?novel_id=${id}`),
      api.get(`/api/novels/${id}`),
      api.get(`/api/authors/get_authors?novel_id=${id}`),
    ])
      .then(([chaptersRes, novelRes, authorsRes]) => {
        const getCptNo = (c: Chapter) => c.chapterNo ?? c.chapter_no ?? c.cptNo ?? c.cpt_no ?? 0;
        const chaptersList = chaptersRes.data?.data || chaptersRes.data || [];
        setChapterData(
          chaptersList.toSorted((a: Chapter, b: Chapter) => getCptNo(a) - getCptNo(b))
        );
        // Supports array or single object response
        const novelPayload = novelRes.data?.data !== undefined ? novelRes.data.data : novelRes.data;
        const novelsList = Array.isArray(novelPayload) ? novelPayload : [novelPayload];
        setNovelData(novelsList.filter(Boolean));
        setAuthorData(authorsRes.data?.data || authorsRes.data || []);
      })
      .catch(() => {});
  }, [id]);

  return (
    <div>
      {noveldata.map((novel) => {
        const novelId = novel.novel_id || novel.novelId;
        return (
          <NovelDescription
            key={novelId}
            id={novelId}
            image={(novel.imageLink || novel.novelImgLink || novel.novel_img_link)!}
            title={(novel.novel_name || novel.novelName)!}
            description={novel.intro}
            status={novel.status}
            rating={novel.rating}
            author={authorData[0]?.author}
          />
        );
      })}

      <NovelCpt chapters={chapterdata} />

      <div className="navbutton">
        <button onClick={() => navigate("/")} className="buttonBack">Back</button>
      </div>
    </div>
  );
};

export default Novelpage;
