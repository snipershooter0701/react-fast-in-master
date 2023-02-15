import React, { useEffect, useContext, useState } from 'react';
import header from '../../../assets/img/recipes-header.jpg';
import recipeContext from '../../../context/recipe/recipeContext';
import ImageRecognition from '../Recipe/ImageRecognition';
import Recipe from './Recipe';
import { Redirect, Route, Switch } from 'react-router-dom';
import Dropdown from '../../reusable/Dropdown';
import ChevronDown from '../../icons/ChevronDown';
import RecipeCard from './RecipeCard';
import Filter from './Filter/Filter';
import filterContext from '../../../context/filter/filterContext';
import {
    ALLERGIES_FILTER,
    CUISINE_FILTER,
    DURATION_FILTER,
    INGREDIENT_FILTER,
    LESS_THAN,
    RECIPE_TYPE_FILTER,
    SORT_BY_RATING,
    SORT_BY_VIEWS,
} from '../../../context/types';
import ClickAwayListener from 'react-click-away-listener';
import userContext from '../../../context/users/userContext';
import ingredientContext from '../../../context/ingredient/ingredientContext';
import Loading from '../../reusable/Loading';

const Recipes = () => {
    const { profile } = useContext(userContext);
    const {
        searchTerm,
        getRecipes,
        recipes,
        loading,
        sortBy,
        setSortBy,
    } = useContext(recipeContext);
    const { allergies, getAllergies } = useContext(ingredientContext);
    const {
        resetFilters,
        filters,
        addFilter,
        setAvailableAllergies,
    } = useContext(filterContext);

    const [filteredRecipe, setFilteredRecipe] = useState([]);
    const [halalState, setHalalState] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        if (allergies === null) {
            getAllergies();
            return;
        }

        if (filters.length) {
            setShowFilter(true);
        }

        if (
            profile === null ||
            !profile.allergies ||
            !profile.allergies.length
        ) {
            return;
        }

        if (profile.halal) {
            setHalalState(true);
        }

        if (profile.allergies && profile.allergies.length) {
            const remainingAllergies = allergies.filter((allergy) => {
                if (!~profile.allergies.indexOf(allergy._id)) {
                    return true;
                }
                addFilter({
                    type: ALLERGIES_FILTER,
                    data: allergy,
                });
                return false;
            });
            setAvailableAllergies(remainingAllergies);
        }

        return () => {
            resetFilters();
        };
        // eslint-disable-next-line
    }, [profile, allergies]);

    useEffect(() => {
        if (recipes === null) {
            getRecipes();
            return;
        }

        const getFilterIDs = (filterType) => {
            return filters.reduce((filterResult, { type, data }) => {
                if (type === filterType) {
                    filterResult.push(data._id);
                }
                return filterResult;
            }, []);
        };

        const checkIngredients = (ingredients) => {
            const ingredientFilters = getFilterIDs(INGREDIENT_FILTER);

            if (!ingredientFilters.length) {
                return true;
            }

            return ingredientFilters.every((filterID) =>
                ingredients.map(({ _id }) => _id).includes(filterID)
            );
        };

        const checkType = (recipeType) => {
            const typeFilters = getFilterIDs(RECIPE_TYPE_FILTER);

            if (!typeFilters.length) {
                return true;
            }

            return ~typeFilters.indexOf(recipeType._id);
        };

        const checkCuisine = (cuisine) => {
            const cuisineFilters = getFilterIDs(CUISINE_FILTER);

            if (!cuisineFilters.length) {
                return true;
            }

            return ~cuisineFilters.indexOf(cuisine._id);
        };

        const checkAllergies = (ingredients) => {
            const allergyFilters = getFilterIDs(ALLERGIES_FILTER);

            if (!allergyFilters.length) {
                return true;
            }

            return allergyFilters.every(
                (allergyID) =>
                    !ingredients
                        .map(({ allergy }) => allergy)
                        .includes(allergyID)
            );
        };

        const checkDuration = (duration) => {
            const durationFilters = filters.reduce(
                (filterResult, { type, data }) => {
                    if (type === DURATION_FILTER) {
                        filterResult.push(data);
                    }
                    return filterResult;
                },
                []
            );

            if (!durationFilters.length) {
                return true;
            }

            return durationFilters.every((filter) =>
                filter._id === LESS_THAN
                    ? duration < filter.duration
                    : duration > filter.duration
            );
        };

        const checkHalal = (halal) => {
            if (!halalState) {
                return true;
            }
            return halal === halalState;
        };

        const filtered = recipes.filter(
            ({ ingredients, recipe_type, cuisine, duration, halal }) =>
                checkIngredients(ingredients) &&
                checkCuisine(cuisine) &&
                checkType(recipe_type) &&
                checkAllergies(ingredients) &&
                checkDuration(duration) &&
                checkHalal(halal)
        );

        setFilteredRecipe(filtered);

        // eslint-disable-next-line
    }, [recipes, filters]);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };

    const sortRecipes = (sort) => {
        closeDropdown();
        setSortBy(sort);
    };

    const toggleFilter = () => {
        setShowFilter((prev) => !prev);
    };

    return (
        <div>
            <Switch>
                <Route exact path='/recipes'>
                    <div className='recipes'>
                        <div
                            className='header'
                            style={{ background: 'url(' + header + ')' }}
                        >
                            <div className='container'>
                                <h1 className='white'>All Recipes</h1>
                            </div>
                        </div>
                        <ImageRecognition />
                        <div className='filter container'>
                            <div className='filter-sort-container'>
                                <div className='filter-reset'>
                                    <button
                                        type='button'
                                        className={showFilter ? 'active' : ''}
                                        onClick={toggleFilter}
                                    >
                                        Filter
                                    </button>
                                    <button
                                        type='button'
                                        onClick={resetFilters}
                                    >
                                        Reset
                                    </button>
                                </div>
                                <div className='sort'>
                                    <ClickAwayListener
                                        onClickAway={closeDropdown}
                                    >
                                        <div
                                            className='filter-icon'
                                            onClick={toggleDropdown}
                                        >
                                            Sort by: {sortBy}
                                            <ChevronDown
                                                fill='#f15e2a'
                                                width='22px'
                                                height='22px'
                                            />
                                        </div>
                                        <Dropdown
                                            onClose={closeDropdown}
                                            open={showDropdown}
                                        >
                                            <button
                                                onClick={() => {
                                                    sortRecipes(SORT_BY_RATING);
                                                }}
                                            >
                                                {SORT_BY_RATING}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    sortRecipes(SORT_BY_VIEWS)
                                                }
                                            >
                                                {SORT_BY_VIEWS}
                                            </button>
                                        </Dropdown>
                                    </ClickAwayListener>
                                </div>
                            </div>
                            {showFilter ? <Filter /> : ''}
                        </div>
                        <div className='recipe-container container'>
                            {recipes !== null && !loading ? (
                                filters ? (
                                    filteredRecipe.length ? (
                                        filteredRecipe
                                            .filter(({ recipe_name }) =>
                                                recipe_name
                                                    .toUpperCase()
                                                    .includes(
                                                        searchTerm.toUpperCase()
                                                    )
                                            )
                                            .sort(
                                                (a, b) => b[sortBy] - a[sortBy]
                                            )
                                            .map((recipe) => (
                                                <RecipeCard
                                                    key={recipe._id}
                                                    recipe={recipe}
                                                />
                                            ))
                                    ) : (
                                        'No recipe matching filters'
                                    )
                                ) : recipes.length ? (
                                    recipes
                                        .filter(({ recipe_name }) =>
                                            recipe_name
                                                .toUpperCase()
                                                .includes(
                                                    searchTerm.toUpperCase()
                                                )
                                        )
                                        .sort((a, b) => b[sortBy] - a[sortBy])
                                        .map((recipe) => (
                                            <RecipeCard
                                                key={recipe._id}
                                                recipe={recipe}
                                            />
                                        ))
                                ) : (
                                    'No recipes'
                                )
                            ) : (
                                <Loading />
                            )}
                        </div>
                    </div>
                </Route>
                <Route exact path='/recipes/:id' component={Recipe} />
                <Redirect to='/404' />
            </Switch>
        </div>
    );
};

export default Recipes;
