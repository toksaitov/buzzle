import React from 'react';
import { connect } from 'react-redux';
import { clearError } from '../actions/error';

function Error(props) {
    const error = props.error;
    const clearError = props.clearError;

    return (error ?
        <div className="row justify-content-center mt-3">
            <div className="col-md-6">
                <div className="alert alert-danger">
                    {error}
                    <button onClick={clearError} type="button" class="close">
                        <span>&times;</span>
                    </button>
                </div>
            </div>
        </div>
        :
        <></>
    );
}

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

