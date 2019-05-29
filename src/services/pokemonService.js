import { POKEMON_API_URL, MAX_POKEMON_ID } from "../constants";
import axios from 'axios';

class Pokemon {
    constructor(id, name, sprites) {
        this.id = id;
        this.name = name;
        this.sprites = sprites;
        this.skills = [];
    }
}

class Skill {
    constructor(name, stat) {
        this.name = name;
        this.stat = stat;
    }
}

async function drawPokemon() {
    let id = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
    let pokemon = getPokemon(id);
    return pokemon;
}

async function getPokemons(ids) {
    let pokemons = []

    ids.forEach(async id => {
        const response = await axios.get(POKEMON_API_URL + id);

        let pokemon = new Pokemon(response.data.id, response.data.name, response.data.sprites);

        response.data.stats.forEach(stat => {
            let skill = new Skill(stat.stat.name, stat.base_stat);
            pokemon.skills.push(skill);
        });

        pokemons.push(pokemon);
    });
    return pokemons;
}

async function getPokemon(id) {
    let pokemon;
    const response = await axios.get(POKEMON_API_URL + id);
    pokemon = new Pokemon(response.data.id, response.data.name, response.data.sprites);
    response.data.stats.forEach(stat => {
        let skill = new Skill(stat.stat.name, stat.base_stat);
        pokemon.skills.push(skill);
    });
    return pokemon;
}

export { getPokemon, drawPokemon, getPokemons }