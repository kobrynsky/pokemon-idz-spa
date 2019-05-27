import React from "react";
import Bush from '../../assets/bush.png';
import "./RandomPokemon.css";
import { Media } from 'reactstrap';
import { BASE_URL, POKEMON_API_URL, MAX_POKEMON_ID } from "../../constants";
import axios from 'axios';

export default class RandomPokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonSpriteUrl: Bush,
            name: "",
            clicked: false,
            stats: [],
        }
        this.drawPokemon = this.drawPokemon.bind(this);
    }

    drawPokemon = e => {
        console.log("no hejka");
        if (!this.state.clicked) {
            let randId = this.drawPokemonId();
            let bushId = e.currentTarget.getAttribute("id");
            let self = this;
            axios.get(POKEMON_API_URL + randId)
                .then(function (response) {
                    console.log(response.data.name);
                    console.log(response.data);
                    console.log(response.data.id);
                    console.log(response.data.sprites.front_default);

                    let savePokemonDto = {
                        pokemonId: response.data.id,
                        userId: localStorage.getItem('id'),
                    }

                    console.log(savePokemonDto);
                    axios.post(BASE_URL + 'game/savePokemon', savePokemonDto)
                        .then(function (response) {
                            console.log(response);
                            alert("Zapisano Pokemona w bazie!")
                        })
                        .catch(function (error) {
                            console.log(error);
                            alert("Błąd podczas zapisywania Pokemona do bazy!");
                        });
                    self.setState({ pokemonSpriteUrl: response.data.sprites.front_default, name: response.data.name, clicked: true, stats: response.data.stats })
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


    drawPokemonId() {
        return Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
    }

    render() {
        const clicked = this.state.clicked;
        const name = this.state.name;
        const stats = this.state.stats;
        let text;

        if (clicked) {
            var textStyle = {
                fontSize: '20px',
            };


            text = <div className="main-text" style={textStyle}>Uuuuu! <br></br>Wylosowałeś: {name} <br></br> Dane: <br></br>
                {stats.map(stat => <li>{stat.stat.name}: {stat.base_stat} </li>)}

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