import './App.css';
import { Route } from "react-router-dom";
import Base  from './components/Base/Base.jsx'
import Home  from './components/Home/Home.jsx'
import NavBar from './components/NavBar/NavBar.jsx';
import NewDog from './components/NewDog/NewDog.jsx';
import Detail from './components/Detail/Detail.jsx'


function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Base}></Route>
      <Route path='/home' component={NavBar}></Route>
      <Route path='/create' component={NavBar}></Route>
      <Route path='/detail/:id' component={NavBar}></Route>
      <Route exact path='/home' component={Home}></Route>
      <Route exact path='/create' component={NewDog}></Route>
      <Route  exact path='/detail/:id' component={Detail}></Route>
    </div>
  );
}

export default App;
