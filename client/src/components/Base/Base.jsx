import React from "react";
import "./Base.css";
import { Link } from "react-router-dom";

function Base() {
  return (
    <div className="baseDiv">
      <h1 className="textHello">Bienvenidos</h1>
      <h4 className="textPres">
        En esta API podras buscar diferentes razas de perros y crear tus propias
        razas
      </h4>
      <div className="buttonBase">
        <Link to="/home">
          <button className="button">Encuentra tus perros favoritos</button>
        </Link>
      </div>
      <img
        className="gif"
        src="https://i.pinimg.com/originals/cf/6a/ad/cf6aad911ef7cf39a4b79f53081b4a59.gif"
        alt="Perrito Bailando"
      />
    </div>
  );
}

export default Base;
