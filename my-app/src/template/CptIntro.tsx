import React from "react";

interface CptIntroProps {
  chapter_title: string;
  novel_id: string;
  novelName?: string;
}

const CptIntro: React.FC<CptIntroProps> = ({ chapter_title, novelName }) => {
  return (
    <div>
      <div className="titles">
        <h1 itemProp="headline">
          <a className="booktitle">{novelName}</a>
          <br /><br />
          <span className="chapter-title">{chapter_title}</span>
        </h1>
      </div>
    </div>
  );
};

export default CptIntro;
