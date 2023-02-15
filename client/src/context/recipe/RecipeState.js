import axios from 'axios';
import React, { useReducer } from 'react';
import handleError from '../../utils/handleError';
import {
    CLEAR_CURRENT,
    CLEAR_CUSTOMISING,
    CLEAR_REVIEWS,
    CREATE_CUISINE,
    CREATE_RECIPE,
    CREATE_RECIPE_CATEGORY,
    CREATE_RECIPE_TYPE,
    CREATE_REVIEW,
    DELETE_CUISINE,
    DELETE_RECIPE,
    DELETE_RECIPE_CATEGORY,
    DELETE_RECIPE_TYPE,
    GET_CUISINES,
    GET_INGREDIENTS,
    GET_RECIPES,
    GET_RECIPE_CATEGORIES,
    GET_RECIPE_TYPES,
    GET_REVIEWS,
    GET_TOP_RECIPES,
    SET_CURRENT,
    SET_CURRENT_PAGE_DATA,
    SET_CUSTOMISING,
    SET_PAGE,
    SET_SEARCH_TERM,
    SET_SORT,
    SET_TOTAL,
    SET_SUCCESS,
    SORT_BY_RATING,
    UPDATE_CUISINE,
    UPDATE_CURRENT_LOADED_DATA,
    UPDATE_RECIPE,
    UPDATE_RECIPE_CATEGORY,
    UPDATE_RECIPE_TYPE,
} from '../types';
import RecipeContext from './recipeContext';
import recipeReducer from './recipeReducer';

