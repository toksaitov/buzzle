import React from 'react';
import { Redirect } from "react-router-dom";

class LoginForm extends React.Component {
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleUserLogin({
            'login': this.state.login,
            'password': this.state.password
        });
    }

    render() {
        const user = this.props.user;

        return (user ?
            <Redirect to="/" />
            :
            <div className="row justify-content-center">
                <div className="col-lg-6 px-5">
                    <form
                        className="p-3"
                        method="POST"
                        action="/login"
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="login">Login:</label>
                            <input
                                id="login"
                                className="form-control"
                                name="login"
                                type="text"
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                id="password"
                                className="form-control"
                                name="password"
                                type="password"
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
