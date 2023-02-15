import {
    ADD_FILTER,
    REMOVE_FILTER,
    RESET_FILTERS,
    SET_AVAILABLE_ALLERGIES,
    SET_AVAILABLE_CUISINE,
    SET_AVAILABLE_DURATION,
    SET_AVAILABLE_INGREDIENTS,
    SET_AVAILABLE_RECIPE_TYPES,
    SET_FILTERS,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_AVAILABLE_INGREDIENTS:
            return {
                ...state,
                availableIngredients: action.payload,
            };
        case SET_AVAILABLE_CUISINE:
            return {
                ...state,
                availableCuisine: action.payload,
            };
        case SET_AVAILABLE_RECIPE_TYPES:
            return {
                ...state,
                availableRecipeTypes: action.payload,
            };
        case SET_AVAILABLE_ALLERGIES:
            return {
                ...state,
                availableAllergies: action.payload,
            };
        case SET_AVAILABLE_DURATION:
            return {
                ...state,
                availableDurations: action.payload,
            };
        case SET_FILTERS:
            return {
                ...state,
                filters: action.payload,
            };
        case ADD_FILTER:
            return {
                ...state,
                filters: [...state.filters, action.payload],
            };
        case REMOVE_FILTER:
            return {
                ...state,
                filters: state.filters.filter(
                    (filter) => filter.data._id !== action.payload
                ),
            };
        case RESET_FILTERS:
            return {
                ...state,
                filters: [],
                availableIngredients: null,
                availableCuisine: null,
                availableRecipeTypes: null,
                availableAllergies: null,
                availableDurations: null,
            };
        default:
            return {
                ...state,
            };
    }
};
