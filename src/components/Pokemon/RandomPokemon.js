import React from "react";
import Bush from '../../assets/bush.png';
import "./RandomPokemon.css";
import {
    Media,
} from 'reactstrap';

export default class RandomPokemon extends React.Component {

    drawPokemon(){
        console.log("no hejka");
    }


    render() {
        return (
            <div>
                <div className="main-text">W każdym z trzech krzaczków znajduje się pokemon! <br></br>Wybierz jeden z nich!</div>
                <div className="bushes">
                    <Media className="bush1" src={Bush} alt="bush" onClick={this.drawPokemon} />
                    <Media className="bush2" src={Bush} alt="bush" onClick={this.drawPokemon} />
                    <Media className="bush3" src={Bush} alt="bush" onClick={this.drawPokemon} />
                </div>
            </div>
        )
    }
}