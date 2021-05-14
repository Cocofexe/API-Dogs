import React, { useState } from "react";
import { getDogs } from "../../actions/actions";
import "./SearchBar.css";
import { useDispatch } from "react-redux";

function SearchBar(props) {
  let dispatch = useDispatch();
  const [state, setState] = useState("");
  function handleChange(e) {
    setState(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogs(state));
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="searchBarInput"
          type="text"
          placeholder="Buscata Tu Raza Favorita"
          value={state.state}
          onChange={(e) => handleChange(e)}
        />
        <input className="searchBarButton" type="submit" value="Buscar"></input>
      </form>
    </div>
  );
}

export default SearchBar;
