import React, { useState, useEffect } from "react";
import "./CardsDogs.css";
import { useSelector } from "react-redux";
import CardDog from "../CardDog/CardDog.jsx";

function CardsDogs() {
  const [filtered, setFiltered] = useState([]);
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(0);
  const [max, setMax] = useState(0);
  const dog = useSelector((state) => state.dog);
  const temps2 = useSelector((state) => state.temps);


  function findAll() 
  {
    setFiltered(0);  
  }

  //Filters
  //Filter my
  let reloaded = [];
  const filterId = () => {
    for (let i = 0; i < dog.length; i++) {
      if (dog[i].id.length > 4) {
        reloaded.push(dog[i]);
      }
    }
    setFiltered(reloaded);
  };
  //Filter Temps
  function handleChange(e) {
    let resp = 0;
    for (let i = 0; i < dog.length; i++) {
      if (dog[i].temperament) {
        resp = dog[i].temperament.indexOf(e.target.value);
        if (resp !== -1) {
          reloaded.push(dog[i]);
        }
      }
    }
    setFiltered(reloaded);
  }
  //Order
  const AZ = (a, b) => {return (a.name > b.name ?  1 : -1)}
  const ZA = (a, b) => {return (b.name > a.name ?  1 : -1)}

  function handleOrder(e) {
    setOrder(e.target.value);
  }
  const heightUp = (a, b) => {
    return b.height1 - a.height1;
  };
  const heightDn = (a, b) => {
    return a.height1 - b.height1;
  };

  useEffect(() => {
    switch (order) {
      case "AZ":
        return setFiltered([...dog].sort(AZ));
      case "ZA":
        return setFiltered([...dog].sort(ZA));
      case "Peso + -":
        return setFiltered([...dog].sort(heightUp));
      case "Peso - +":
        return setFiltered([...dog].sort(heightDn));
      default:
        return dog;
    }
  },[order]);

  //Pagination

  useEffect(() => {
    if (dog && dog.length > 0) {
      setMax(dog && dog.length - 8);
      setPage(0)
    }
    if (filtered && filtered.length > 0) {
      setMax(filtered && filtered.length - 1);
      setPage(0);
    }
  }, [filtered, dog]);

  const nextPage = () => {
    page < max && setPage(page + 8);
  };
  const prevPage = () => {
    page > 0 && setPage(page - 8);
  };

  return (
    <div>
      <div className="cardsDogsFilterGrid">
        <select onChange={handleOrder} className="cardsDogsFilterFilters">
          <option value="">ORIGINAL</option>
          <option value="AZ">AZ</option>
          <option value="ZA">ZA</option>
          <option value="Peso + -">Asc</option>
          <option value="Peso - +">Des</option>
        </select>
        
        <select onChange={handleChange} className="cardsDogsFilterTemps">
          <option value="" disabled selected>
            Temperamentos
          </option>
          {temps2 &&
            temps2.map((tempRes1) => {
              return <option value={tempRes1.name}>{tempRes1.name}</option>;
            })}
        </select>
        
        <button onClick={filterId} className="cardsDogsFilterMyDogs">
          Mis Perros
        </button>

        <button onClick={findAll} className="cardsDogsFilterAllDogs">
          Todos los perros
        </button>

      </div>
      <div className="cardsDogsFlexbox">
        {(filtered.length > 0 ? filtered : dog)
          ?.slice(page, page + 8)
          .map((d) => (
            <CardDog
              id={d.id}
              name={d.name}
              image={d.image}
              temperament={d.temperament}
              className="CardDog"
            />
          ))}
      </div>
      <div className="cardsDogsPaginationGrid">
        <button onClick={prevPage} className="cardsDogsButtonPrev">
          PREV
        </button>
        <button onClick={nextPage} className="cardsDogsButtonNext">
          NEXT
        </button>
      </div>
    </div>
  );
}

export default CardsDogs;
