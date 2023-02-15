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
    SET_SUCCESS,
    SET_TOTAL,
    UPDATE_CUISINE,
    UPDATE_RECIPE,
    UPDATE_RECIPE_CATEGORY,
    UPDATE_RECIPE_TYPE,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_INGREDIENTS:
            return {
                ...state,
                loading: false,
                ingredients: action.payload,
            };
        case GET_RECIPES:
            return {
                ...state,
                loading: false,
                recipes: action.payload,
            };
        case GET_TOP_RECIPES:
            return {
                ...state,
                loading: false,
                topRecipes: action.payload,
            };
        case GET_RECIPE_CATEGORIES:
            return {
                ...state,
                loading: false,
                categories: action.payload,
            };
        case GET_CUISINES:
            return {
                ...state,
                loading: false,
                cuisines: action.payload,
            };
        case GET_RECIPE_TYPES:
            return {
                ...state,
                loading: false,
                recipeTypes: action.payload,
            };
        case GET_REVIEWS:
            return {
                ...state,
                loading: false,
                reviews: action.payload,
            };
        case CREATE_RECIPE:
            return {
                ...state,
                loading: false,
                recipes: [...state.recipes, action.payload],
            };
        case CREATE_RECIPE_CATEGORY:
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload],
            };
        case CREATE_CUISINE:
            return {
                ...state,
                loading: false,
                cuisines: [...state.cuisines, action.payload],
            };
        case CREATE_RECIPE_TYPE:
            return {
                ...state,
                loading: false,
                recipeTypes: [...state.recipeTypes, action.payload],
            };
        case CREATE_REVIEW:
            return {
                ...state,
                loading: false,
                reviews: [...state.reviews, action.payload],
            };
        case UPDATE_RECIPE:
            return {
                ...state,
                loading: false,
                recipes: state.recipes.map((recipe) =>
                    recipe._id === action.payload._id ? action.payload : recipe
                ),
            };
        case UPDATE_RECIPE_CATEGORY:
            return {
                ...state,
                loading: false,
                categories: state.categories.map((category) =>
                    category._id === action.payload._id
                        ? action.payload
                        : category
                ),
            };
        case UPDATE_CUISINE:
            return {
                ...state,
                loading: false,
                cuisines: state.cuisines.map((cuisine) =>
                    cuisine._id === action.payload._id
                        ? action.payload
                        : cuisine
                ),
            };
        case UPDATE_RECIPE_TYPE:
            return {
                ...state,
                loading: false,
                recipeTypes: state.recipeTypes.map((recipeType) =>
                    recipeType._id === action.payload._id
                        ? action.payload
                        : recipeType
                ),
            };
        case DELETE_RECIPE:
            return {
                ...state,
                loading: false,
                recipes: state.recipes.filter(
                    ({ _id }) => _id !== action.payload
                ),
            };
        case DELETE_RECIPE_CATEGORY:
            return {
                ...state,
                loading: false,
                categories: state.categories.filter(
                    ({ _id }) => _id !== action.payload
                ),
            };
        case DELETE_CUISINE:
            return {
                ...state,
                loading: false,
                cuisines: state.cuisines.filter(
                    ({ _id }) => _id !== action.payload
                ),
            };
        case DELETE_RECIPE_TYPE:
            return {
                ...state,
                loading: false,
                recipeTypes: state.recipeTypes.filter(
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
        case SET_CUSTOMISING:
            return {
                ...state,
                loading: false,
                customising: action.payload,
            };
        case SET_SORT:
            return {
                ...state,
                sortBy: action.payload,
            };
        case SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.payload,
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
        case CLEAR_CUSTOMISING:
            return {
                ...state,
                loading: false,
                customising: null,
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                loading: false,
                current: null,
            };
        case CLEAR_REVIEWS:
            return {
                ...state,
                loading: false,
                reviews: null,
            };
        default:
            return {
                ...state,
            };
    }
};
