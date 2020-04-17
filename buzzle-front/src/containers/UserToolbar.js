import { connect } from 'react-redux';

import { logoutUser } from '../actions/user.js';
import UserToolbar from '../components/UserToolbar.js';

const mapStateToProps = state => ({
    'user': state.user
});

const mapDispatchToProps = dispatch => ({
    'logoutUser': () => dispatch(logoutUser())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserToolbar);
