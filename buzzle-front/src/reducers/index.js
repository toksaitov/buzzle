import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import error from './error.js';
import messages from './messages.js';
import user from './user.js';
import { loginForm, registerForm, createMessageForm } from './forms.js';

const rootReducerBuilder = (history) => combineReducers({
    router: connectRouter(history),
    error, messages, user,
    loginForm, registerForm, createMessageForm
});

export default rootReducerBuilder;
