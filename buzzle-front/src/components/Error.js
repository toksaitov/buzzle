import React from 'react';

function Error(props) {
    const error = props.error;

    return (
        <div className="row justify-content-center mt-3">
            <div className="col-md-4">
                <div className="alert alert-danger">{error}</div>
            </div>
        </div>
    );
}

export default Error;
