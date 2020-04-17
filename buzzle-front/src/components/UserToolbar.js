import React from 'react';
import { Link } from "react-router-dom";

const UserToolbar = ({ user, logoutUser }) =>
    user ?
    <form action="/logout" onSubmit={event => { event.preventDefault(); logoutUser() }} method="POST">
        <input
            id="logout"
            className="btn btn-outline-light"
            type="submit"
            value={`Logout (@${user.login})`} />
    </form>
    :
    <div className="btn-group">
        <Link className="btn btn-outline-light" to="/login">Login</Link>
        <Link className="btn btn-outline-light" to="/register">Register</Link>
    </div>

export default UserToolbar;
