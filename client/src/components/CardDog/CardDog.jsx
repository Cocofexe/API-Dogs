import "./CardDog.css";
import React from "react";

import { Link } from "react-router-dom";

function CardDog({ id, name, temperament, image }) {
  return (
    <Link style={{ textDecoration: "none" }} to={`/detail/${id}`}>
      <div className="cardDogGrid">
        <h1 className="cardDogName">{name}</h1>
        <img className="cardDogImage" src={image} alt="Perros" />
        <h4 className="cardDogTemperament">{temperament}</h4>
      </div>
    </Link>
  );
}

export default CardDog;
