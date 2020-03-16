import React from 'react';
import { Link } from "react-router-dom";

function UserToolbar(props) {
    const user = props.user;

    return (user ?
        <form action="/logout" method="POST">
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
    );
}

export default UserToolbar;
