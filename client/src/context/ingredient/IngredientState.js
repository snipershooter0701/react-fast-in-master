import axios from 'axios';
import React, { useReducer } from 'react';
import handleError from '../../utils/handleError';
import {
    CLEAR_CURRENT,
    CREATE_CATEGORY,
    CREATE_INGREDIENT,
    CREATE_ALLERGY,
    DELETE_CATEGORY,
    DELETE_INGREDIENT,
    DELETE_ALLERGY,
    GET_CATEGORIES,
    GET_INGREDIENTS,
    GET_ALLERGIES,
    SET_CURRENT,
    SET_PAGE,
    SET_TOTAL,
    SET_SUCCESS,
    UPDATE_CATEGORY,
    UPDATE_INGREDIENT,
    UPDATE_CURRENT_LOADED_DATA,
    UPDATE_ALLERGY,
    SET_CURRENT_PAGE_DATA,
    REMOVE_FROM_CURRENT_PAGE_DATA,
} from '../types';
import IngredientContext from './ingredientContext';
import ingredientReducer from './ingredientReducer';

const IngredientState = ({ children }) => {
    const initialState = {
        loading: true,
        page: 1,
        limit: 10,
        total: null,
        errors: null,
        errorMessage: null,
        ingredients: null,
        categories: null,
        allergies: null,
        current: null,
        currentPageData: null,
        currentLoadedData: null,
        success: false,
    };

    const [state, dispatch] = useReducer(ingredientReducer, initialState);

    const {
        loading,
        page,
        limit,
        total,
        errors,
        errorMessage,
        ingredients,
        categories,
        allergies,
        current,
        currentPageData,
        currentLoadedData,
        success,
    } = state;

    const getIngredients = async () => {
        try {
            const res = await axios.get(`/api/ingredients`);

            if (res.data.success) {
                setTotal(res.data.data.total);
                dispatch({
                    type: GET_INGREDIENTS,
                    payload: res.data.data.ingredients,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getIngredientsByPage = async (pagination) => {
        try {
            const res = await axios.get(
                `/api/ingredients?page=${pagination}&limit=${limit}`
            );

            if (res.data.success) {
                setTotal(res.data.data.total);
                dispatch({
                    type: SET_CURRENT_PAGE_DATA,
                    payload: res.data.data.ingredients,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getIngredient = async (_id) => {
        try {
            const res = await axios.get(`/api/ingredients/${_id}`);
            if (res.data.success) {
                setCurrent(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCategories = async () => {
        try {
            const res = await axios.get('/api/ingredients/categories');
            if (res.data.success) {
                dispatch({
                    type: GET_CATEGORIES,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCategory = async (_id) => {
        try {
            const res = await axios.get(`/api/ingredients/categories/${_id}`);
            if (res.data.success) {
                setCurrent(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAllergies = async () => {
        try {
            const res = await axios.get('/api/ingredients/allergies');
            if (res.data.success) {
                dispatch({
                    type: GET_ALLERGIES,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAllergy = async (_id) => {
        try {
            const res = await axios.get(`/api/ingredients/allergies/${_id}`);
            if (res.data.success) {
                setCurrent(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const createIngredient = async (ingredient) => {
        try {
            const res = await axios.post('/api/ingredients', ingredient);

            if (res.data.success) {
                setSuccess(true);
                if (ingredients !== null) {
                    dispatch({
                        type: CREATE_INGREDIENT,
                        payload: res.data.data,
                    });
                }
            }
        } catch (error) {
            handleError(error, () => createIngredient(ingredient));
        }
    };

    const createCategory = async (category) => {
        try {
            const res = await axios.post('/api/ingredients/categories', {
                name: category,
            });
            if (res.data.success) {
                setSuccess(true);
                dispatch({
                    type: CREATE_CATEGORY,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => createCategory(category));
        }
    };

    const createAllergy = async (allergy) => {
        const headers = {
            'Content-Type': 'multipart/form-data',
        };
        try {
            const res = await axios.post(
                '/api/ingredients/allergies',
                allergy,
                { headers }
            );
            if (res.data.success) {
                setSuccess(true);
                dispatch({
                    type: CREATE_ALLERGY,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => createAllergy(allergy));
        }
    };

    const updateIngredient = async (ingredient) => {
        const { _id, ...rest } = ingredient;
        try {
            const res = await axios.put(`/api/ingredients/${_id}`, rest);
            if (res.data.success) {
                setSuccess(true);
                if (ingredients !== null) {
                    dispatch({
                        type: UPDATE_INGREDIENT,
                        payload: res.data.data,
                    });
                }
                if (currentLoadedData !== null)
                    dispatch({
                        type: UPDATE_CURRENT_LOADED_DATA,
                        payload: res.data.data,
                    });
            }
        } catch (error) {
            handleError(error, () => updateIngredient(ingredient));
        }
    };

    const updateCategory = async (_id, category) => {
        try {
            const res = await axios.put(`/api/ingredients/categories/${_id}`, {
                name: category,
            });

            if (res.data.success) {
                setSuccess(true);
                dispatch({
                    type: UPDATE_CATEGORY,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => updateCategory(_id, category));
        }
    };

    const updateAllergy = async (_id, allergy) => {
        const headers = {
            'Content-Type': 'multipart/form-data',
        };
        try {
            const res = await axios.put(
                `/api/ingredients/allergies/${_id}`,
                allergy,
                headers
            );

            if (res.data.success) {
                setSuccess(true);
                dispatch({
                    type: UPDATE_ALLERGY,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => updateAllergy(_id, allergy));
        }
    };

    const deleteIngredient = async (_id) => {
        try {
            const res = await axios.delete(`/api/ingredients/${_id}`);
            if (res.data.success) {
                setSuccess(true);
                if (ingredients !== null) {
                    dispatch({
                        type: DELETE_INGREDIENT,
                        payload: _id,
                    });
                }
                dispatch({
                    type: REMOVE_FROM_CURRENT_PAGE_DATA,
                    payload: _id,
                });
            }
        } catch (error) {
            handleError(error, () => deleteIngredient(_id));
        }
    };

    const deleteCategory = async (_id) => {
        try {
            const res = await axios.delete(
                `/api/ingredients/categories/${_id}`
            );
            if (res.data.success) {
                setSuccess(true);
                dispatch({
                    type: DELETE_CATEGORY,
                    payload: _id,
                });
            }
        } catch (error) {
            handleError(error, () => deleteCategory(_id));
        }
    };

    const deleteAllergy = async (_id) => {
        try {
            const res = await axios.delete(`/api/ingredients/allergies/${_id}`);

            if (res.data.success) {
                setSuccess(true);
                dispatch({
                    type: DELETE_ALLERGY,
                    payload: _id,
                });
            }
        } catch (error) {
            handleError(error, () => deleteAllergy(_id));
        }
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

    const setSuccess = async (successState) => {
        dispatch({
            type: SET_SUCCESS,
            payload: successState,
        });
    };

    return (
        <IngredientContext.Provider
            value={{
                loading,
                page,
                limit,
                total,
                errors,
                errorMessage,
                ingredients,
                categories,
                allergies,
                current,
                currentPageData,
                success,
                getIngredients,
                getIngredientsByPage,
                getIngredient,
                getCategories,
                getCategory,
                getAllergies,
                getAllergy,
                createIngredient,
                createCategory,
                createAllergy,
                updateIngredient,
                updateCategory,
                updateAllergy,
                deleteIngredient,
                deleteCategory,
                deleteAllergy,
                setPage,
                setCurrent,
                setSuccess,
                clearCurrent,
            }}
        >
            {children}
        </IngredientContext.Provider>
    );
};

export default IngredientState;
