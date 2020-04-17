import parameters from '../parameters.js';
import * as actions from './types.js';
import { setError } from './error.js';

export const loadMessages = () => {
    return dispatch => {
        fetch(`${parameters.apiURL}/messages`, {
            'method': 'GET',
            'headers': { 'Accept': 'application/json' }
        }).then(response => response)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  dispatch(setError(data.error));
              } else {
                  dispatch(finishLoadingMessages(data.messages));
              }
          })
          .catch(error => {
              dispatch(setError(`${error}`));
          });
    };
};

const finishLoadingMessages = messages => ({
    'type': actions.LOAD_MESSAGES_SUCCESS,
    messages
});

export const createMessage = (content, onSuccess) => {
    return dispatch => {
        fetch(`${parameters.apiURL}/message/create`, {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({ content })
        }).then(response => response)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  dispatch(setError(data.error));
              } else {
                  dispatch(finishCreatingMessage(data.message));
                  onSuccess();
              }
          })
          .catch(error => {
              dispatch(setError(`${error}`));
          });
    };
};

const finishCreatingMessage = message => ({
    'type': actions.CREATE_MESSAGE_SUCCESS,
    message
});

export const editMessage = (id, content, onSuccess) => {
    return dispatch => {
        fetch(`${parameters.apiURL}/message/${id}/edit`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        }).then(response => response)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  dispatch(setError(data.error));
              } else {
                  dispatch(finishEditingMessage(data.message));
                  onSuccess();
              }
          })
          .catch(error => {
              dispatch(setError(`${error}`));
          });
    }
}

const finishEditingMessage = message => ({
    'type': actions.EDIT_MESSAGE_SUCCESS,
    message
});

export const deleteMessage = id => {
    return dispatch => {
        fetch(`${parameters.apiURL}/message/${id}/delete`, {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json'
            }
        }).then(response => response)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  dispatch(setError(data.error));
              } else {
                  dispatch(finishDeletingMessage(id));
              }
          })
          .catch(error => {
              dispatch(setError(`${error}`));
          });
    };
}

const finishDeletingMessage = id => ({
    'type': actions.DELETE_MESSAGE_SUCCESS,
    id
});
