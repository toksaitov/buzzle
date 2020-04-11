import React from 'react';

import Header from '../components/Header.js';
import Error from '../components/Error.js';
import Messages from '../components/Messages.js';
import Footer from '../components/Footer.js';
import MessageForm from '../components/MessageForm.js';

function HomePage(props) {
    const user = props.user;
    const messages = props.messages;

    const handleMessageCreate = props.handleMessageCreate;
    const handleMessageEdit = props.handleMessageEdit;
    const handleMessageDelete = props.handleMessageDelete;

    return (
        <>
            <Header showUserToolbar={true} user={user} />
            <main className="container">
                <Error />
                {(user && user.authorized) &&
                    <MessageForm
                        handleMessageCreate={handleMessageCreate} />
                }
                <Messages
                    user={user}
                    messages={messages}
                    handleMessageEdit={handleMessageEdit}
                    handleMessageDelete={handleMessageDelete} />
            </main>
            <Footer />
        </>
    );
}

export default HomePage;
