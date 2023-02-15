import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {
    LOGIN_ERROR_MESSAGE,
    LOGOUT,
    CLEAR_ERRORS,
    REGISTER_ERRORS,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    USER_LOADED,
    REGISTER_ERROR_MESSAGE,
} from '../types';

const AuthState = ({ children }) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        errors: null,
        errorMessage: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const {
        token,
        isAuthenticated,
        loading,
        user,
        errors,
        errorMessage,
    } = state;

    // Load User
    const loadUser = async () => {
        if (!localStorage.token) {
            dispatch({
                type: LOGOUT,
            });
            return;
        }
        setAuthToken(localStorage.token);
        try {
            const decoded = jwt_decode(localStorage.token);

            const { type, username, _id, email } = decoded;

            dispatch({
                type: USER_LOADED,
                payload: {
                    type,
                    username,
                    email,
                    _id,
                },
            });
        } catch (error) {
            dispatch({
                type: LOGOUT,
            });
            console.log(error);
        }
    };

    // Register User
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const res = await axios.post(
                '/api/auth/register',
                formData,
                config
            );
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data.access_token,
            });
            loadUser();
        } catch (error) {
            if (error.response.data.errors) {
                return dispatch({
                    type: REGISTER_ERRORS,
                    payload: error.response.data.errors,
                });
            }

            dispatch({
                type: REGISTER_ERROR_MESSAGE,
                payload: error.response.data.message,
            });
        }
    };

    // Login User
    const login = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const res = await axios.post('/api/auth/login', formData, config);

            if (res.data.success) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data.access_token,
                });
                loadUser();
            }
            // loadUser();
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR_MESSAGE,
                payload: error.response.data.message,
            });
        }
    };

    // Logout
    const logout = async () => {
        try {
            await axios.delete('/api/auth/logout');
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({ type: LOGOUT });
        }
    };

    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                loading,
                user,
                errors,
                errorMessage,
                register,
                loadUser,
                login,
                logout,
                clearErrors,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthState;
