import "./NavBar.css";
import { Route, Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";

function NavBar() {
  return (
    <div className="navBar">
      <Link to="/home" className="navHome">
        <h1>Home</h1>
      </Link>
      <div className="navSearchBar">
        <Route exact path="/home" component={SearchBar}></Route>
      </div>
        <Link to="/create" className="navNewDog">
          <button className="navNewDogButton">Nuevo Perro</button>
        </Link>
      
    </div>
  );
}

export default NavBar;
