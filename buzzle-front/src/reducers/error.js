import * as actions from '../actions/types.js';

const error = (state = null, action) => {
    switch (action.type) {
        case actions.SET_ERROR:
            return action.error;
        default:
            return state;
    }
};

export default error;
