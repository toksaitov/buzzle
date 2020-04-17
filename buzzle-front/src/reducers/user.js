import * as actions from '../actions/types.js';

const user = (state = null, action) => {
    switch (action.type) {
        case actions.LOAD_USER_SUCCESS:
            return action.user;
        case actions.CREATE_USER_SUCCESS:
            return action.user;
        case actions.LOGIN_USER_SUCCESS:
            return action.user;
        case actions.LOGOUT_USER_SUCCESS:
            return null;
        default:
            return state;
    }
}

export default user;
