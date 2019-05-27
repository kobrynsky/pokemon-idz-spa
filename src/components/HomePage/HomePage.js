import React, { Component } from "react";
import "./HomePage.css";
import '../../App.css'

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
                  </>

                }


                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HomePage;