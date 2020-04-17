import React from 'react';

import Header from '../containers/Header.js';
import Error from '../containers/Error.js';
import Messages from '../containers/Messages.js';
import Footer from '../containers/Footer.js';
import MessageForm from '../containers/MessageForm.js';

const HomePage = () =>
    <>
        <Header showUserToolbar={true} />
        <main className="container">
            <Error />
            <MessageForm />
            <Messages />
        </main>
        <Footer />
    </>

export default HomePage;
