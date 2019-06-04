import React, { Component } from "react";
import "./RegisterPage.css";
import { Button, FormGroup, FormControl, FormCheck } from "react-bootstrap";
import '../../App.css'
import { BASE_URL } from '../../constants'
import axios from 'axios';
import RODO from '../../assets/rodo.pdf';
import regulations from '../../assets/regulamin.pdf';



export default class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            login: "",
            firstName: "",
            lastName: "",
            password: "",
            matchingPassword: "",
            accept: false,
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 &&
            this.state.matchingPassword.length > 0 && this.state.login.length > 0 &&
            this.state.firstName.length > 0 && this.state.lastName.length > 0 &&
            this.state.password === this.state.matchingPassword && this.state.accept;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleCheckBoxChange = () => {
        this.setState({
            accept: !this.state.accept,
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        var accountDto = {
            email: this.state.email,
            login: this.state.login,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            matchingPassword: this.state.matchingPassword
        }
        console.log(accountDto);
        var self = this;
        axios.post(BASE_URL + 'user/register', accountDto)
            .then(function (response) {
                console.log(response);
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('login', response.data.login);
                self.props.history.push('/')
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
                alert("Błąd podczas rejestracji!");
                self.setState({ login: "", password: "" })
            });
    }

    render() {
        return (
            <div className="RegisterPage">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email">
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="email"
                        />
                    </FormGroup>
                    <FormGroup controlId="login">
                        <FormControl
                            value={this.state.login}
                            onChange={this.handleChange}
                            type="login"
                            placeholder="login"
                        />
                    </FormGroup>
                    <FormGroup controlId="firstName">
                        <FormControl
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            type="firstName"
                            placeholder="imię"
                        />
                    </FormGroup>
                    <FormGroup controlId="lastName">
                        <FormControl
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            type="lastName"
                            placeholder="nazwisko"
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                            placeholder="hasło"
                        />
                    </FormGroup>
                    <FormGroup controlId="matchingPassword">
                        <FormControl
                            value={this.state.matchingPassword}
                            onChange={this.handleChange}
                            type="password"
                            placeholder="powtórz hasło"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label className="regulations-label">
                            <input controlId="accept" className="checkBoxAccept" onChange={this.handleCheckBoxChange} value={this.state.accept} type="checkbox" />
                            Akceptuję   politykę prywatności RODO
                        <a href={regulations} target='_blank'> regulamin </a>
                            i
                        <a href={RODO} target='_blank'> politykę prywatności RODO</a>
                        </label>
                    </FormGroup>
                    <Button
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                        variant="light"
                    >
                        Zarejestruj
            </Button>
                </form>
            </div>
        );
    }
}