import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import NotFound from "./components/Others/NotFound";
import AppliedRoute from "./components/Others/AppliedRoute";
import HomePage from "./components/HomePage/HomePage";

export default ({ childProps }) =>
    <BrowserRouter>
        <Switch>
            <AppliedRoute path="/" exact component={HomePage} props={childProps} />
            <AppliedRoute path="/login" exact component={LoginPage} props={childProps} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>;