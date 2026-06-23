import React from "react";

const CptContent: React.FC<{ cpt_text: string }> = ({ cpt_text }) => {
  return (
    <div id="chapter-container" className="chapter-content font_default">
      {cpt_text}
    </div>
  );
};

export default CptContent;
