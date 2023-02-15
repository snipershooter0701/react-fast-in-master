import React, { useReducer } from 'react';
import {
    ADD_FILTER,
    ALLERGIES_FILTER,
    CUISINE_FILTER,
    DURATION_FILTER,
    INGREDIENT_FILTER,
    RECIPE_TYPE_FILTER,
    REMOVE_FILTER,
    RESET_FILTERS,
    SET_AVAILABLE_ALLERGIES,
    SET_AVAILABLE_CUISINE,
    SET_AVAILABLE_DURATION,
    SET_AVAILABLE_INGREDIENTS,
    SET_AVAILABLE_RECIPE_TYPES,
    SET_FILTERS,
} from '../types';
import FilterContext from './filterContext';
import filterReducer from './filterReducer';

const FilterState = ({ children }) => {
    const initialState = {
        filters: [],
        availableIngredients: null,
        availableCuisine: null,
        availableRecipeTypes: null,
        availableAllergies: null,
        availableDurations: null,
    };

    const [state, dispatch] = useReducer(filterReducer, initialState);

    const {
        filters,
        availableIngredients,
        availableCuisine,
        availableRecipeTypes,
        availableAllergies,
        availableDurations,
    } = state;

    const getFilterName = (filter) => {
        switch (filter.type) {
            case INGREDIENT_FILTER:
                return filter.data.ingredient_name;
            case CUISINE_FILTER:
                return filter.data.cuisine_name;
            case RECIPE_TYPE_FILTER:
                return filter.data.recipe_type;
            case ALLERGIES_FILTER:
                return filter.data.name;
            case DURATION_FILTER:
                return `${filter.data._id} ${filter.data.duration} minutes`;
            default:
                return 'Filter';
        }
    };

    const setFilters = (filters) => {
        try {
            dispatch({
                type: SET_FILTERS,
                payload: filters,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const addFilter = (filter) => {
        try {
            dispatch({
                type: ADD_FILTER,
                payload: filter,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const removeFilter = (filter) => {
        switch (filter.type) {
            case INGREDIENT_FILTER:
                setAvailableIngredients([...availableIngredients, filter.data]);
                break;
            case CUISINE_FILTER:
                setAvailableCuisine([...availableCuisine, filter.data]);
                break;
            case RECIPE_TYPE_FILTER:
                setAvailableRecipeTypes([...availableRecipeTypes, filter.data]);
                break;
            case ALLERGIES_FILTER:
                setAvailableAllergies([...availableAllergies, filter.data]);
                break;
            case DURATION_FILTER:
                setAvailableDurations([...availableDurations, filter.data._id]);
                break;
            default:
                break;
        }
        dispatch({
            type: REMOVE_FILTER,
            payload: filter.data._id,
        });
    };

    const resetFilters = () => {
        try {
            dispatch({
                type: RESET_FILTERS,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const setAvailableIngredients = (ingredients) => {
        try {
            dispatch({
                type: SET_AVAILABLE_INGREDIENTS,
                payload: ingredients,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const setAvailableCuisine = (cuisines) => {
        try {
            dispatch({
                type: SET_AVAILABLE_CUISINE,
                payload: cuisines,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const setAvailableRecipeTypes = (recipeTypes) => {
        try {
            dispatch({
                type: SET_AVAILABLE_RECIPE_TYPES,
                payload: recipeTypes,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const setAvailableAllergies = (allergies) => {
        try {
            dispatch({
                type: SET_AVAILABLE_ALLERGIES,
                payload: allergies,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const setAvailableDurations = (durations) => {
        try {
            dispatch({
                type: SET_AVAILABLE_DURATION,
                payload: durations,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <FilterContext.Provider
            value={{
                filters,
                availableIngredients,
                availableCuisine,
                availableRecipeTypes,
                availableAllergies,
                availableDurations,
                getFilterName,
                setFilters,
                addFilter,
                removeFilter,
                resetFilters,
                setAvailableIngredients,
                setAvailableCuisine,
                setAvailableRecipeTypes,
                setAvailableAllergies,
                setAvailableDurations,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export default FilterState;
