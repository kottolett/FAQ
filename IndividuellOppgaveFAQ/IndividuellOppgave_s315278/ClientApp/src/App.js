import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { NavMenu } from './components/NavMenu';

export default class App extends Component {
    displayName = App.name

  render() {
    return (
        <Layout>
            <Route exact path='/components' component={NavMenu} />
            <Route exact path='/' component={Home} />
        </Layout>
    );
  }
}
