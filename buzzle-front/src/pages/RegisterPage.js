import React from 'react';

import Header from '../components/Header.js';
import Error from '../components/Error.js';
import RegisterForm from '../components/RegisterForm.js';
import Footer from '../components/Footer.js';

function RegisterPage(props) {
    const user = props.user;
    const handleUserCreate = props.handleUserCreate;

    return (
        <>
            <Header user={user} />
            <main className="container">
                <Error />
                <RegisterForm
                    user={user}
                    handleUserCreate={handleUserCreate} />
            </main>
            <Footer />
        </>
    );
}

export default RegisterPage;
