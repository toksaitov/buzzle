import React from 'react';
import { AnimateGroup } from 'react-animation';

import Message from '../containers/Message.js'

class Messages extends React.Component {
    componentDidMount() {
        this.props.loadMessages();
    }

    render() {
        const user = this.props.user;
        const messages = this.props.messages || [];

        return (
            <AnimateGroup animation="fade" className="row my-3">{messages.length === 0 ?
                <div key="-1" className="col">{user &&
                    <div className="alert alert-primary">No messages, send something...</div>
                }</div>
                :
                messages.map(item =>
                    <Message
                        key={item.message.id}
                        message={item.message} />
                )
            }</AnimateGroup>
        );
    }
};

export default Messages;
