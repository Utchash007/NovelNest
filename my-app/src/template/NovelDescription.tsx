import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import { getStoredAuth } from "../storage";
import { Del_bookmark } from "../Generic_API/Del_bookmark";
import { Create_bookmark } from "../Generic_API/Create_bookmark";
import { handleImgError } from "../utils";

interface NovelDescriptionProps {
  id?: string;
  image: string;
  title: string;
  description: string;
  status: number;
  rating?: number;
  author: string;
}

interface BookmarkEntry {
  bookmark_id?: number;
  bookmarkId?: number;
}

const NovelDescription: React.FC<NovelDescriptionProps> = ({
  image,
  title,
  description,
  status,
  author,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [novelBook, setNovelBook] = useState<BookmarkEntry[]>([]);
  const [userRating, setUserRating] = useState(0);
  const [ratingData, setRatingData] = useState<any>([]);
  const [rate, setRate] = useState<any>([]);

  const { id } = useParams<{ id: string }>();
  const novel_id = id;
  const user_id = getStoredAuth()?.user_id;

  // Resolve average rating from rate state (resilient to formats: number, object, or array)
  const avgRatingVal = Array.isArray(rate)
    ? (rate[0]?.averageRating ?? rate[0]?.average_rating ?? rate[0] ?? 0)
    : (rate?.averageRating ?? rate?.average_rating ?? rate ?? 0);
  
  // Resolve numeric value safely
  const resolvedAvg = typeof avgRatingVal === "object" ? 0 : Number(avgRatingVal || 0);
  const rating = (resolvedAvg * 2).toFixed(1);

  // Resolve user rating (resilient to formats: number, object, or array)
  const userRatingVal = Array.isArray(ratingData)
    ? (ratingData[0]?.userRating ?? ratingData[0]?.user_rating ?? ratingData[0] ?? 0)
    : (ratingData?.userRating ?? ratingData?.user_rating ?? ratingData ?? 0);
  const resolvedUser = typeof userRatingVal === "object" ? 0 : Number(userRatingVal || 0);
  const displayedRating = resolvedUser * 2 || userRating;

  const handleClick = () => {
    const bookmarkId = novelBook[0]?.bookmarkId ?? novelBook[0]?.bookmark_id;
    if (isActive && bookmarkId !== undefined) {
      Del_bookmark(bookmarkId);
    } else {
      Create_bookmark(user_id, novel_id!);
    }
    setIsActive((prev) => !prev);
  };

  const handleRating = (value: number) => {
    setUserRating(value);
    api
      .post(`/api/rating/user_rating?parameter=2`, {
        novelId: novel_id,
        userRating: value / 2, // Map 10-point scale to 5-star scale
      })
      .then((res) => {
        const payload = res.data?.data !== undefined ? res.data.data : res.data;
        const mappedData = Array.isArray(payload) ? payload : [payload];
        setRatingData(mappedData);
      })
      .catch(() => {});
  };

  useEffect(() => {
    const bookmarkUrl = `/api/bookmarks/get_bookmark?id=${user_id}&novel_id=${novel_id}`;
    api
      .get(bookmarkUrl)
      .then((res) => {
        const payload = res.data?.data || res.data || [];
        setNovelBook(payload);
        setIsActive(res.status === 200 && payload.length > 0);
      })
      .catch(() => setIsActive(false));

    Promise.all([
      api.post(`/api/rating/user_rating?parameter=1`, { novelId: novel_id }),
      api.get(`/api/rating/avgrate?novel_id=${novel_id}`),
    ])
      .then(([userRatingRes, avgRatingRes]) => {
        const userPayload = userRatingRes.data?.data !== undefined ? userRatingRes.data.data : userRatingRes.data;
        const avgPayload = avgRatingRes.data?.data !== undefined ? avgRatingRes.data.data : avgRatingRes.data;
        const mappedUser = Array.isArray(userPayload) ? userPayload : [userPayload];
        const mappedAvg = Array.isArray(avgPayload) ? avgPayload : [avgPayload];
        setRatingData(mappedUser);
        setRate(mappedAvg);
      })
      .catch(() => {});
  }, [novel_id, user_id]);

  return (
    <div>
      <div className="novel_container">
        <div className="novel-header">
          <img
            src={image}
            alt="Cover Image"
            data-novel-id={id}
            onError={handleImgError}
          />
          <div className="novel-info">
            <h1>{title}</h1>
            <div className="rating">
              <span className="rating-count">Rating: {rating}</span>
            </div>
            <p className="status">
              Status: <span>{status === 0 ? "Ongoing" : "Completed"}</span>
            </p>
            <p className="author">
              Author: <span>{author}</span>
            </p>
            <button
              className={"bookmarkBtn" + (isActive ? " active" : "")}
              onClick={handleClick}
            >
              <span className="IconContainer">
                <svg viewBox="0 0 384 512" height="0.9em" className="icon">
                  <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
                </svg>
              </span>
              <p className="text">Save</p>
            </button>
            <div className="UserRating">
              <span>Your Rating:</span>
              {[...Array(5)].map((_, index) => {
                const ratingValue = (index + 1) * 2;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => handleRating(ratingValue)}
                    />
                    <svg
                      className="star"
                      viewBox="0 0 24 24"
                      fill={ratingValue <= displayedRating ? "#ffc107" : "#e4e5e9"}
                    >
                      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.897l-7.334 3.868 1.4-8.168L.132 9.21l8.2-1.192z" />
                    </svg>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        <div className="novel-description">
          <h2>Synopsis</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NovelDescription;
