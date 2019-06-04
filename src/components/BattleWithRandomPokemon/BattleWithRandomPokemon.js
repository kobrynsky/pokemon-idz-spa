import React from "react";
import "./BattleWithRandomPokemon.css";
import { getUserMainPokemon, getRandomPokemon, getRandomFromArray } from '../../services/pokemonService';
import { Media } from 'reactstrap';
import { BASE_URL } from "../../constants";
import axios from "axios";
import { Table } from 'react-bootstrap'


export default class BattleWithRandomPokemon extends React.Component {
    constructor() {
        super()
        this.state = {
            loaded: false,
            wildPokemon: [],
            userPokemon: [],
            won: false,
            clicked: false,
        }

    }

    async componentDidMount() {
        let userId = localStorage.getItem('id');
        let userPokemon = await getUserMainPokemon(userId);
        if (userPokemon == null) {
            alert("Nie masz żadnych pokemonów lub nie wybrałeś głównego!");
            this.props.history.push('/')
        }
        else {
            let wildPokemon = await getRandomPokemon();
            this.setState({ wildPokemon: wildPokemon, userPokemon: userPokemon, loaded: true });
        }

    }


    async userPokemonAttack(ability) {
        if (!this.state.clicked) {
            this.state.clicked = true;
            let { userPokemon, wildPokemon } = this.state;
            await this.sleep(2000);
            this.setState({ wildPokemon: wildPokemon });
            let damage = this.makeDamageToPokemon(userPokemon, wildPokemon, ability);
            document.getElementById('player-pokemon-sprite').style.animationPlayState = 'running';
            let text = "[GRACZ] Pokemon " + userPokemon.name + " użył " + ability.name + " i zadał " + damage + " obrażeń\n";
            this.addText(text);
            document.getElementById('player-pokemon-sprite').style.animationPlayState = 'paused';

            let end = await this.checkGameStatus(wildPokemon, userPokemon);
            this.setState({ wildPokemon: wildPokemon, userPokemon: userPokemon });
            if (!end) {
                await this.sleep(1000);

                let wildPokemonAbility = getRandomFromArray(wildPokemon.abilities, 1)[0];
                let damage2 = await this.makeDamageToPokemon(wildPokemon, userPokemon, wildPokemonAbility);
                document.getElementById('wild-pokemon-sprite').style.animationPlayState = 'running';
                let text2 = "[KOMPUTER] Pokemon " + wildPokemon.name + " użył " + wildPokemonAbility.name + " i zadał " + damage2 + " obrażeń\n";
                this.addText(text2);
                document.getElementById('wild-pokemon-sprite').style.animationPlayState = 'paused';
                console.log(userPokemon);
                end = await this.checkGameStatus(wildPokemon, userPokemon);
                await this.sleep(1000);
                console.log(end);

                this.setState({ wildPokemon: wildPokemon, userPokemon: userPokemon });

                if (end) {
                    if (this.state.won) {
                        let text = "[GRACZ] Wygrał\n";
                        await this.addText(text);
                        // alert("Wygrałeś!")
                    }
                    else {
                        let text = "[KOMPUTER] Wygrał\n";
                        await this.addText(text);
                        // alert("Przegrałeś!");
                    }
                    await this.sleep(5000);
                    this.props.history.push('/')
                }
            }
            else {

                if (this.state.won) {
                    let text = "[GRACZ] Wygrał\n";
                    await this.addText(text);
                    // alert("Wygrałeś!")
                }
                else {
                    let text = "[KOMPUTER] Wygrał\n";
                    await this.addText(text);
                    // alert("Przegrałeś!");
                }
                await this.sleep(5000);
                this.props.history.push('/')
            }
            this.state.clicked = false;
        }
        else {
            alert("Poczekaj na ruch przeciwnika!")
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

    makeDamageToPokemon(attackerPokemon, attackedPokemon, ability) {
        let attackerAttack = attackerPokemon.skills[4].stat;
        let damage = ability.power - Math.round((attackedPokemon.skills[3].stat)) + attackerAttack;
        if (damage < 0) damage = 0;
        attackedPokemon.skills[5].stat -= damage;
        return damage;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async addText(text) {
        let textArea = await document.getElementById('game-history');
        let oldText = textArea.value;
        textArea.value = text;
        textArea.value += oldText;
    }

    render() {
        let { userPokemon, wildPokemon } = this.state;

        return (
            this.state.loaded ? (
                <div className="container">
                    <div className="battle-space">
                        <div className="player-space">
                            <div className="sprite-name-pokemon-div">
                                <img id="player-pokemon-sprite" className="player-pokemon-sprite" src={userPokemon.sprites.front_default} alt="player-pokemon-sprite" />
                                {userPokemon.name}
                            </div>

                            <div>
                                <Table striped bordered hove>
                                    <tbody>
                                        <tr className="abilities">
                                            <td onClick={() => this.userPokemonAttack(userPokemon.abilities[0])} >{userPokemon.abilities[0].name}: {userPokemon.abilities[0].power}</td>
                                            <td onClick={() => this.userPokemonAttack(userPokemon.abilities[1])} >{userPokemon.abilities[1].name}: {userPokemon.abilities[1].power}</td>
                                        </tr>
                                        <tr className="abilities">
                                            <td onClick={() => this.userPokemonAttack(userPokemon.abilities[2])} >{userPokemon.abilities[2].name}: {userPokemon.abilities[2].power}</td>
                                            <td onClick={() => this.userPokemonAttack(userPokemon.abilities[3])} >{userPokemon.abilities[3].name}: {userPokemon.abilities[3].power}</td>
                                        </tr>
                                        <tr className="skills">
                                            <td className="attack">{userPokemon.skills[4].name}: {userPokemon.skills[4].stat}</td>
                                            <td className="defence">{userPokemon.skills[3].name}: {userPokemon.skills[3].stat}</td>
                                        </tr>
                                        <tr>
                                            <td className="hp">{userPokemon.skills[5].name}: {userPokemon.skills[5].stat}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>

                        </div>
                        <div className="wild-pokemon-space">
                            <div className="sprite-name-pokemon-div">
                                <img id="wild-pokemon-sprite" className="wild-pokemon-sprite" src={wildPokemon.sprites.front_default} alt="wild-pokemon-sprite" />
                                {wildPokemon.name}
                            </div>
                            <div>
                                <Table striped bordered hove>
                                    <tbody>
                                        <tr className="abilities">
                                            <td>{wildPokemon.abilities[0].name}: {wildPokemon.abilities[0].power}</td>
                                            <td>{wildPokemon.abilities[1].name}: {wildPokemon.abilities[1].power}</td>
                                        </tr>
                                        <tr className="abilities">
                                            <td>{wildPokemon.abilities[2].name}: {wildPokemon.abilities[2].power}</td>
                                            <td>{wildPokemon.abilities[3].name}: {wildPokemon.abilities[3].power}</td>
                                        </tr>
                                        <tr className="skills">
                                            <td className="attack">{wildPokemon.skills[4].name}: {wildPokemon.skills[4].stat}</td>
                                            <td className="defence">{wildPokemon.skills[3].name}: {wildPokemon.skills[3].stat}</td>
                                        </tr>
                                        <td className="hp">{wildPokemon.skills[5].name}: {wildPokemon.skills[5].stat}</td>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className="game-history-div">
                        <textarea disabled id="game-history" className="game-history" placeholder="Poprzednie ruchy...">
                        </textarea>
                    </div>
                </div>
            )
                :
                <h1 className="loading">Ładowanie...</h1>
        )
    }
}