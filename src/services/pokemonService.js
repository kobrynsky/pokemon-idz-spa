import { POKEMON_API_URL, MAX_POKEMON_ID, BASE_URL } from "../constants";
import axios from 'axios';

class Pokemon {
    constructor(id, name, sprites) {
        this.id = id;
        this.name = name;
        this.sprites = sprites;
        this.skills = [];
        this.abilities = [];
    }
}

class Skill {
    constructor(name, stat) {
        this.name = name;
        this.stat = stat;
    }
}

class Ability {
    constructor(name, power) {
        this.name = name;
        this.power = power;
    }
}

async function getRandomPokemon() {
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
    let sortedPokemons = pokemons.sort(function (a, b) {
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

    pokemon.abilities = await getPokemonAbilities(response.data);
    return pokemon;
}

async function getRandomUserPokemon(id) {
    const response = await axios.get(BASE_URL + 'game/getUserTeam/' + id)
    const pokemondIds = response.data.pokemonIds;
    var randId = pokemondIds[Math.floor(Math.random() * pokemondIds.length)];
    let pokemon = await getPokemon(randId);
    return pokemon;
}

function getPokemonInfo(pokemon) {
    let info = "";
    for (let i = 0; i < pokemon.skills.length; i++) {
        info += pokemon.skills[i].name + ": " + pokemon.skills[i].stat + "\n";
    }

    alert(info);
}

async function getPokemonAbilities(pokemon) {
    let moves = getRandomFromArray(pokemon.moves, 4);
    let abilities = [];

    for (let i = 0; i < moves.length; i++) {
        let response = await axios.get(moves[i].move.url)
        if (response.data.power === null) response.data.power += pokemon.stats[3].base_stat;
        let ability = new Ability(moves[i].move.name, response.data.power);
        abilities.push(ability);
    }
    return abilities;
}


function getRandomFromArray(array, howMany) {
    let rands = [];
    for (let i = 0; i < howMany; i++) {
        let rand = array[Math.floor(Math.random() * array.length)];
        rands.push(rand);
    }
    return rands;
}


export { getPokemon, getRandomPokemon, getPokemons, getPokemonInfo, getRandomUserPokemon, getRandomFromArray }