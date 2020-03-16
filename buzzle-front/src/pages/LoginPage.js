import React from 'react';

import Header from '../components/Header.js';
import Error from '../components/Error.js';
import LoginForm from '../components/LoginForm.js';
import Footer from '../components/Footer.js';

function LoginPage(props) {
    const error = props.error;
    const user = props.user;

    const handleError = props.handleError;
    const handleUserLogin = props.handleUserLogin;

    return (
        <>
            <Header user={user} />
            <main className="container">
                {error &&
                    <Error error={error} />
                }
                <LoginForm
                    user={user}
                    handleError={handleError}
                    handleUserLogin={handleUserLogin} />
            </main>
            <Footer />
        </>
    );
}

export default LoginPage;
