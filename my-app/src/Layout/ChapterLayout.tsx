import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import CptIntro from "../template/CptIntro";
import CptContent from "../template/CptContent";
import { getStoredAuth, clearStoredAuth } from "../storage";
import { create_read } from "../Generic_API/Create_Read_history";

interface ChapterData {
  descript_id?: string;
  descriptId?: string;
  chapter_title?: string;
  chapterTitle?: string;
  novel_id?: string;
  novelId?: string;
  cpt_text?: string;
  cptText?: string;
  chapterText?: string;
  chapter_text?: string;
}

interface NovelData {
  novel_name?: string;
  novelName?: string;
}

interface ChapterStatus {
  chapter: string;
}

const ChapterLayout: React.FC = () => {
  const user_id = getStoredAuth()?.user_id;
  const { novel_id, cpt_no } = useParams<{ novel_id: string; cpt_no: string }>();
  const navigate = useNavigate();

  const [chapterdata, setChapterData] = useState<ChapterData[]>([]);
  const [noveldata, setNovelData] = useState<NovelData[]>([]);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [chapterStatus, setChapterStatus] = useState<ChapterStatus | null>(null);

  const nxt_cpt_no = String(parseInt(cpt_no ?? "0") + 1);
  const prev_cpt_no = String(parseInt(cpt_no ?? "0") - 1);

  const statusString = chapterStatus?.chapter;

  useEffect(() => {
    const parsedToken = getStoredAuth();
    if (!parsedToken?.access) { setIsUnauthorized(true); return; }

    create_read(novel_id!, parseInt(cpt_no!, 10));

    Promise.all([
      api.get(`/api/chapter/contents?novel_id=${novel_id}&cpt_no=${cpt_no}`),
      api.get(`/api/novels/${novel_id}`),
      api.get(`/api/update_novel/read_count_update?novel_id=${novel_id}`),
      api.get(`/api/chapter/chapter_rank?novel_id=${novel_id}&cpt_no=${cpt_no}`),
    ])
      .then(([chapterRes, novelRes, , statusRes]) => {
        const chapterPayload = chapterRes.data?.data !== undefined ? chapterRes.data.data : chapterRes.data;
        setChapterData(Array.isArray(chapterPayload) ? chapterPayload : [chapterPayload]);
        const novelPayload = novelRes.data?.data !== undefined ? novelRes.data.data : novelRes.data;
        const novelsList = Array.isArray(novelPayload) ? novelPayload : [novelPayload];
        setNovelData(novelsList.filter(Boolean));
        setChapterStatus(statusRes.data?.data || statusRes.data);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          clearStoredAuth();
          setIsUnauthorized(true);
        }
      });
  }, [novel_id, cpt_no]);

  if (isUnauthorized) return null;

  return (
    <div>
      <div className="content-wrap">
        <article id="chapter-article">
          <section className="page-in content-wrap" />
          {chapterdata.map((data) => {
            const descId = data.descript_id || data.descriptId;
            const title = data.chapter_title || data.chapterTitle;
            const nid = data.novel_id || data.novelId;
            return (
              <CptIntro
                key={descId}
                chapter_title={title!}
                novel_id={nid!}
                novelName={noveldata[0]?.novel_name || noveldata[0]?.novelName}
              />
            );
          })}
          {chapterdata.map((data) => {
            const descId = data.descript_id || data.descriptId;
            const text = data.chapterText || data.chapter_text || data.cptText || data.cpt_text;
            return <CptContent key={descId} cpt_text={text!} />;
          })}
        </article>
      </div>
      <div className="navbutton">
        {statusString === "First" && (
          <button onClick={() => navigate(`/novel/${novel_id}/chapter/${nxt_cpt_no}`)} className="buttonBack">Next</button>
        )}
        {statusString === "Middle" && (
          <div>
            <button onClick={() => navigate(`/novel/${novel_id}/chapter/${prev_cpt_no}`)} className="buttonBack">Prev</button>
            <button onClick={() => navigate(`/novel/${novel_id}/chapter/${nxt_cpt_no}`)} className="buttonBack">Next</button>
          </div>
        )}
      </div>
      <div className="navbutton">
        <button onClick={() => navigate(`/novel/${novel_id}`)} className="buttonBack">Back</button>
      </div>
    </div>
  );
};

export default ChapterLayout;
