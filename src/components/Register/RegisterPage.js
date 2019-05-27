import React, { Component } from "react";
import "./RegisterPage.css";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import '../../App.css'
import { BASE_URL } from '../../constants'
import axios from 'axios';


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
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.matchingPassword.length > 0  && this.state.login.length > 0 && this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.password === this.state.matchingPassword;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
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
        axios.post(BASE_URL +'user/register', accountDto)
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
                self.setState({login: "", password: ""})
            });
    }

    render() {
        return (
            <div className="RegisterPage">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="login">
                        <FormLabel>Login</FormLabel>
                        <FormControl
                            value={this.state.login}
                            onChange={this.handleChange}
                            type="login"
                        />
                    </FormGroup>
                    <FormGroup controlId="firstName">
                        <FormLabel>Imię</FormLabel>
                        <FormControl
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            type="firstName"
                        />
                    </FormGroup>
                    <FormGroup controlId="lastName">
                        <FormLabel>Nazwisko</FormLabel>
                        <FormControl
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            type="lastName"
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <FormLabel>Hasło</FormLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup controlId="matchingPassword">
                        <FormLabel>Potwórz hasło</FormLabel>
                        <FormControl
                            value={this.state.matchingPassword}
                            onChange={this.handleChange}
                            type="password"
                        />
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