import React from "react";
import Bush from '../../assets/bush.png';
import "./RandomPokemon.css";
import {
    Media,
} from 'reactstrap';
import { BASE_URL } from "../../constants";
import axios from 'axios';
import CrossfadeImage from "react-crossfade-image"

export default class RandomPokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonSpriteUrl: Bush,
            name: "",
            clicked: false
        }
        this.drawPokemon = this.drawPokemon.bind(this);
    }

    drawPokemon = e => {
        console.log("no hejka");
        if (!this.state.clicked) {
            let randId = Math.floor(Math.random() * 800) + 1;
            let pokeURL2 = "http://pokeapi.co/api/v2/pokemon/" + randId;
            let bushId = e.currentTarget.getAttribute("id");
            let self = this;
            axios.get(pokeURL2)
                .then(function (response) {
                    console.log(response.data.name);
                    console.log(response.data);
                    console.log(response.data.id);
                    console.log(response.data.sprites.front_default);

                    let savePokemonDto = {

                    }

                    axios.post(BASE_URL + 'game/savePokemon/', savePokemonDto)



                    self.setState({pokemonSpriteUrl: response.data.sprites.front_default, name: response.data.name, clicked: true})
                    document.getElementById(bushId).src = response.data.sprites.front_default;
                    
                })
                .catch(function (error) {
                    console.log(error);
                    alert("Błąd pobierania danych!");
                });
                console.log(this.state.name);
                this.forceUpdate();
        }
        else {
            alert("Już losowałeś!")
        }
    }


    render() {
        const clicked = this.state.clicked;
        const name = this.state.name;
        let text;

        if (clicked) {
            text = <div className="main-text">Uuuuu! <br></br>Wylosowałeś: {name} </div>;
        }
        else {
            text = <div className="main-text">W każdym z trzech krzaczków znajduje się pokemon! <br></br>Wybierz jeden z nich!</div>;
        }
        return (
            <div>
                {text}
                <div className="bushes">
                    <Media id="bush1" className="bush1" src={Bush} alt="bush1" onClick={this.drawPokemon} />
                    <Media id="bush2" className="bush2" src={Bush} alt="bush2" onClick={this.drawPokemon} />
                    <Media id="bush3" className="bush3" src={Bush} alt="bush3" onClick={this.drawPokemon} />
                </div>
            </div>
        )
    }
}