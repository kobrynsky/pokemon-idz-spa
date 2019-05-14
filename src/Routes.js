import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import NotFound from "./components/Others/NotFound";
import AppliedRoute from "./components/Others/AppliedRoute";
import HomePage from "./components/HomePage/HomePage";

export default ({ childProps }) =>
    <BrowserRouter>
        <Switch>
            <AppliedRoute path="/" exact component={HomePage} props={childProps} />
            <AppliedRoute path="/login" exact component={Login} props={childProps} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>;