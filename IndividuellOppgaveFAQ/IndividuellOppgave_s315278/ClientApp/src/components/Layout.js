import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { Home } from './Home';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  displayName = Layout.name

  render() {
      return (
          <Grid>
            <NavMenu />
            <Home />
          </Grid>
    );
  }
}
