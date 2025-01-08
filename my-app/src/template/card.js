import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, image, title, description, genres }) => {
    console.log(id);
  return (
    <article className="card__article">
      <img src={image} alt="image" className="card__img" />
      <div className="card__data">
        <span className="card__description">{genres.join(" ")}</span>
        <h2 className="card__title">{title}</h2>
        {/* Dynamically create the URL using `id` */}
        <Link to={`/Novelpage/${id}`} className="card__button">Read More</Link>
       
      </div>
    </article>
  );
};

export default Card;
