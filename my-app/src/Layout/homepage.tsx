import React, { useEffect, useState } from "react";
import api from "../api";
import Card from "../template/card";
import Slider from "../template/Slider";
import { getStoredAuth } from "../storage";
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

interface HistoryEntry {
  novelId: string;
}

const Homepage: React.FC = () => {
  const user_id = getStoredAuth()?.user_id;

  const [actionNovels, setActionNovels] = useState<Novel[]>([]);
  const [adventureNovels, setAdventureNovels] = useState<Novel[]>([]);
  const [sliceoflifeNovels, setSliceoflifeNovels] = useState<Novel[]>([]);
  const [isekaiNovels, setIsekaiNovels] = useState<Novel[]>([]);
  const [fantasyNovels, setFantasyNovels] = useState<Novel[]>([]);
  const [novelHistory, setNovelHistory] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/api/novels/novel_action"),
      api.get("/api/novels/novel_slice_of_life"),
      api.get("/api/novels/novel_adventure"),
      api.get("/api/novels/novel_isekai"),
      api.get("/api/novels/novel_fantasy"),
      api.get("/api/history/get_history"),
    ])
      .then(([actionRes, solRes, advRes, isekaiRes, fantasyRes, historyRes]) => {
        setActionNovels(actionRes.data?.data || actionRes.data || []);
        setSliceoflifeNovels(solRes.data?.data || solRes.data || []);
        setAdventureNovels(advRes.data?.data || advRes.data || []);
        setIsekaiNovels(isekaiRes.data?.data || isekaiRes.data || []);
        setFantasyNovels(fantasyRes.data?.data || fantasyRes.data || []);

        // Chain history → novel details in one pass (no waterfall)
        const historyEntries: HistoryEntry[] = historyRes.data?.data || historyRes.data || [];
        if (historyEntries && historyEntries.length > 0) {
          Promise.all(
            historyEntries.map((entry) =>
              api
                .get(`/api/novels/${entry.novelId}`)
                .then((r) => {
                  const d = r.data?.data !== undefined ? r.data.data : r.data;
                  return Array.isArray(d) ? d[0] : d;
                })
            )
          ).then((novels) => setNovelHistory(novels.filter(Boolean)));
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user_id]);

  if (loading) {
    return (
      <div className="spinner-box">
        <div className="circle-border">
          <div className="circle-core"></div>
        </div>
      </div>
    );
  }

  const renderSection = (title: string, novels: Novel[]) => (
    <div className="field">
      <div className="heading">
        <h1><a href="#">{title}</a></h1>
      </div>
      <div className="container">
        <div className="card__container">
          {novels.map((novel) => {
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
  );

  return (
    <div>
      <Slider />
      {renderSection("Action", actionNovels)}
      {renderSection("Slice of Life", sliceoflifeNovels)}
      {renderSection("Adventure", adventureNovels)}
      {renderSection("Isekai", isekaiNovels)}
      {renderSection("Fantasy", fantasyNovels)}

      <div className="field">
        <div className="heading">
          <h1><a href="#">Continue Reading</a></h1>
        </div>
        <div className="container">
          <div className="card__container">
            {novelHistory.length > 0 ? (
              novelHistory.map((novel) => {
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
              })
            ) : (
              <div className="placeholder-message">
                <p>No books in your reading history yet! Explore novels and start reading to see them here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
