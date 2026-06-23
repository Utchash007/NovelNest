import React, { useEffect, useState } from "react";
import api from "../api";
import { useSearchParams, useNavigate } from "react-router-dom";
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

const AdvSearchResultLayout: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [advSearchResult, setAdvSearchResult] = useState<Novel[]>([]);

  const action = searchParams.get("action") ?? "0";
  const adventure = searchParams.get("adventure") ?? "0";
  const isekai = searchParams.get("isekai") ?? "0";
  const fantasy = searchParams.get("fantasy") ?? "0";
  const slice_of_life = searchParams.get("slice_of_life") ?? "0";
  const search = searchParams.get("q") ?? "ALL";

  useEffect(() => {
    const url = `/api/novels/advanced_search?action=${action}&adventure=${adventure}&isekai=${isekai}&slice_of_life=${slice_of_life}&fantasy=${fantasy}&novel_name=${search}`;
    api
      .get(url)
      .then((res) => setAdvSearchResult(res.data?.data || res.data || []))
      .catch(() => {});
  }, [action, adventure, isekai, fantasy, slice_of_life, search]);

  return (
    <div>
      <div className="searchresult">
        <div className="field">
          <div className="heading">
            <h1><a href="#">Advanced Search Results</a></h1>
          </div>
          <div className="container">
            <div className="card__container">
              {advSearchResult.map((novel) => {
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

export default AdvSearchResultLayout;
