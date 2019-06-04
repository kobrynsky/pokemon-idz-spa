import React from 'react';
import "./Menu.css";
import Logo from '../../assets/pokemon_logo.png';
import LoginImg from '../../assets/pokeball.png';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
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

  render() {
    return (
      <>
        <Navbar className="navbar" color="dark" expand="md">
          <Link exec to="/" className="brand">
            <Media className="logo" src={Logo} alt="pokemon_logo" />
            <Label className="logo-label">
              pokemon idź
              </Label>
          </Link>
          <NavbarToggler />
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <div className="login">
                {localStorage.getItem('id') == null ?
                  <>
                    <Link className="login-link" exec to='/login'>
                      logowanie
                    </Link>
                    <Media className="login-img" src={LoginImg} alt="login_image" />
                    <Link className="register-link" exec to='/register'>
                      rejestracja
                    </Link>
                  </>
                  :
                  <>
                    <Link to='/user-team' className="login-name">
                      {localStorage.getItem('login')}
                    </Link>
                    <Media className="login-img" src={LoginImg} alt="login_image" />
                    <Link to='/' className="log-out-link" onClick={this.handleLogout}>
                      wyloguj&nbsp;&nbsp;&nbsp;&nbsp;
                    </Link>
                  </>
                }
              </div>
            </Nav>
          </Collapse>
        </Navbar>
      </>
    );
  }
}