import React, { useReducer } from 'react';
import axios from 'axios';
import SystemContext from './systemContext';
import systemReducer from './systemReducer';
import handleError from '../../utils/handleError';
import { GET_CONTACTS, GET_LOGS, SET_CURRENT, SET_LOGIN_MODAL } from '../types';

const SystemState = ({ children }) => {
    const initialState = {
        loading: true,
        logs: null,
        contacts: null,
        errorMessage: null,
        current: null,
        loginModal: false,
    };

    const [state, dispatch] = useReducer(systemReducer, initialState);

    const {
        loading,
        logs,
        errorMessage,
        contacts,
        current,
        loginModal,
    } = state;

    const getLogs = async () => {
        try {
            const res = await axios.get('/api/logs');
            if (res.data.success) {
                dispatch({
                    type: GET_LOGS,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => getLogs());
        }
    };

    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');

            if (res.data.success) {
                dispatch({
                    type: GET_CONTACTS,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => getContacts());
        }
    };

    const getContact = async (_id) => {
        try {
            const res = await axios.get(`/api/contacts/${_id}`);
            console.log(res);
            if (res.data.success) {
                setCurrent(res.data.data);
            }
        } catch (error) {
            handleError(error, () => getContact(_id));
        }
    };

    const createContact = async (contact) => {
        try {
            const res = await axios.post('/api/contacts', contact);

            if (res.data.success) {
                alert('Your message has been sent.');
            }
        } catch (error) {
            handleError(error);
        }
    };

    const setCurrent = async (currentState) => {
        try {
            dispatch({
                type: SET_CURRENT,
                payload: currentState,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const openLoginModal = () => {
        try {
            dispatch({
                type: SET_LOGIN_MODAL,
                payload: true,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const closeLoginModal = () => {
        try {
            dispatch({
                type: SET_LOGIN_MODAL,
                payload: false,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SystemContext.Provider
            value={{
                loading,
                logs,
                contacts,
                errorMessage,
                current,
                loginModal,
                getLogs,
                getContacts,
                getContact,
                createContact,
                setCurrent,
                openLoginModal,
                closeLoginModal,
            }}
        >
            {children}
        </SystemContext.Provider>
    );
};

export default SystemState;
