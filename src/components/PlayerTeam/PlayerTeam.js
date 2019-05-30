import React from "react";
import { BASE_URL } from "../../constants";
import axios from 'axios';
import { Table } from 'react-bootstrap'
import "./PlayerTeam.css";
import { getPokemons, showPokemonInfo } from '../../services/pokemonService';

export default class PlayerTeam extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: "",
            pokemons: [],
        }

    }
    async componentDidMount() {
        let userId = localStorage.getItem('id');
        const response = await axios.get(BASE_URL + 'game/getUserTeam/' + userId)
        const pokemondIds = response.data.pokemonIds;
        let pokemons = await getPokemons(pokemondIds);
        this.setState({ pokemons: pokemons, login: response.data.login });

    }

    render() {
        const pokemons = this.state.pokemons;
        return (
            <div>
                {<Table striped bordered hover responsive  className="team-table">
                    <thead>
                        <tr>
                            <th>Pokemon</th>
                            <th>Wygląd</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemons.map(pokemon =>
                            <tr key={pokemon.id} onClick={()=> showPokemonInfo(pokemon)}>
                                <td>{pokemon.name}</td>
                                <td><img src={pokemon.sprites.front_default} alt="pokemon"></img></td>
                            </tr>

                        )}
                    </tbody>
                </Table>}
            </div>

        )
    }
}