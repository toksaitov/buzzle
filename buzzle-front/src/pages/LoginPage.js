import React from 'react';

import Header from '../containers/Header.js';
import Error from '../containers/Error.js';
import LoginForm from '../containers/LoginForm.js';
import Footer from '../containers/Footer.js';

const LoginPage = () =>
    <>
        <Header />
        <main className="container">
            <Error />
            <LoginForm />
        </main>
        <Footer />
    </>

export default LoginPage;
