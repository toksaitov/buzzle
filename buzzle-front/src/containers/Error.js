import { connect } from 'react-redux';

import { clearError } from '../actions/error.js';
import Error from '../components/Error.js';

const mapStateToProps = state => ({
    'error': state.error
});

const mapDispatchToProps = dispatch => ({
    'clearError': () => dispatch(clearError())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Error);
