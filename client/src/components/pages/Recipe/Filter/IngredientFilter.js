import React, { useContext, useEffect, useState } from 'react';
import { Fragment } from 'react';
import filterContext from '../../../../context/filter/filterContext';
import ingredientContext from '../../../../context/ingredient/ingredientContext';
import { INGREDIENT_FILTER } from '../../../../context/types';
import Dropdown from '../../../reusable/Dropdown';

const IngredientFilter = () => {
    const { ingredients, getIngredients } = useContext(ingredientContext);
    const {
        addFilter,
        availableIngredients,
        setAvailableIngredients,
    } = useContext(filterContext);

    const [open, setOpen] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (ingredients === null) {
            getIngredients();
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (ingredients !== null && availableIngredients === null) {
            setAvailableIngredients(ingredients);
        }
        // eslint-disable-next-line
    }, [ingredients, availableIngredients]);

    const searchIngredients = (e) => {
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
        setOpen(false);
        setSearchTerm('');

        addFilter({
            type: INGREDIENT_FILTER,
            data: ingredient,
        });

        const remainingIngredients = availableIngredients.filter(
            ({ _id }) => _id !== ingredient._id
        );
        setAvailableIngredients(remainingIngredients);
    };

    if (availableIngredients === null) {
        return <Fragment />;
    }

    return (
        <Fragment>
            <input
                type='search'
                placeholder='Search for an ingredient...'
                onChange={searchIngredients}
                autoComplete='off'
                value={searchTerm}
            />
            <div className='dropdown-ingredients'>
                <Dropdown open={open}>
                    {searchResult
                        .sort((a, b) =>
                            a.ingredient_name.localeCompare(b.ingredient_name)
                        )
                        .map((ingredient) => (
                            <div
                                onClick={() => addIngredient(ingredient)}
                                key={ingredient._id}
                            >
                                {ingredient.ingredient_name}
                            </div>
                        ))}
                </Dropdown>
            </div>
        </Fragment>
    );
};

export default IngredientFilter;
