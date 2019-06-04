import React from "react";
import { BASE_URL } from "../../constants";
import axios from 'axios';
import { Table } from 'react-bootstrap'
import "./PlayerTeam.css";
import { getPokemons, getPokemonInfo } from '../../services/pokemonService';

export default class PlayerTeam extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: "",
            pokemons: [],
            mainPokemonId: null,
        }

    }
    async componentDidMount() {
        let userId = localStorage.getItem('id');
        const response = await axios.get(BASE_URL + 'game/getUserTeam/' + userId)
        const pokemondIds = response.data.pokemonIds;
        let pokemons = await getPokemons(pokemondIds);
        this.setState({ pokemons: pokemons, login: response.data.login });

    }

    async deletePokemon(pokemon)
    {
        let self = this;
        let pokemons = this.state.pokemons;
        let deletePokemonDto = {
            pokemonId: pokemon.id,
            userId: localStorage.getItem('id'),
        }

        await axios.delete(BASE_URL + 'game/deletePokemon', {data: deletePokemonDto})
            .then(function (response) {
                // alert("Usunięto Pokemona z bazy!")

                for( var i = 0; i < pokemons.length; i++){ 
                    if ( pokemons[i].id === pokemon.id) {
                        pokemons.splice(i, 1); 
                    }
                 }
                 self.setState({ pokemons: pokemons });
                 self.forceUpdate();


            })
            .catch(function (error) {
                console.log(error);
                alert("Błąd podczas usuwania Pokemona do bazy!");
            });
            console.log(this.state.pokemons)
    }

    async setMainPokemon(pokemon)
    {
        let self = this;
        let saveMainPokemonDto = {            
            userId: localStorage.getItem('id'),
            mainPokemonId: pokemon.id,
        }
        console.log(saveMainPokemonDto)

        await axios.post(BASE_URL + 'game/saveMainPokemon', saveMainPokemonDto)
            .then(function (response) {
                // alert("Zapisano głównego pokemona z bazy!")
                 self.setState({ mainPokemonId: pokemon.id });
                 self.forceUpdate();


            })
            .catch(function (error) {
                console.log(error);
                alert("Błąd podczas zapisywania Pokemona do bazy!");
            });
            console.log(this.state.pokemons)
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
                            <th>Główny</th>
                            <th>Usuń</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemons.map(pokemon =>
                            <tr key={pokemon.id}>                                
                                <td onClick={()=> getPokemonInfo(pokemon)}>{pokemon.name}</td>
                                <td onClick={()=> getPokemonInfo(pokemon)}><img src={pokemon.sprites.front_default} alt="pokemon"></img></td>
                                <td onClick={()=> this.setMainPokemon(pokemon)}> {pokemon.id===this.state.mainPokemonId ? "V" : ""}</td>
                                <td onClick={()=> this.deletePokemon(pokemon)}>X</td>                          
                            </tr>

                        )}
                    </tbody>
                </Table>}
            </div>

        )
    }
}