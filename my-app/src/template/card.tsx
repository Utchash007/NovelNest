import React from "react";
import { Link } from "react-router-dom";
import { handleImgError } from "../utils";

interface CardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  genres: string[];
}

const Card: React.FC<CardProps> = ({ id, image, title, description, genres }) => {
  return (
    <article className="card__article">
      <img
        src={image}
        alt={title}
        className="card__img"
        data-novel-id={id}
        onError={handleImgError}
      />
      <div className="card__data">
        <span className="card__description">{genres.join(" ")}</span>
        <h2 className="card__title">{title}</h2>
        <Link to={`/novel/${id}`} className="card__button">Read More</Link>
      </div>
    </article>
  );
};

export default Card;
