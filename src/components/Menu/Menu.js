import React from 'react';
import "./Menu.css";
import Logo from '../../assets/pokemon_logo.png';
import LoginImg from '../../assets/pokeball.png';
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

  handleLogout() {
    localStorage.clear();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar className="navbar" color="dark" expand="md">
          <NavbarBrand className="brand" href="/">
            <Media className="logo" src={Logo} alt="pokemon_logo" />
            <Label className="logo-label">pokemon idź</Label>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="login">
                {localStorage.getItem('id') == null ?
                  <>
                    <NavLink className="login-link" href="/login" onClick={this.openLoginModal}>logowanie</NavLink>
                    <Media className="login-img" src={LoginImg} alt="login_image" />
                    <NavLink className="register-link" href="/register">rejestracja</NavLink>
                  </>
                  :
                  <>
                    <NavLink className="login-name" href="/profile">{localStorage.getItem('login')}</NavLink>
                    <Media className="login-img" src={LoginImg} alt="login_image" />
                    <NavLink className="log-out-link" href="/" onClick={this.handleLogout}>wyloguj</NavLink>
                  </>

                }

              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}