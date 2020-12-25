import React, {useState} from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./views/home/Home";
import All from "./views/all-operations/All";
import Login from "./views/login&Signup/Login";
import "normalize.css";
import "./App.css";
import Background from "./images/background.jpg";

function App() {
  //validar si existe un usuario
  const [user, setUser] = useState(null);
  return (
    <div className="app" styles={{ backgroundImage: `url(${Background})` }}>
        {user?
        <HashRouter>
        <Header user={user}/>
        <Switch>
        <Route exact path="/">
          <Home user={user}/>
        </Route>
        <Route path="/all-operations">
          <All user={user}/>
        </Route>
        </Switch>
        </HashRouter>
        :
        <HashRouter>
        <Switch>
          <Route path="/">
          <Login validate={(item)=> setUser(item)}/>
          </Route>
        </Switch>
        </HashRouter>
      }
    </div>
  );
}

export default App;
