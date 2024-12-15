import React from "react";
import Novelpage from "../Layout/Novelpage";
import { Link } from "react-router-dom";  
const Card = ({ image, title, description, genres }) => {
  return (
    <article className="card__article">
      <img src={image} alt="image" className="card__img" />
      <div className="card__data">
        <span className="card__description">{genres.join(" ")}</span>
        <h2 className="card__title">{title}</h2>
        <Link to="/Novelpage" className="card__button" >Read More</Link>
       
      </div>
    </article>
  );
};

export default Card;
