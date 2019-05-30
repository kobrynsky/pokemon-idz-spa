import React from 'react';
import "./Menu.css";
import Logo from '../../assets/pokemon_logo.png';
import LoginImg from '../../assets/pokeball.png';
import HomePage from "../HomePage/HomePage";
import { Link } from 'react-router-dom';
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
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    localStorage.clear();
    this.forceUpdate();
  }

  localStorageUpdated(){
    console.log("XD");

}

  render() {
    return (
      <>
        <Navbar className="navbar" color="dark" expand="md">
          <Link exec to='/'>
            <NavbarBrand className="brand">
              <Media className="logo" src={Logo} alt="pokemon_logo" />
              <Label className="logo-label">pokemon idź</Label>
            </NavbarBrand>
          </Link>

          <NavbarToggler />
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="login">
                {localStorage.getItem('id') == null ?
                  <>
                    <Link exec to='/login'>
                      <NavLink className="login-link">logowanie</NavLink>

                    </Link>
                    <Media className="login-img" src={LoginImg} alt="login_image" />
                    <Link exec to='/register'>
                      <NavLink className="register-link">rejestracja</NavLink>

                    </Link>
                  </>
                  :
                  <>
                    <Link exec to='/profile'>
                      <NavLink className="login-name">{localStorage.getItem('login')}</NavLink>

                    </Link>
                    <Media className="login-img" src={LoginImg} alt="login_image" />

                    <Link exec to='/'>
                    <NavLink className="log-out-link" onClick={this.handleLogout}>wyloguj</NavLink>

                    </Link>
                  </>
                }
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </>
    );
  }
}