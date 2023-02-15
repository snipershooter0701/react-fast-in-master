import React, { useContext, useEffect, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import filterContext from '../../../context/filter/filterContext';
import ingredientContext from '../../../context/ingredient/ingredientContext';
import { INGREDIENT_FILTER } from '../../../context/types';
import Cancel from '../../icons/Cancel';
import Dropdown from '../../reusable/Dropdown';
import InternalLink from '../../reusable/InternalLink';

const IngredientSearch = () => {
    const { ingredients, getIngredients, loading } = useContext(
        ingredientContext
    );
    const {
        filters,
        addFilter,
        removeFilter,
        getFilterName,
        availableIngredients,
        setAvailableIngredients,
    } = useContext(filterContext);
    const [searchResult, setSearchResult] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (ingredients === null) {
            getIngredients();
            return;
        }

        setAvailableIngredients(ingredients);
        // eslint-disable-next-line
    }, [ingredients]);

    const searchIngredients = (e) => {
        if (ingredients === null && loading) {
            return;
        }

        const { value } = e.target;

        setSearchTerm(value);

        if (!value) {
            return setOpen(false);
        }
        const results = availableIngredients.filter(({ ingredient_name }) =>
            ingredient_name.includes(value)
        );
        setSearchResult(results);
        setOpen(true);
    };

    const addIngredient = (ingredient) => {
        closeDropdown();

        addFilter({
            type: INGREDIENT_FILTER,
            data: ingredient,
        });

        const remainingIngredients = availableIngredients.filter(
            ({ _id }) => _id !== ingredient._id
        );
        setAvailableIngredients(remainingIngredients);
    };

    const searchRecipe = (e) => {
        if (!filters.length) {
            e.preventDefault();
        }
    };

    const closeDropdown = () => {
        setSearchTerm('');
        setOpen(false);
    };

    return (
        <div className='search-bar'>
            <span>I want to cook with</span>

            <ClickAwayListener onClickAway={closeDropdown}>
                <input
                    type='search'
                    placeholder={`${
                        ingredients !== null && !loading
                            ? 'Enter Ingredients...'
                            : 'Loading ingredients...'
                    }`}
                    value={searchTerm}
                    onChange={searchIngredients}
                    autoComplete='off'
                />
                <div className='dropdown-ingredients'>
                    <Dropdown open={open}>
                        {searchResult.length ? (
                            searchResult
                                .sort((a, b) =>
                                    a.ingredient_name.localeCompare(
                                        b.ingredient_name
                                    )
                                )
                                .map((ingredient) => (
                                    <div
                                        onClick={() =>
                                            addIngredient(ingredient)
                                        }
                                        key={ingredient._id}
                                    >
                                        {ingredient.ingredient_name}
                                    </div>
                                ))
                        ) : (
                            <div>No matching ingredient</div>
                        )}
                    </Dropdown>
                </div>
            </ClickAwayListener>

            <div className='selected-ingredient-container'>
                {filters.map((filter, index) => (
                    <div key={index} className='selected-ingredient'>
                        <div>{getFilterName(filter)}</div>
                        <button
                            type='button'
                            onClick={() => removeFilter(filter)}
                        >
                            <Cancel fill='#f15a2e' width='10px' height='10px' />
                        </button>
                    </div>
                ))}
            </div>
            <InternalLink
                onClick={searchRecipe}
                to='/recipes'
                variant='button'
                className='rounded-md primary'
            >
                Find recipe
            </InternalLink>
        </div>
    );
};

export default IngredientSearch;
