import parameters from '../parameters.js';
import * as actions from './types.js';
import { setError } from './error.js';

export const loadUser = () => {
    return dispatch => {
        fetch(`${parameters.apiURL}/user`, {
            'method': 'GET',
            'headers': { 'Accept': 'application/json' }
        }).then(response => response)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  dispatch(setError(data.error));
              } else {
                  dispatch(finishLoadingUser(data.user));
              }
          })
          .catch(error => {
              dispatch(setError(`${error}`));
          });
    };
};

const finishLoadingUser = user => ({
    'type': actions.LOAD_USER_SUCCESS,
    user
});

export const createUser = credentials => {
    return dispatch => {
        fetch(`${parameters.apiURL}/register`, {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(credentials)
        }).then(response => response)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  dispatch(setError(data.error));
              } else {
                  dispatch(finishCreatingUser(data.user));
              }
          })
          .catch(error => {
              dispatch(setError(`${error}`));
          });
    };
};

const finishCreatingUser = user => ({
    'type': actions.CREATE_USER_SUCCESS,
    user
});

export const loginUser = credentials => {
    return dispatch => {
        fetch(`${parameters.apiURL}/login`, {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(credentials)
        }).then(response => response)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  dispatch(setError(data.error));
              } else {
                  dispatch(finishLoginUser(data.user));
              }
          })
          .catch(error => {
              dispatch(setError(`${error}`));
          });
    }
}

const finishLoginUser = user => ({
    'type': actions.LOGIN_USER_SUCCESS,
    user
});

export const logoutUser = credentials => {
    return dispatch => {
        fetch(`${parameters.apiURL}/logout`, {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  dispatch(setError(data.error));
              } else {
                  dispatch(finishLogoutUser());
              }
          })
          .catch(error => {
              dispatch(setError(`${error}`));
          });
    }
}

const finishLogoutUser = () => ({
    'type': actions.LOGOUT_USER_SUCCESS
});
