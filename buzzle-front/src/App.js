import React from 'react';
import { connect } from 'react-redux';
import {
  Switch,
  Route
} from "react-router";

import { loadUser } from './actions/user.js';

import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import HomePage from './pages/HomePage.js';

class App extends React.Component {
    componentDidMount() {
        this.props.loadUser();
    }

    render() {
        return (
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/register">
                    <RegisterPage />
                </Route>
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    'loadUser': () => dispatch(loadUser())
});

export default connect(
    null,
    mapDispatchToProps
)(App);
