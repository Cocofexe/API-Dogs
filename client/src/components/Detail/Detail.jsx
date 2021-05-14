import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Detail.css";
import { getDetails } from "../../actions/actions";

function Detail(props) {
  let dispatch = useDispatch();
  let id = props.match.params.id;
  useEffect(() => {
    dispatch(getDetails(id));
  }, []);

  const detail = useSelector((state) => state.detail);
  return (
    <div className="detailGrid">
      <h1 className="detailName">{detail?.name}</h1>
      <img
        className="detailImage"
        src={detail?.image}
        alt={`Imagen de raza de perro ${detail?.name}`}
      />
      <div className="detailTextGrid">
        <p className="detailTemperament">{detail?.temperament}</p>
        <p className="detailYears">Años de vida: {detail?.years}</p>
        <p className="detailHeight">Peso: {detail?.height}</p>
        <p className="detailWeight">Altura: {detail?.weight}</p>
      </div>
    </div>
  );
}

export default Detail;
