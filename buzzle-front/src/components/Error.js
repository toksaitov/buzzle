import React from 'react';

const Error = ({ error, clearError }) =>
    error ?
    <div className="row justify-content-center mt-3">
        <div className="col-md-6">
            <div className="alert alert-danger">
                {error}
                <button type="button" className="close" onClick={clearError}>
                    <span>&times;</span>
                </button>
            </div>
        </div>
    </div>
    :
    <></>

export default Error;
