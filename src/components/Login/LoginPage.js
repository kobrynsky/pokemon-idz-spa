import React, { Component } from "react";
import "./LoginPage.css";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import '../../App.css'
import { BASE_URL } from '../../constants'
import axios from 'axios';
import { Redirect } from 'react-router-dom';


export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.login.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        var accountDto = {
            login: this.state.login,
            password: this.state.password
        }
        console.log(accountDto);
        var self = this;
        axios.post(BASE_URL + 'user/login', accountDto)
            .then(function (response) {
                console.log(response);
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('login', response.data.login);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
                alert("Błąd podczas logowania! Hasło lub login nieprawidłowe!");
                self.setState({ login: "", password: "" })
            });
    }

    render() {
        return (

            localStorage.getItem('id') != null ?
                <Redirect to="/" />
                :
                <div className="LoginPage">
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="login">
                            <FormLabel>Login</FormLabel>
                            <FormControl
                                autoFocus
                                type="login"
                                value={this.state.login}
                                onChange={this.handleChange}
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
                        <Button
                            block
                            disabled={!this.validateForm()}
                            type="submit"
                            variant="light"
                        >
                            Login
            </Button>
                    </form>
                </div>
        );
    }
}