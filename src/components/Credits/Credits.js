import React, { Component } from "react";
import '../../App.css'
import "./Credits.css";

class Credits extends Component {
    render() {
        return (
            <div className="home-page">
                <div className="welcome-text-wrapper">
                    <div className="welcome-text">
                        <p>Projekt z Inż. e-syst.-techn. JAVA</p>
                        <p>Prowadzący: <br></br>dr inż. Tomasz Walkowiak</p>
                        <p>Autorzy: <br></br>Paweł Kobryński  <br></br>Kacper Białecki</p>                        
                    </div>
                </div>
            </div>
        )
    }
}


export default Credits;