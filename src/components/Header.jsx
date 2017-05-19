import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem }
from 'reactstrap';
import { NavLink } from 'react-router-dom';
import '../../public/style.scss';

import user from '../model/User';

/**
 * Class representing a menu
 * @extends Component
 */
export default class Header extends Component {

  /* class constructor */
  constructor(props) {
    super(props);
    this.state = {};
  }


/**
 * Renders component
 * @return {ReactElement}
 * Render the menu deoending on user status
 */
  render() {
    if (user.isLoggedin) {
      return (
        <div className="newsBar">
          <Navbar toggleable>
            <NavbarToggler right />
            <NavbarBrand className="navBrand" href="/">Home</NavbarBrand>
            <Collapse navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink exact activeClassName="active" to="/logout">Logout</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
    return (<div />);
  }
}