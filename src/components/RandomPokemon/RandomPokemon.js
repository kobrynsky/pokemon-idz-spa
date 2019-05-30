import React from "react";
import Bush from '../../assets/bush.png';
import { drawPokemon } from '../../services/pokemonService';
import "./RandomPokemon.css";
import { Media } from 'reactstrap';
import { BASE_URL } from "../../constants";
import axios from 'axios';
import { showPokemonInfo } from '../../services/pokemonService';

export default class RandomPokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonSpriteUrl: Bush,
            clicked: false,
            pokemon: [],
        }
        this.drawPokemon = this.drawPokemon.bind(this);
    }

    drawPokemon = async e => {
        if (!this.state.clicked) {
            let bushId = e.currentTarget.getAttribute("id");
            let pokemon = await drawPokemon();

            let savePokemonDto = {
                pokemonId: pokemon.id,
                userId: localStorage.getItem('id'),
            }
            this.savePokemon(savePokemonDto)
            this.setState({ pokemon: pokemon, clicked: true });
            this.forceUpdate();
            this.changeBushImageSrc(bushId,  pokemon.sprites.front_default);
        }
        else {
            alert("Już losowałeś!")
        }
    }


    savePokemon(savePokemonDto) {
        axios.post(BASE_URL + 'game/savePokemon', savePokemonDto)
            .then(function (response) {
                console.log(response);
                alert("Zapisano Pokemona w bazie!")
            })
            .catch(function (error) {
                console.log(error);
                alert("Błąd podczas zapisywania Pokemona do bazy!");
            });
    }

    changeBushImageSrc(bushId, src){
        document.getElementById(bushId).src = src;
    }

    render() {
        const clicked = this.state.clicked;
        const pokemon = this.state.pokemon;
        let text;

        if (clicked) {
            text = <div className="main-text"  onClick={()=> showPokemonInfo(pokemon)}>Uuuuu! <br></br>Wylosowałeś: {pokemon.name}

            </div>
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