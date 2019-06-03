import React, { Component } from "react";
import "./HomePage.css";
import '../../App.css'
import { Link } from "react-router-dom"

class HomePage extends Component {
    render() {
        return (
            <React.Fragment className="home-page">
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
                                <Link to={"/players"} activeClassName="active">Lista graczy</Link>
                                <Link to={"/random-pokemon"} activeClassName="active">Losuj pokemona</Link>
                                <Link to={"/battle-with-random-pokemon"} activeClassName="active">Walcz z dzikim pokemonem</Link>
                            </>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HomePage;