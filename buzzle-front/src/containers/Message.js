import { connect } from 'react-redux';

import {
    editMessage,
    deleteMessage
} from '../actions/messages.js';
import Message from '../components/Message.js';

const mapStateToProps = state => ({
    'user': state.user
});

const mapDispatchToProps = dispatch => ({
    'editMessage': (id, content, onSuccess) => dispatch(editMessage(id, content, onSuccess)),
    'deleteMessage': id => dispatch(deleteMessage(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Message);
