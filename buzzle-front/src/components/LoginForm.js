import React from 'react';
import { Redirect } from "react-router";

class LoginForm extends React.Component {
    componentWillUnmount() {
        this.props.unloadLoginForm();
        this.props.clearError();
    }

    handleChange = event => {
        this.props.updateLoginForm(event.target.name, event.target.value);
    }

    handleSubmit = event => {
        event.preventDefault();

        this.props.loginUser({
            'login': this.props.login,
            'password': this.props.password
        });
    }

    render() {
        const user = this.props.user;
        const login = this.props.login;
        const password = this.props.password;

        return (user ?
            <Redirect to="/" />
            :
            <div className="row justify-content-center">
                <div className="col-lg-6 px-5">
                    <form
                        className="p-3"
                        method="POST"
                        action="/login"
                        onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="login">Login:</label>
                            <input
                                id="login"
                                className="form-control"
                                name="login"
                                type="text"
                                onChange={this.handleChange}
                                value={login}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                id="password"
                                className="form-control"
                                name="password"
                                type="password"
                                onChange={this.handleChange}
                                value={password}
                                required />
                        </div>
                        <input className="btn btn-primary" type="submit" value="Login" />
                    </form>        
                </div>
            </div>
        );
    }
}

export default LoginForm;
