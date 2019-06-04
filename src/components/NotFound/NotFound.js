import React from "react";
import "./NotFound.css";
import PsyDuckImg from '../../assets/psyduck.png';
export default () =>
    <div className="NotFound">
        <h3>Nie znaleziono strony!</h3>
        <img src={PsyDuckImg} alt="psyduck"></img>
    </div>;