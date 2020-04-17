import { connect } from 'react-redux';

import { clearError } from '../actions/error.js';
import { createMessage } from '../actions/messages.js';
import {
    updateCreateMessageForm,
    clearCreateMessageForm,
    unloadCreateMessageForm
} from '../actions/forms.js';
import MessageForm from '../components/MessageForm.js';

const mapStateToProps = state => ({
    'user': state.user,
    'content': state.createMessageForm.content
});

const mapDispatchToProps = dispatch => ({
    'clearError': () => dispatch(clearError()),
    'createMessage': (content, onSuccess) => dispatch(createMessage(content, onSuccess)),
    'updateCreateMessageForm': (name, value) => dispatch(updateCreateMessageForm(name, value)),
    'clearCreateMessageForm': () => dispatch(clearCreateMessageForm()),
    'unloadCreateMessageForm': () => dispatch(unloadCreateMessageForm())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageForm);
