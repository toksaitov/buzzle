import React from 'react';
import { Redirect } from "react-router";

class RegisterForm extends React.Component {
    componentWillUnmount() {
        this.props.unloadRegisterForm();
        this.props.clearError();
    }

    handleChange = event => {
        this.props.updateRegisterForm(event.target.name, event.target.value);
    }

    handleSubmit = event => {
        event.preventDefault();

        this.props.createUser({
            'login': this.props.login,
            'password': this.props.password,
            'password-repeat': this.props['password-repeat']
        });
    }

    render() {
        const user = this.props.user;
        const login = this.props.login;
        const password = this.props.password;
        const passwordRepeat = this.props['password-repeat'];

        return (user ?
            <Redirect to="/" />
            :
            <div className="row justify-content-center">
                <div className="col-lg-6 px-5">
                    <form
                        className="p-3"
                        method="POST"
                        action="/register"
                        autoComplete="off"
                        onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <label htmlFor="login">Login:</label>
                            <input
                                id="login"
                                className="form-control"
                                type="text"
                                name="login"
                                autoComplete="off"
                                value={login}
                                onChange={this.handleChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                id="password"
                                className="form-control"
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                onChange={this.handleChange}
                                value={password}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-repeat">Repeat the Password:</label>
                            <input
                                id="password-repeat"
                                className="form-control"
                                type="password"
                                name="password-repeat"
                                autoComplete="new-password"
                                onChange={this.handleChange}
                                value={passwordRepeat}
                                required />
                        </div>
                        <input className="btn btn-primary" type="submit" value="Register" />
                    </form>        
                </div>
            </div>
        );
    }
}

export default RegisterForm;
