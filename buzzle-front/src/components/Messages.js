import React from 'react';
import { AnimateGroup } from 'react-animation';

import Message from './Message.js'

function Messages(props) {
    const user = props.user;
    const messages = props.messages || [];

    return (
        <AnimateGroup animation="fade" className="row my-3">{messages.length === 0 ?
            <div key="-1" className="col">{user &&
                <div className="alert alert-primary">No messages, send something...</div>
            }</div>
            :
            messages.map(item =>
                <Message
                    key={item.message.id}
                    user={user}
                    message={item.message}
                    handleError={props.handleError}
                    handleMessageEdit={props.handleMessageEdit}
                    handleMessageDelete={props.handleMessageDelete} />
            )
        }</AnimateGroup>
    );
}

export default Messages;
