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

export default (state, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };
        case GET_PROFILE:
            return {
                ...state,
                loading: false,
                profile: action.payload,
            };
        case GET_SAVED_RECIPES:
            return {
                ...state,
                loading: false,
                savedRecipes: action.payload,
            };
        case GET_CUSTOM_RECIPES:
            return {
                ...state,
                loading: false,
                customRecipes: action.payload,
            };
        case GET_MY_RECIPES:
            return {
                ...state,
                loading: false,
                myRecipes: action.payload,
            };
        case ADD_CUSTOM_RECIPE:
            return {
                ...state,
                loading: false,
                customRecipes: [...state.customRecipes, action.payload],
            };
        case ADD_MY_RECIPE:
            return {
                ...state,
                loading: false,
                myRecipes: [...state.myRecipes, action.payload],
            };
        case UPDATE_CUSTOM_RECIPE:
            return {
                ...state,
                loading: false,
                customRecipes: state.customRecipes.map((recipe) =>
                    recipe._id === action.payload._id ? action.payload : recipe
                ),
            };
        case UPDATE_MY_RECIPE:
            return {
                ...state,
                loading: false,
                myRecipes: state.myRecipes.map((recipe) =>
                    recipe._id === action.payload._id ? action.payload : recipe
                ),
            };
        case REMOVE_CUSTOM_RECIPE:
            return {
                ...state,
                loading: false,
                customRecipes: state.customRecipes.filter(
                    ({ _id }) => _id !== action.payload
                ),
            };
        case REMOVE_MY_RECIPE:
            return {
                ...state,
                loading: false,
                myRecipes: state.myRecipes.filter(
                    ({ _id }) => _id !== action.payload
                ),
            };
        case SET_PAGE:
            return {
                ...state,
                page: action.payload,
            };
        case SET_TOTAL:
            return {
                ...state,
                total: action.payload,
            };
        case SET_CURRENT:
            return {
                ...state,
                loading: false,
                current: action.payload,
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                loading: false,
                current: null,
            };
        default:
            return {
                ...state,
            };
    }
};
