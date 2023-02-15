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
    UPDATE_ALLERGY,
    SET_CURRENT_PAGE_DATA,
    REMOVE_FROM_CURRENT_PAGE_DATA,
    UPDATE_CURRENT_LOADED_DATA,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_INGREDIENTS:
            return {
                ...state,
                loading: false,
                ingredients: action.payload,
            };
        case GET_CATEGORIES:
            return {
                ...state,
                loading: false,
                categories: action.payload,
            };
        case GET_ALLERGIES:
            return {
                ...state,
                loading: false,
                allergies: action.payload,
            };

        case CREATE_INGREDIENT:
            return {
                ...state,
                loading: false,
                ingredients: action.payload,
            };
        case CREATE_CATEGORY:
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload],
            };
        case CREATE_ALLERGY:
            return {
                ...state,
                loading: false,
                allergies: [...state.allergies, action.payload],
            };
        case UPDATE_INGREDIENT:
            return {
                ...state,
                loading: false,
                ingredients: state.ingredients.map((ingredient) =>
                    ingredient._id === action.payload._id
                        ? action.payload
                        : ingredient
                ),
            };

        case UPDATE_CURRENT_LOADED_DATA:
            return {
                ...state,
                loading: false,
                currentLoadedData: state.currentLoadedData.map((ingredient) =>
                    ingredient._id === action.payload._id
                        ? action.payload
                        : ingredient
                ),
            };
        case UPDATE_CATEGORY:
            return {
                ...state,
                loading: false,
                categories: state.categories.map((category) =>
                    category._id === action.payload._id
                        ? action.payload
                        : category
                ),
            };
        case UPDATE_ALLERGY:
            return {
                ...state,
                loading: false,
                allergies: state.allergies.map((allergy) =>
                    allergy._id === action.payload._id
                        ? action.payload
                        : allergy
                ),
            };

        case DELETE_INGREDIENT:
            return {
                ...state,
                loading: false,
                ingredients: state.ingredients.filter(
                    ({ _id }) => _id !== action.payload
                ),
            };
        case REMOVE_FROM_CURRENT_PAGE_DATA:
            return {
                ...state,
                loading: false,
                currentPageData: state.currentPageData.filter(
                    ({ _id }) => _id !== action.payload
                ),
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                loading: false,
                categories: state.categories.filter(
                    ({ _id }) => _id !== action.payload
                ),
            };
        case DELETE_ALLERGY:
            return {
                ...state,
                loading: false,
                allergies: state.allergies.filter(
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
        case SET_CURRENT_PAGE_DATA:
            return {
                ...state,
                currentPageData: action.payload,
            };
        case SET_SUCCESS:
            return {
                ...state,
                success: action.payload,
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
