import * as actions from '../actions/types.js';

const messages = (state = [], action) => {
    switch (action.type) {
        case actions.LOAD_MESSAGES_SUCCESS:
            return action.messages;
        case actions.CREATE_MESSAGE_SUCCESS:
            return [
                ...state,
                {
                    'message': action.message
                }
            ];
        case actions.EDIT_MESSAGE_SUCCESS:
            return state.map(item => (
                item.message.id === action.message.id ? { 'message': action.message } : item
            ));
        case actions.DELETE_MESSAGE_SUCCESS:
            return state.filter(item => item.message.id !== action.id);
        default:
            return state;
    }
}

export default messages;
