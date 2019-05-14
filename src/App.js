import React from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from "./components/Menu";
import HomePage from "./components/HomePage";
import LoginFormContainer from "./containers/LoginFormContainer";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className="App">
    <Menu />
    <div className="content">
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
