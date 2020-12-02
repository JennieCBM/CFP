import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./views/home/Home";
import All from "./views/all-operations/All";
import "normalize.css";
import "./App.css";
import Background from "./images/background.jpg";

function App() {
  return (
    <div className="app" styles={{ backgroundImage: `url(${Background})` }}>
      <HashRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/all-operations" component={All} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
