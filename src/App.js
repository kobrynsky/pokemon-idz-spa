import React from 'react';
import './App.css';
import Menu from "./components/Menu/Menu";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  
  return (
    <div className="App">
      <div className="content">
        <Menu />
        <BrowserRouter>
          <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
      </div>
  </div>
  );
}

export default App;
