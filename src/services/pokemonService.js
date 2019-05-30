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

    for (let i = 0; i < ids.length; i++) {
        let response = await axios.get(POKEMON_API_URL + ids[i]);
        let pokemon = new Pokemon(response.data.id,
            response.data.name,
            response.data.sprites);

        response.data.stats.forEach(stat => {
            let skill = new Skill(stat.stat.name, stat.base_stat);
            pokemon.skills.push(skill);
        });
        pokemons.push(pokemon);
    }
    let sortedPokemons = pokemons.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    return Array.from(sortedPokemons);

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

function showPokemonInfo(pokemon){
    console.log(pokemon);
    let info = "";
    for (let i = 0; i < pokemon.skills.length; i++) {
        info += pokemon.skills[i].name + ": " + pokemon.skills[i].stat + "\n";
    }

    alert(info);
}


export { getPokemon, drawPokemon, getPokemons, showPokemonInfo }