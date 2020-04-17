import * as action from './types.js';

export const updateLoginForm = (name, value) => ({
    'type': action.UPDATE_LOGIN_FORM,
    name, value
});

export const unloadLoginForm = () => ({
    'type': action.UNLOAD_LOGIN_FORM
});

export const updateRegisterForm = (name, value) => ({
    'type': action.UPDATE_REGISTER_FORM,
    name, value
});

export const unloadRegisterForm = () => ({
    'type': action.UNLOAD_REGISTER_FORM
});

export const updateCreateMessageForm = (name, value) => ({
    'type': action.UPDATE_CREATE_MESSAGE_FORM,
    name, value
});

export const clearCreateMessageForm = () => ({
    'type': action.CLEAR_CREATE_MESSAGE_FORM
});

export const unloadCreateMessageForm = () => ({
    'type': action.UNLOAD_CREATE_MESSAGE_FORM
});
