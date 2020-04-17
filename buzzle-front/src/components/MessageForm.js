import React from 'react';

class MessageForm extends React.Component {
    componentWillUnmount() {
        this.props.unloadCreateMessageForm();
        this.props.clearError();
    }

    handleChange = event => {
        this.props.updateCreateMessageForm(event.target.name, event.target.value);
    }

    handleSubmit = event => {
        event.preventDefault();

        this.props.createMessage(this.props.content, () => {
            this.props.clearCreateMessageForm();
        });
    }

    render() {
        const user = this.props.user;
        const content = this.props.content;

        return ((user && user.authorized) ?
            <div className="row justify-content-center">
                <div className="col-md-6 px-5 mt-4">
                    <form action="/message/create" method="POST" onSubmit={this.handleSubmit} >
                        <label htmlFor="message-content" className="text-primary">
                            <strong>What’s on your mind?</strong>
                        </label>
                        <div className="input-group mb-3">
                            <input
                                id="message-content"
                                className="form-control text-white border-primary bg-primary"
                                type="text"
                                name="content"
                                autoComplete="off"
                                onChange={this.handleChange}
                                value={content} />
                            <div className="input-group-append">
                                <input className="btn btn-primary" type="submit" value="Send" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            :
            <></>
        );
    }
}

export default MessageForm;
