import React from 'react';

import Header from '../components/Header.js';
import Error from '../components/Error.js';
import Messages from '../components/Messages.js';
import Footer from '../components/Footer.js';
import MessageForm from '../components/MessageForm.js';

function HomePage(props) {
    const error = props.error;
    const user = props.user;
    const messages = props.messages;

    const handleError = props.handleError;
    const handleMessageCreate = props.handleMessageCreate;
    const handleMessageEdit = props.handleMessageEdit;
    const handleMessageDelete = props.handleMessageDelete;

    return (
        <>
            <Header showUserToolbar={true} user={user} />
            <main className="container">
                {error &&
                    <Error error={error} />
                }
                {(user && user.authorized) &&
                    <MessageForm
                        handleError={handleError}
                        handleMessageCreate={handleMessageCreate} />
                }
                <Messages
                    user={user}
                    messages={messages}
                    handleError={handleError}
                    handleMessageEdit={handleMessageEdit}
                    handleMessageDelete={handleMessageDelete} />
            </main>
            <Footer />
        </>
    );
}

export default HomePage;
