import React from 'react';

import Header from '../containers/Header.js';
import Error from '../containers/Error.js';
import RegisterForm from '../containers/RegisterForm.js';
import Footer from '../containers/Footer.js';

const RegisterPage = () =>
    <>
        <Header />
        <main className="container">
            <Error />
            <RegisterForm />
        </main>
        <Footer />
    </>

export default RegisterPage;
