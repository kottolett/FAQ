import React, { Component } from 'react';
import { Glyphicon, Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
        <Navbar fixedTop className="navbar navbar-inverse" inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a id="nav-header" href="#">Lunaflick</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav className="nav navbar-right navbar-nav" pullRight>
                    <NavItem eventKey={1} href="#">
                        Handlekurv
                    </NavItem>
                    <NavDropdown eventKey={2} title="Logget inn">
                        <MenuItem eventKey={2.1}>Min side</MenuItem>
                        <MenuItem eventKey={2.2}>Logg ut</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
  }
}