import React from "react";
import Bush from '../../assets/bush.png';
import "./Profile.css";
import axios from 'axios';
import { BASE_URL } from "../../constants";
import {
    Media,
} from 'reactstrap';

export default class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [{
                id: "",
                firstName: "",
                lastName: "",
                login: "",
                email: "",
                wins: 0,
                loses: 0
            }]
        }

    }
    componentWillMount() {
        const self = this;
        const userId = localStorage.getItem('id');
        axios.get(BASE_URL + 'user/' + userId)
            .then(function (response) {
                console.log(response);
                self.setState({ data: response.data });
            })
            .catch(function (error) {
                console.log(error);
                alert("Błąd pobierania danych!");
            });

    }
    render() {
        return (
            <div>
                <div className="main-text">{this.data.firstName + " " + this.data.login + " " + this.data.lastName}! <br></br>Wybierz jeden z nich!</div>
                <div className="bushes">
                    <Media className="bush1" src={Bush} alt="bush" onClick={this.drawPokemon} />
                    <Media className="bush2" src={Bush} alt="bush" onClick={this.drawPokemon} />
                    <Media className="bush3" src={Bush} alt="bush" onClick={this.drawPokemon} />
                </div>
            </div>
        )
    }
}