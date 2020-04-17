import { connect } from 'react-redux';

import { loadMessages } from '../actions/messages.js';
import Messages from '../components/Messages.js';

const mapStateToProps = state => ({
    'user': state.user,
    'messages': state.messages
});

const mapDispatchToProps = dispatch => ({
    'loadMessages': () => dispatch(loadMessages())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Messages);
