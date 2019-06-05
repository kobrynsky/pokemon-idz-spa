import React from "react";
import { BASE_URL } from "../../constants";
import axios from 'axios';
import { Table } from 'react-bootstrap'
import "./PlayersTable.css";

export default class PlayersTable extends React.Component {
    constructor() {
        super()
        this.state = {
            data: []
        }

    }
    componentDidMount() {
        var self = this;
        axios.get(BASE_URL + 'user/getAll')
            .then(function (response) {
                console.log(response);
                self.setState({ data: response.data.sort((a, b) => (a.wins < b.wins) ? 1 : ((b.wins < a.wins) ? -1 : 0)) })
            })
            .catch(function (error) {
                console.log(error);
                alert("Błąd pobierania danych!");
            });

    }
    render() {
        return (
            <Table striped bordered hover className="players-table">
                <thead>
                    <tr>
                        <th>Login</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Email</th>
                        <th>Zwycięstwa</th>
                        <th>Porażki</th>
                        <th>Ratio</th>
                    </tr>
                </thead>
                <tbody>{this.state.data.map(function (item, key) {
                    return (
                        <tr key={key}>
                            <td>{item.login}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.wins}</td>
                            <td>{item.loses}</td>
                            <td>{(item.loses === 0) ? 100 : (Math.round(item.wins /(item.loses + item.wins)*100))}%</td>
                        </tr>

                    )

                })}</tbody>
            </Table>

        )
    }
}