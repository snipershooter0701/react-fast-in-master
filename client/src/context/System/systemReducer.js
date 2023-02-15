import { GET_CONTACTS, GET_LOGS, SET_CURRENT, SET_LOGIN_MODAL } from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_LOGS:
            return {
                ...state,
                loading: false,
                logs: action.payload,
            };
        case GET_CONTACTS:
            return {
                ...state,
                loading: false,
                contacts: action.payload,
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload,
            };
        case SET_LOGIN_MODAL:
            return {
                ...state,
                loginModal: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};
