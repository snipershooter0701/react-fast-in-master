import React from 'react';
import axios from 'axios';
import { useReducer } from 'react';
import {
    ADD_CUSTOM_RECIPE,
    ADD_MY_RECIPE,
    CLEAR_CURRENT,
    GET_CUSTOM_RECIPES,
    GET_MY_RECIPES,
    GET_PROFILE,
    GET_SAVED_RECIPES,
    GET_USERS,
    REMOVE_CUSTOM_RECIPE,
    REMOVE_MY_RECIPE,
    SET_CURRENT,
    SET_PAGE,
    SET_TOTAL,
    UPDATE_CUSTOM_RECIPE,
    UPDATE_MY_RECIPE,
} from '../types';
import UserContext from './userContext';
import userReducer from './userReducer';
import handleError from '../../utils/handleError';

const UserState = ({ children }) => {
    const initialState = {
        loading: true,
        page: 1,
        limit: 10,
        total: null,
        current: null,
        errors: null,
        errorMessage: null,
        users: null,
        profile: null,
        savedRecipes: null,
        customRecipes: null,
        myRecipes: null,
    };

    const [state, dispatch] = useReducer(userReducer, initialState);

    const {
        loading,
        page,
        limit,
        total,
        current,
        errors,
        errorMessage,
        users,
        profile,
        savedRecipes,
        customRecipes,
        myRecipes,
    } = state;

    const getUsers = async () => {
        try {
            const res = await axios.get('/api/users');

            if (res.data.success) {
                setTotal(res.data.data.total);
                dispatch({
                    type: GET_USERS,
                    payload: res.data.data.users,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getUserProfile = async (_id) => {
        try {
            const res = await axios.get(`/api/users/profile/${_id}`);
            if (res.data.success) {
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => getUserProfile(_id));
        }
    };

    const getSavedRecipes = async (_id) => {
        try {
            const res = await axios.get(
                `/api/users/profile/${_id}/savedRecipes`
            );

            if (res.data.success) {
                dispatch({
                    type: GET_SAVED_RECIPES,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => getSavedRecipes(_id));
        }
    };

    const getCustomRecipes = async (_id) => {
        try {
            const res = await axios.get(
                `/api/users/profile/${_id}/customRecipes`
            );

            if (res.data.success) {
                dispatch({
                    type: GET_CUSTOM_RECIPES,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => getCustomRecipes(_id));
        }
    };

    const getMyRecipes = async (_id) => {
        try {
            const res = await axios.get(`/api/users/profile/${_id}/myRecipes`);

            if (res.data.success) {
                dispatch({
                    type: GET_MY_RECIPES,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => getMyRecipes(_id));
        }
    };

    const addCustomRecipe = async (recipe) => {
        dispatch({
            type: ADD_CUSTOM_RECIPE,
            payload: recipe,
        });
    };

    const addMyRecipe = async (recipe) => {
        dispatch({
            type: ADD_MY_RECIPE,
            payload: recipe,
        });
    };

    const updateUserProfile = async (_id, profile) => {
        const headers = {
            'Content-Type': 'multipart/form-data',
        };

        try {
            const res = await axios.put(
                `/api/users/profile/${_id}`,
                profile,
                headers
            );
            console.log(res);
            if (res.data.success) {
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => updateUserProfile(_id, profile));
        }
    };

    const updateCustomRecipe = async (recipe) => {
        dispatch({
            type: UPDATE_CUSTOM_RECIPE,
            payload: recipe,
        });
    };

    const updateMyRecipe = async (recipe) => {
        dispatch({
            type: UPDATE_MY_RECIPE,
            payload: recipe,
        });
    };

    const removeCustomRecipe = async (_id) => {
        dispatch({
            type: REMOVE_CUSTOM_RECIPE,
            payload: _id,
        });
    };

    const removeMyRecipe = async (_id) => {
        dispatch({
            type: REMOVE_MY_RECIPE,
            payload: _id,
        });
    };

    const setPage = (num) => {
        dispatch({
            type: SET_PAGE,
            payload: num,
        });
    };

    const setTotal = (num) => {
        dispatch({
            type: SET_TOTAL,
            payload: num,
        });
    };

    const setCurrent = (currentState) => {
        dispatch({
            type: SET_CURRENT,
            payload: currentState,
        });
    };

    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT,
        });
    };

    return (
        <UserContext.Provider
            value={{
                loading,
                total,
                page,
                limit,
                current,
                errors,
                errorMessage,
                users,
                profile,
                savedRecipes,
                customRecipes,
                myRecipes,
                getUsers,
                getUserProfile,
                getSavedRecipes,
                getCustomRecipes,
                getMyRecipes,
                addCustomRecipe,
                addMyRecipe,
                updateUserProfile,
                updateCustomRecipe,
                updateMyRecipe,
                removeCustomRecipe,
                removeMyRecipe,
                setPage,
                setTotal,
                setCurrent,
                clearCurrent,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserState;
