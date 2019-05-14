import React, { Component } from "react";
import PokemonHome from '../assets/pokemon_home2.png';
import { Media } from 'reactstrap';

import "./HomePage.css";
import '../App.css'

class HomePage extends Component {
    render() {
        return (
            <React.Fragment className="home-page">
                {/* <Media className="pokemon-home" src={PokemonHome} alt="pokemon_logo" /> */}
                <div className="welcome-text-wrapper">
                    <div className="welcome-text">
                        Żądny przygód?
                        <br></br>
                        Zaloguj się aby kontynuować!
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HomePage;