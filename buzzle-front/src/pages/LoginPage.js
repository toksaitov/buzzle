import React from 'react';

import Header from '../components/Header.js';
import Error from '../components/Error.js';
import LoginForm from '../components/LoginForm.js';
import Footer from '../components/Footer.js';

function LoginPage(props) {
    const user = props.user;
    const handleUserLogin = props.handleUserLogin;

    return (
        <>
            <Header user={user} />
            <main className="container">
                <Error />
                <LoginForm
                    user={user}
                    handleUserLogin={handleUserLogin} />
            </main>
            <Footer />
        </>
    );
}

export default LoginPage;
