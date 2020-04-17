import React from 'react';
import Moment from 'react-moment';
import { AnimateGroup } from 'react-animation';

class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'content': props.message.content,
            'editing': false
        }
    }

    handleContentChange = event => {
        this.setState({ 'content': event.target.value });
    }

    handleEditSubmit = event => {
        event.preventDefault();

        if (this.state.editing) {
            const id = this.props.message.id;
            const content = this.state.content;
            this.props.editMessage(id, content, () => {
                this.setState({ 'editing': false });
            });
        } else {
            this.setState({ 'editing': true });
        }
    }

    handleDeleteSubmit = event => {
        event.preventDefault();

        if (this.state.editing) {
            this.setState({ 'editing': false });
        } else {
            const id = this.props.message.id;
            this.props.deleteMessage(id);
        }
    }

    render() {
        const user = this.props.user;
        const message = this.props.message;
        const editing = this.state.editing;

        const cardClass = user && user.id === message.user.id ? 'bg-primary' : 'bg-secondary';
        const editAction = `/message/${message.id}/edit`;
        const deleteAction = `/message/${message.id}/delete`;
        
        return (
            <div className="col-md-4">
                <div className={`message card p-3 m-2 text-white ${cardClass}`}>
                    <h5 className="card-title">{message.user.login}</h5>
                    <AnimateGroup animation="bounce">{editing ?
                        <textarea
                            key="0"
                            onChange={this.handleContentChange}
                            value={this.props.content} />
                        :
                        <div key="1" className="message-content card-text">{message.content}</div>
                    }</AnimateGroup>
                    <time className="message-date card-subtitle">
                        <small>
                            <Moment format="LLL">{message.createdAt}</Moment>
                        </small>
                    </time>
                    {(user && (user.administrator || user.id === message.user.id)) &&
                        <div className="clearfix">
                            <div className="float-right">
                                <form
                                    className="d-inline mr-1"
                                    action={editAction}
                                    onSubmit={this.handleEditSubmit}
                                    method="GET">
                                    <input
                                        className="edit-button btn btn-sm btn-outline-light"
                                        type="submit"
                                        value={editing ? 'Done' : 'Edit'} />
                                </form>
                                <form
                                    className="d-inline ml-1"
                                    action={deleteAction}
                                    onSubmit={this.handleDeleteSubmit}
                                    method="POST">
                                    <input
                                        className="delete-button btn btn-sm btn-outline-light"
                                        type="submit"
                                        value={editing ? 'Cancel' : 'Delete'} />
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Message;
