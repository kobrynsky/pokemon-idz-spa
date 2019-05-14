import React from 'react';
import "./Menu.css";
import Logo from '../assets/pokemon_logo.png';
import LoginImg from '../assets/pokeball.png';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Media,
  Label
 } from 'reactstrap';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar className="navbar" color="dark" light expand="md">
          <NavbarBrand className="brand" href="/">
            <Media className="logo" src={Logo} alt="pokemon_logo" />
            <Label className="logo-label">pokemon idź</Label>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="login">
                <NavLink className="login-link" href="/login/">login</NavLink>
                <Media className="login-img" src={LoginImg}  alt="login_image" />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}