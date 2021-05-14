import React, { useState, useEffect } from "react";
//import './Home.css';
import axios from "axios";
import { getTemps } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import "./NewDog.css";

function NewDog() {
  const temps1 = useSelector((state) => state.temps);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemps());
  }, []);

  const [input, setInput] = useState({
    name: "",
    weight: "",
    height: "",
    years: "",
  });

  const [temp, setTemp] = useState({
    temperament: [],
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange2 = function (e) {
    if (temp.temperament.indexOf(e.target.value) === -1) {
      setTemp({
        ...temp,
        temperament: temp.temperament.concat(e.target.value),
      });
    }
  };
  async function handleSubmit() {
    let end = { ...input, ...temp };
    alert("Perro Creado")
    await axios({
      method: "post",
      url: "http://localhost:3001/dogs",
      data: { end },
    }
    );
  }

  return (
    <div>
      
      <form className='newDogGrid' onSubmit={handleSubmit} action='http://localhost:3000/home'>
      <div className='newDogBackground'>
        <h2 className="newDogNameTitle">Nombre</h2>
        <input
          name="name"
          type="text"
          placeholder="Nombre de Raza"
          onChange={handleInputChange}
          required
          className="newDogName"
        />
        <h2 className="newDogWeightTitle">Peso</h2>
        <input
          className="newDogWeight"
          name="weight"
          type="text"
          placeholder="Peso"
          onChange={handleInputChange}
          required
        />
        <h2 className="newDogHeightTitle">Altura</h2>
        <input
          className="newDogHeight"
          name="height"
          type="text"
          placeholder="Altura"
          onChange={handleInputChange}
          required
        />
        <h2 className="newDogYearsTitle">Años De Vida</h2>
        <input
          className="newDogYears"
          name="years"
          type="text"
          placeholder="Años de vida"
          required
          onChange={handleInputChange}
        />
        <h2 className="newDogTemperamentTitle">Temperamentos</h2>
        <select name="temperament" onChange={handleInputChange2} required multiple
        className="newDogTemperament">
          {temps1 &&
            temps1.map((tempRes) => {
              return <option value={tempRes.name}>{tempRes.name}</option>;
            })}
        </select>
        <input type="submit" value="Enviar" className="newDogSend"/>
        </div>
      </form>
    </div>
  );
}

export default NewDog;
