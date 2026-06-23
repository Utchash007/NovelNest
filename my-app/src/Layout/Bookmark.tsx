import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Card from "../template/card";
import { getStoredAuth } from "../storage";
import { getGenres } from "../utils";

interface BookmarkEntry {
  novelId: string;
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
  action?: boolean;
  adventure?: boolean;
  isekai?: boolean;
  fantasy?: boolean;
  slice_of_life?: boolean;
  sliceOfLife?: boolean;
}

const Bookmark: React.FC = () => {
  const navigate = useNavigate();
  const user_id = getStoredAuth()?.user_id;
  const [bookmarkedNovels, setBookmarkedNovels] = useState<Novel[]>([]);

  useEffect(() => {
    // Single chained fetch using api client
    api
      .get(`/api/bookmarks/get`)
      .then((res) => {
        const bookmarks: BookmarkEntry[] = res.data?.data || res.data || [];
        if (!bookmarks || bookmarks.length === 0) return;
        return Promise.all(
          bookmarks.map((b) =>
            api.get(`/api/novels/${b.novelId}`).then((r) => {
              const d = r.data?.data !== undefined ? r.data.data : r.data;
              return Array.isArray(d) ? d[0] : d;
            })
          )
        );
      })
      .then((novels) => {
        if (novels) setBookmarkedNovels(novels.filter(Boolean));
      })
      .catch(() => {});
  }, [user_id]);

  return (
    <div>
      <div className="field">
        <div className="heading">
          <h1><a href="#">Bookmarks</a></h1>
        </div>
        <div className="container">
          <div className="card__container">
            {bookmarkedNovels.map((novel) => {
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

export default Bookmark;