const RecipeState = ({ children }) => {
    const initialState = {
        loading: true,
        page: 1,
        limit: 10,
        total: null,
        current: null,
        customising: null,
        errors: null,
        errorMessage: null,
        ingredients: null,
        recipes: null,
        topRecipes: null,
        categories: null,
        cuisines: null,
        recipeTypes: null,
        reviews: null,
        sortBy: SORT_BY_RATING,
        searchTerm: '',
        difficulty: ['easy', 'medium', 'hard'],
        currentPageData: null,
        currentLoadedData: null,
        success: false,
    };

    const [state, dispatch] = useReducer(recipeReducer, initialState);

    const {
        loading,
        page,
        limit,
        total,
        current,
        customising,
        errors,
        errorMessage,
        ingredients,
        recipes,
        topRecipes,
        categories,
        cuisines,
        recipeTypes,
        difficulty,
        reviews,
        sortBy,
        searchTerm,
        currentPageData,
        currentLoadedData,
        success,
    } = state;

    const getIngredients = async () => {
        try {
            const res = await axios.get(`/api/ingredients`);

            if (res.data.success) {
                dispatch({
                    type: GET_INGREDIENTS,
                    payload: res.data.data.ingredients,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getRecipes = async () => {
        try {
            const res = await axios.get('/api/recipes');

            if (res.data.success) {
                setTotal(res.data.data.total);
                dispatch({
                    type: GET_RECIPES,
                    payload: res.data.data.recipes,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getRecipesByPage = async (pagination) => {
        try {
            const res = await axios.get(
                `/api/recipes?page=${pagination}&limit=${limit}`
            );

            if (res.data.success) {
                setTotal(res.data.data.total);
                dispatch({
                    type: SET_CURRENT_PAGE_DATA,
                    payload: res.data.data.recipes,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getRecipe = async (_id) => {
        try {
            const res = await axios.get(`/api/recipes/${_id}`);
            if (res.data.success) {
                setCurrent(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getTopRecipes = async () => {
        try {
            const res = await axios.get(`/api/recipes/top-rated?limit=3`);
            if (res.data.success) {
                dispatch({
                    type: GET_TOP_RECIPES,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCategories = async () => {
        try {
            const res = await axios.get('/api/recipes/categories');
            if (res.data.success) {
                dispatch({
                    type: GET_RECIPE_CATEGORIES,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCategory = async (_id) => {
        try {
            const res = await axios.get(`/api/recipes/categories/${_id}`);
            if (res.data.success) {
                setCurrent(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCuisines = async () => {
        try {
            const res = await axios.get('/api/recipes/cuisines');
            if (res.data.success) {
                dispatch({
                    type: GET_CUISINES,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCuisine = async (_id) => {
        try {
            const res = await axios.get(`/api/recipes/cuisines/${_id}`);
            if (res.data.success) {
                setCurrent(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getRecipeTypes = async () => {
        try {
            const res = await axios.get('/api/recipes/type');
            if (res.data.success) {
                dispatch({
                    type: GET_RECIPE_TYPES,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getRecipeType = async (_id) => {
        try {
            const res = await axios.get(`/api/recipes/type/${_id}`);
            if (res.data.success) {
                setCurrent(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getReviews = async (_id) => {
        try {
            const res = await axios.get(`/api/recipes/reviews/${_id}`);
            if (res.data.success) {
                dispatch({
                    type: GET_REVIEWS,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const createRecipe = async (recipe, callback = false) => {
        try {
            const res = await axios.post('/api/recipes', recipe);
            if (res.data.success) {
                setSuccess(true);
                if (recipes !== null) {
                    dispatch({
                        type: CREATE_RECIPE,
                        payload: res.data.data,
                    });
                }
                if (callback) {
                    callback(res.data.data);
                }
                clearCurrent();
            }
        } catch (error) {
            handleError(error, () => createRecipe(recipe, callback));
        }
    };

    const createCategory = async (category) => {
        try {
            const res = await axios.post('/api/recipes/categories', {
                category_name: category,
            });
            if (res.data.success) {
                setSuccess(true);
                dispatch({
                    type: CREATE_RECIPE_CATEGORY,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => createCategory(category));
        }
    };

    const createCuisine = async (cuisine) => {
        try {
            const res = await axios.post('/api/recipes/cuisines', {
                cuisine_name: cuisine,
            });

            if (res.data.success) {
                setSuccess(true);
                dispatch({
                    type: CREATE_CUISINE,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => createCuisine(cuisine));
        }
    };

    const createRecipeType = async (recipeType) => {
        try {
            const res = await axios.post('/api/recipes/type', {
                recipe_type: recipeType,
            });

            if (res.data.success) {
                setSuccess(true);
                dispatch({
                    type: CREATE_RECIPE_TYPE,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => createRecipeType(recipeType));
        }
    };

    const createReview = async (_id, review) => {
        try {
            const res = await axios.post(`/api/recipes/reviews/${_id}`, review);

            if (res.data.success) {
                dispatch({
                    type: CREATE_REVIEW,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => createReview(_id, review));
        }
    };

    const updateRecipe = async (_id, recipe, callback = false) => {
        const headers = {
            'Content-Type': 'multipart/form-data',
        };
        try {
            const res = await axios.put(`/api/recipes/${_id}`, recipe, {
                headers,
            });
            if (res.data.success) {
                setSuccess(true);
                if (recipes !== null) {
                    dispatch({
                        type: UPDATE_RECIPE,
                        payload: res.data.data,
                    });
                }
                if (callback) {
                    callback(res.data.data);
                }
                clearCurrent();
                if (currentLoadedData !== null)
                    dispatch({
                        type: UPDATE_CURRENT_LOADED_DATA,
                        payload: res.data.data,
                    });
            }
        } catch (error) {
            handleError(error, () => updateRecipe(_id, recipe, callback));
        }
    };

    const updateRecipeViewCount = async (_id) => {
        try {
            const res = await axios.put(`/api/recipes/${_id}/view`);
            if (res.data.success) {
                dispatch({
                    type: UPDATE_RECIPE,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateCategory = async (_id, category) => {
        try {
            const res = await axios.put(`/api/recipes/categories/${_id}`, {
                category_name: category,
            });

            if (res.data.success) {
                setSuccess(true);
                dispatch({
                    type: UPDATE_RECIPE_CATEGORY,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => updateCategory(_id, category));
        }
    };

    const updateCuisine = async (_id, cuisine) => {
        try {
            const res = await axios.put(`/api/recipes/cuisines/${_id}`, {
                cuisine_name: cuisine,
            });

            if (res.data.success) {
                setSuccess(true);
                dispatch({
                    type: UPDATE_CUISINE,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => updateCuisine(_id, cuisine));
        }
    };

    const updateRecipeType = async (_id, recipeType) => {
        try {
            const res = await axios.put(`/api/recipes/type/${_id}`, {
                recipe_type: recipeType,
            });

            if (res.data.success) {
                setSuccess(true);
                dispatch({
                    type: UPDATE_RECIPE_TYPE,
                    payload: res.data.data,
                });
            }
        } catch (error) {
            handleError(error, () => updateRecipeType(_id, recipeTypes));
        }
    };

    const deleteRecipe = async (_id, callback = false) => {
        try {
            const res = await axios.delete(`/api/recipes/${_id}`);
            if (res.data.success) {
                setSuccess(true);
                if (recipes !== null) {
                    dispatch({
                        type: DELETE_RECIPE,
                        payload: _id,
                    });
                }
                if (callback) {
                    callback();
                }
            }
        } catch (error) {
            handleError(error, () => deleteRecipe(_id, callback));
        }
    };

    const deleteCategory = async (_id) => {
        try {
            const res = await axios.delete(`/api/recipes/categories/${_id}`);

            if (res.data.success) {
                setSuccess(true);
                dispatch({
                    type: DELETE_RECIPE_CATEGORY,
                    payload: _id,
                });
            }
        } catch (error) {
            handleError(error, () => deleteCategory(_id));
        }
    };

    const deleteCuisine = async (_id) => {
        try {
            const res = await axios.delete(`/api/recipes/cuisines/${_id}`);

            if (res.data.success) {
                setSuccess(true);
                dispatch({
                    type: DELETE_CUISINE,
                    payload: _id,
                });
            }
        } catch (error) {
            handleError(error, () => deleteCuisine(_id));
        }
    };

    const deleteRecipeType = async (_id) => {
        try {
            const res = await axios.delete(`/api/recipes/type/${_id}`);

            if (res.data.success) {
                setSuccess(true);
                dispatch({
                    type: DELETE_RECIPE_TYPE,
                    payload: _id,
                });
            }
        } catch (error) {
            handleError(error, () => deleteRecipeType(_id));
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

    const setCustomising = (customise) => {
        dispatch({
            type: SET_CUSTOMISING,
            payload: customise,
        });
    };

    const setSortBy = (sort) => {
        dispatch({
            type: SET_SORT,
            payload: sort,
        });
    };

    const setSearchTerm = (term) => {
        dispatch({
            type: SET_SEARCH_TERM,
            payload: term,
        });
    };

    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT,
        });
    };

    const clearCustomising = () => {
        dispatch({
            type: CLEAR_CUSTOMISING,
        });
    };

    const clearReviews = () => {
        dispatch({
            type: CLEAR_REVIEWS,
        });
    };

    const setSuccess = async (successState) => {
        dispatch({
            type: SET_SUCCESS,
            payload: successState,
        });
    };

    return (
        <RecipeContext.Provider
            value={{
                loading,
                current,
                customising,
                errors,
                total,
                page,
                limit,
                errorMessage,
                ingredients,
                recipes,
                topRecipes,
                categories,
                cuisines,
                recipeTypes,
                difficulty,
                reviews,
                sortBy,
                searchTerm,
                currentPageData,
                success,
                getIngredients,
                getRecipes,
                getRecipesByPage,
                getRecipe,
                getTopRecipes,
                getCategories,
                getCategory,
                getCuisines,
                getCuisine,
                getRecipeTypes,
                getRecipeType,
                getReviews,
                createRecipe,
                createCategory,
                createCuisine,
                createRecipeType,
                createReview,
                updateRecipe,
                updateRecipeViewCount,
                updateCategory,
                updateCuisine,
                updateRecipeType,
                deleteRecipe,
                deleteCategory,
                deleteCuisine,
                deleteRecipeType,
                setPage,
                setCurrent,
                setCustomising,
                setSortBy,
                setSearchTerm,
                setSuccess,
                clearCustomising,
                clearCurrent,
                clearReviews,
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};

export default RecipeState;
