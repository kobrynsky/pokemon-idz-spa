import React, { Component } from "react";
import "./HomePage.css";
import '../../App.css'
import { Link } from "react-router-dom"

class HomePage extends Component {
    render() {
        return (
            <div className="home-page">
                <div className="welcome-text-wrapper">
                    <div className="welcome-text">
                        {localStorage.getItem('id') == null ?
                            <>
                                Żądny przygód?
                        <br></br>
                                Zaloguj się aby kontynuować!
                  </>
                            :
                            <>
                                Witaj graczu!
                                Co dalej?
                                <Link to={"/players"}>Lista graczy</Link>
                                <Link to={"/random-pokemon"}>Losuj pokemona</Link>
                                <Link to={"/battle-with-random-pokemon"}>Walcz z dzikim pokemonem</Link>
                                <Link to={"/credits"}>O grze</Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;