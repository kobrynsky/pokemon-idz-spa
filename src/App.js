import React, { Component } from 'react';
import './App.css';
import Menu from "./components/Menu/Menu";
import HomePage from "./components/HomePage/HomePage";
import AppliedRoute from "./components/Others/AppliedRoute";
import NotFound from "./components/Others/NotFound";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Routes from "./Routes";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      id: 0,
      email: "",
      login: "",
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      userId: this.id,
      userEmail: this.email,
      userLogin: this.login
    };

    return (
      <div className="App">
        <div className="content">
          <Menu props={childProps} />
          <Routes childProps={childProps} />
        </div>
      </div>
    );
  }

}

export default App;
