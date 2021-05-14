import React, { useEffect } from "react";
import "./Home.css";
import CardsDogs from "../CardsDogs/CardsDogs.jsx";
import { useDispatch } from "react-redux";
import { getDogs, getTemps } from "../../actions/actions.js";

function Home() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs(""));
    dispatch(getTemps());
  },[]);

  return (
    <div>
      <CardsDogs></CardsDogs>
    </div>
  );
}

export default Home;
