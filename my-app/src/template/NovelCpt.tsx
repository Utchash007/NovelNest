import React from "react";
import { Link } from "react-router-dom";

interface Chapter {
  descript_id?: string;
  descriptId?: string;
  novel_id?: string;
  novelId?: string;
  cpt_no?: number;
  cptNo?: number;
  chapterNo?: number;
  chapter_no?: number;
  chapter_title?: string;
  chapterTitle?: string;
}

const NovelCpt: React.FC<{ chapters: Chapter[] }> = ({ chapters }) => {
  return (
    <div>
      <div className="chapter-list">
        <h2>Chapters</h2>
        <ul>
          {chapters.map((chapter) => {
            const descriptId = chapter.descriptId || chapter.descript_id;
            const novelId = chapter.novelId || chapter.novel_id;
            const cptNo = chapter.chapterNo ?? chapter.chapter_no ?? chapter.cptNo ?? chapter.cpt_no;
            const chapterTitle = chapter.chapterTitle || chapter.chapter_title;
            return (
              <li key={descriptId}>
                <Link to={`/novel/${novelId}/chapter/${cptNo}`}>
                  Chapter {cptNo}: {chapterTitle}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NovelCpt;
