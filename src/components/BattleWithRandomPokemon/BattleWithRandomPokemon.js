import React from "react";
import "./BattleWithRandomPokemon.css";
import { getRandomUserPokemon, getRandomPokemon, getRandomFromArray } from '../../services/pokemonService';
import { Media } from 'reactstrap';
import { BASE_URL } from "../../constants";
import axios from "axios";


export default class BattleWithRandomPokemon extends React.Component {
    constructor() {
        super()
        this.state = {
            loaded: false,
            wildPokemon: [],
            userPokemon: [],
            won: false,
        }

    }

    async componentDidMount() {
        let userId = localStorage.getItem('id');
        let userPokemon = await getRandomUserPokemon(userId);
        let wildPokemon = await getRandomPokemon();
        this.setState({ wildPokemon: wildPokemon, userPokemon: userPokemon, loaded: true });
    }


    async userPokemonAttack(ability) {
        let { userPokemon, wildPokemon } = this.state;
        await this.sleep(2000);
        this.setState({ wildPokemon: wildPokemon });
        let damage = this.makeDamageToPokemon(ability, wildPokemon);
        let text = "[GRACZ] Pokemon " + userPokemon.name + " użył " + ability.name + " i zadał " + damage + " obrażeń\n";
        this.addText(text);

        let end = await this.checkGameStatus(wildPokemon, userPokemon);
        this.setState({ wildPokemon: wildPokemon, userPokemon: userPokemon });
        if(!end){
            await this.sleep(2000);

            let wildPokemonAbility = getRandomFromArray(wildPokemon.abilities, 1)[0];            
            let damage2 = this.makeDamageToPokemon(wildPokemonAbility, userPokemon);
            let text2 = "[KOMPUTER] Pokemon " + wildPokemon.name + " użył " + wildPokemonAbility.name + " i zadał " + damage2 + " obrażeń\n";
            await this.addText(text2);
            
            end = this.checkGameStatus(wildPokemon, userPokemon);
            this.setState({ wildPokemon: wildPokemon, userPokemon: userPokemon });

            if(!end){
                if(this.state.won){
                    alert("Wygrałeś!")
                }
                else{
                    alert("Przegrałeś!");
                }
    
                this.props.history.push('/')  
            }
        }
        else {

            if(this.state.won){
                alert("Wygrałeś!")
            }
            else{
                alert("Przegrałeś!");
            }

            this.props.history.push('/')
            
        }
    }
        

    async checkGameStatus(wildPokemon, userPokemon) {
        if (wildPokemon.skills[5].stat <= 0 || userPokemon.skills[5].stat <= 0) {
            let won;
            if (userPokemon.skills[5].stat <= 0) {
                won = false;
            }
            else {
                won = true;
            }

            let saveBattleResultDto = {
                userId: localStorage.getItem('id'),
                won: won,
            }


            await axios.post(BASE_URL + 'game/battle', saveBattleResultDto)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
                alert("Błąd podczas zapisywania wyniku do bazy!");
            });
            this.state.won = won;
            return true;
        }
        return false;
    }

    makeDamageToPokemon(ability, pokemon) {
        let damage = ability.power - Math.round((pokemon.skills[3].stat / 1.8));
        if (damage < 0) damage = 0;
        pokemon.skills[5].stat -= damage;
        return damage;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async addText(text) {
        let textArea = await document.getElementById('game-history');
        console.log(textArea);

        let oldText = textArea.value;
        textArea.value = text;
        textArea.value += oldText;
    }

    render() {
        let { userPokemon, wildPokemon} = this.state;

        return (
            this.state.loaded ? (
                <div className="container">
                    <div className="battle-space">
                        <div className="player-space">
                            <div>
                                <Media id="player-pokemon-sprite" className="player-pokemon-sprite" src={userPokemon.sprites.back_default} alt="player-pokemon-sprite" />
                                {userPokemon.name}
                            </div>

                            <div>
                                <table>
                                    <tr>
                                        <td onClick={() => this.userPokemonAttack(userPokemon.abilities[0])} >{userPokemon.abilities[0].name} : {userPokemon.abilities[0].power}</td>
                                        <td onClick={() => this.userPokemonAttack(userPokemon.abilities[1])} >{userPokemon.abilities[1].name} : {userPokemon.abilities[1].power}</td>
                                    </tr>
                                    <tr>
                                        <td onClick={() => this.userPokemonAttack(userPokemon.abilities[2])} >{userPokemon.abilities[2].name} : {userPokemon.abilities[2].power}</td>
                                        <td onClick={() => this.userPokemonAttack(userPokemon.abilities[3])} >{userPokemon.abilities[3].name} : {userPokemon.abilities[3].power}</td>
                                    </tr>
                                    <tr>
                                        <td>{userPokemon.skills[4].name} : {userPokemon.skills[4].stat}</td>
                                        <td>{userPokemon.skills[3].name} : {userPokemon.skills[3].stat}</td>
                                    </tr>
                                    <tr>
                                        <td>{userPokemon.skills[5].name} : {userPokemon.skills[5].stat}</td>
                                    </tr>
                                </table>
                            </div>

                        </div>
                        <div className="wild-pokemon-space">
                            <div>

                                <Media id="wild-pokemon-sprite" className="wild-pokemon-sprite" src={wildPokemon.sprites.front_default} alt="wild-pokemon-sprite" />
                                {wildPokemon.name}
                            </div>
                            <div>
                                <table>
                                    <tr>
                                        <td>{wildPokemon.abilities[0].name} : {wildPokemon.abilities[0].power}</td>
                                        <td>{wildPokemon.abilities[1].name} : {wildPokemon.abilities[1].power}</td>
                                    </tr>
                                    <tr>
                                        <td>{wildPokemon.abilities[2].name} : {wildPokemon.abilities[2].power}</td>
                                        <td>{wildPokemon.abilities[3].name} : {wildPokemon.abilities[3].power}</td>
                                    </tr>
                                    <tr>
                                        <td>{wildPokemon.skills[4].name} : {wildPokemon.skills[4].stat}</td>
                                        <td>{wildPokemon.skills[3].name} : {wildPokemon.skills[3].stat}</td>
                                    </tr>
                                    <tr>
                                        <td>{wildPokemon.skills[5].name} : {wildPokemon.skills[5].stat}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="game-history-div">
                        <textarea id="game-history" className="game-history" placeholder="Poprzednie ruchy...">
                        </textarea>
                    </div>
                </div>
            )
                :
                <h1 className="loading">Ładowanie...</h1>
        )
    }
}