import React, { Component } from 'react';
import './App.css';
import Menu from "./components/Menu/Menu";
import 'bootstrap/dist/css/bootstrap.css';
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="content">
          <Menu />
          <Routes />
        </div>
      </div>
    );
  }
}
export default App;
