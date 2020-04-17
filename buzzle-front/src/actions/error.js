import * as action from './types.js';

export const setError = error => ({
    'type': action.SET_ERROR,
    error,
});

export const clearError = () => ({
    'type': action.SET_ERROR,
    'error': null
});