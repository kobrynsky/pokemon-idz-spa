import React from 'react';
import './App.css';
import Menu from "./components/Menu";
import HomePage from "./components/HomePage";
import LoginFormContainer from "./containers/LoginFormContainer";
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
              <Route path="/login" component={LoginFormContainer} />
            </Switch>
        </BrowserRouter>
      </div>
  </div>
  );
}

export default App;
