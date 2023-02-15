import {
    CLEAR_ERRORS,
    LOGIN_ERROR_MESSAGE,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_ERRORS,
    REGISTER_ERROR_MESSAGE,
    REGISTER_SUCCESS,
    USER_LOADED,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case LOGIN_ERROR_MESSAGE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
            };
        case REGISTER_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload,
                errorMessage: null,
            };
        case REGISTER_ERROR_MESSAGE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
                errors: null,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
                errorMessage: null,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                errors: null,
                errorMessage: null,
                isAuthenticated: true,
                loading: false,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
            };
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                errors: null,
                errorMessage: null,
            };
        default:
            return state;
    }
};
