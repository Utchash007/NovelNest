import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";
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

const SearchResultLayout: React.FC = () => {
  const navigate = useNavigate();
  const [searchNovels, setSearchNovels] = useState<Novel[]>([]);
  const { searchQuery } = useParams<{ searchQuery: string }>();

  useEffect(() => {
    const url =
      !searchQuery || searchQuery.trim() === ""
        ? "/api/novels"
        : `/api/novels/search?novel_name=${searchQuery}`;

    api
      .get(url)
      .then((res) => setSearchNovels(res.data?.data || res.data || []))
      .catch(() => {});
  }, [searchQuery]);

  return (
    <div>
      <div className="searchresult">
        <div className="field">
          <div className="heading">
            <h1><a href="#">Search Results for <i>{searchQuery}</i></a></h1>
          </div>
          <div className="container">
            <div className="card__container">
              {searchNovels.map((novel) => {
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
      </div>
      <div className="navbutton">
        <button onClick={() => navigate("/")} className="buttonBack">Back</button>
      </div>
    </div>
  );
};

export default SearchResultLayout;
