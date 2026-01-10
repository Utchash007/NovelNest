import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { decode } from "../decodeJWT";
import { Del_bookmark } from "../Generic_API/Del_bookmark";
import { Create_bookmark } from "../Generic_API/Create_bookmark";

const NovelDescription = ({ image, title, description, status, author }) => {
  const [isActive, setIsActive] = useState(false);
  const [novelBook, setnovelBook] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingData, setRatingData] = useState();
  const [rate, setRate] = useState([]);
  const [rating, setRating] = useState(0);
  const handleClick = () => {
    setIsActive((prevState) => !prevState); // Toggle the active state
    if (isActive) {
      Del_bookmark(novelBook[0].bookmark_id);
    } else {
      Create_bookmark(user_id, novel_id);
    }
  };

  const { id } = useParams(); // fetching novel_id
  const novel_id = id;
  const user_id = decode(localStorage.getItem("active")).user_id;

  useEffect(() => {
    const url =
      "http://127.0.0.1:8000/api/bookmarks/get_bookmark/?id=" +
      user_id +
      "&novel_id=" +
      novel_id;
    axios
      .get(url)
      .then((response) => {
        setnovelBook(response.data);
        if (response.status === 200) {
          console.log("Hoise");
          setIsActive(true);
        } else if (response.status === 400) {
          console.log("Hoinai");
          setIsActive(false);
        } else {
          console.log("Bal hoise");
        }
      })
      .catch((error) => {
        setIsActive(false);
      });
    //fecthing user rating and avg rating
    const url1 = axios.post("http://127.0.0.1:8000/api/rating/user_rating/", {
      parameter: "1",
      user_id: user_id,
      novel_id: novel_id,
    });
    const url2 = axios.post("http://127.0.0.1:8000/api/rating/user_rating/", {
      parameter: "3",
      user_id: user_id,
      novel_id: novel_id,
    });
    Promise.all([url1, url2])
      .then(([postResponse1, postResponse2]) => {
        setRatingData(postResponse1.data);
        setRate(postResponse2.data);
        console.log("avg rating  " + postResponse2.data[0].average_rating);
        console.log(rate);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [novel_id, user_id]);

  const handleRating = (rating) => {
    setUserRating(rating);
  };
  useEffect(() => {
    console.log("Updated rate:", rate[0]);
    if (rate && rate.length > 0) {
      setRating(rate[0].average_rating);
    }
  }, [rate]);
  useEffect(() => {
    if (ratingData && ratingData.length > 0) {
      setHoverRating(ratingData[0].user_rating);
    } else {
      console.log("ratingData is empty or undefined");
    }
  }, [ratingData]);

  useEffect(() => {
    if (userRating > 0) {
      axios
        .post("http://127.0.0.1:8000/api/rating/user_rating/", {
          parameter: "2",
          user_id: user_id,
          novel_id: novel_id,
          rating: userRating,
        })
        .then((response) => {
          setRatingData(response.data); // Update the state with the fetched data
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [userRating]);

  return (
    <div>
      <div className="novel_container">
        <div className="novel-header">
          <img src={image} alt="Cover Image" />
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
              onClick={handleClick} // Toggle state on click
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
              {[...Array(5)].map((star, index) => {
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
                      fill={
                        ratingValue <= (hoverRating || userRating)
                          ? "#ffc107"
                          : "#e4e5e9"
                      }
                      onMouseEnter={() => setHoverRating(ratingValue)}
                     
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
          <p>{description} </p>
        </div>
      </div>
    </div>
  );
};

export default NovelDescription;
