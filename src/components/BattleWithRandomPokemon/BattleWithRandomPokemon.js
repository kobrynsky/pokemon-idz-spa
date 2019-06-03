import React from "react";
import "./BattleWithRandomPokemon.css";
import { getRandomUserPokemon, getRandomPokemon } from '../../services/pokemonService';

export default class BattleWithRandomPokemon extends React.Component {
    constructor() {
        super()
        this.state = {
        wildPokemon: [],
        userPokemon: [],
        }

    }

    async componentDidMount() {
        let userId = localStorage.getItem('id');
        let userPokemon = await getRandomUserPokemon(userId);
        let wildPokemon = await getRandomPokemon();
        this.setState({ wildPokemon: wildPokemon, userPokemon: userPokemon });

    }



    render() {
        // const pokemonToFightWith = drawPokemon;
        // this.state.pokemonToFightWith = drawPokemon();
        // this.state.pokemonUser = getRandomUserPokemon(2);
        console.log(this.state.userPokemon);
        console.log(this.state.wildPokemon);

        return (
            <div>
                xD
            </div>

        )
    }
}