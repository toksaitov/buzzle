import * as actions from '../actions/types.js';

export const loginForm = (state = { 'login': '', 'password': '' }, action) => {
    switch (action.type) {
        case actions.UPDATE_LOGIN_FORM:
            return { ...state, [action.name]: action.value };
        case actions.UNLOAD_LOGIN_FORM:
            return { login: '', password: '' };
        default:
            return state;
    }
};

export const registerForm = (state = { 'login': '', 'password': '', 'password-repeat': '' }, action) => {
    switch (action.type) {
        case actions.UPDATE_REGISTER_FORM:
            return { ...state, [action.name]: action.value };
        case actions.UNLOAD_REGISTER_FORM:
            return { 'login': '', 'password': '', 'password-repeat': '' };
        default:
            return state;
    }
};

export const createMessageForm = (state = { 'content': '' }, action) => {
    switch (action.type) {
        case actions.UPDATE_CREATE_MESSAGE_FORM:
            return { ...state, [action.name]: action.value };
        case actions.CLEAR_CREATE_MESSAGE_FORM:
        case actions.UNLOAD_CREATE_MESSAGE_FORM:
            return { 'content': '' };
        default:
            return state;
    }
};
