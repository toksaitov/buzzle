import React from 'react';

class MessageForm extends React.Component {
    state = {
        'content': ''
    };

    handleChange = event => {
        this.setState({ 'content': event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const newContent = this.state.content;
        this.props.handleMessageCreate(newContent, () => {
            this.setState({ 'content': '' });
        });
    }

    render() {
        return (
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
                                value={this.state.content} />
                            <div className="input-group-append">
                                <input className="btn btn-primary" type="submit" value="Send" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default MessageForm;
