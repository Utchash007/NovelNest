import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Card from "../template/card";
import { getGenres } from "../utils";

interface Novel {
  novel_id?: string;
  novelId?: string;
  novel_name?: string;
  novelName?: string;
  novel_img_link?: string;
  novelImgLink?: string;
  imageLink?: string;
  intro: string;
  action?: boolean;
  adventure?: boolean;
  isekai?: boolean;
  fantasy?: boolean;
  slice_of_life?: boolean;
  sliceOfLife?: boolean;
}

const AllNovels: React.FC = () => {
  const navigate = useNavigate();
  const [allNovels, setAllNovels] = useState<Novel[]>([]);

  useEffect(() => {
    api
      .get("/api/novels")
      .then((res) => setAllNovels(res.data?.data || res.data || []))
      .catch(() => {});
  }, []);

  return (
    <div>
      <div className="field">
        <div className="heading">
          <h1><a href="#">Novel List</a></h1>
        </div>
        <div className="container">
          <div className="card__container">
            {allNovels.map((novel) => {
              const id = novel.novel_id || novel.novelId;
              return (
                <Card
                  key={id}
                  id={id!}
                  image={(novel.imageLink || novel.novelImgLink || novel.novel_img_link)!}
                  title={(novel.novel_name || novel.novelName)!}
                  description={novel.intro}
                  genres={getGenres(novel)}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="navbutton">
        <button onClick={() => navigate("/")} className="buttonBack">Back</button>
      </div>
    </div>
  );
};

export default AllNovels;
