import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import NotFound from "./components/Others/NotFound";
import HomePage from "./components/HomePage/HomePage";
import RegisterPage from "./components/Register/RegisterPage";
import PlayersTable from "./components/Player/PlayersTable";
import RandomPokemon from "./components/Pokemon/RandomPokemon";

export default () =>
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/login" exact component={LoginPage}/>
            <Route path="/register" exact component={RegisterPage}/>
            <Route path="/players" exact component={PlayersTable}/>
            <Route path="/random-pokemon" exact component={RandomPokemon}/>
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>;