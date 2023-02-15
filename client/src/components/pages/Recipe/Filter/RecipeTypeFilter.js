import React, { useContext, useEffect, useState } from 'react';
import { Fragment } from 'react';
import filterContext from '../../../../context/filter/filterContext';
import recipeContext from '../../../../context/recipe/recipeContext';
import { RECIPE_TYPE_FILTER } from '../../../../context/types';
import Loading from '../../../reusable/Loading';
// import Dropdown from '../../../reusable/Dropdown';

const RecipeTypeFilter = () => {
    const { recipeTypes, getRecipeTypes } = useContext(recipeContext);
    const {
        addFilter,
        availableRecipeTypes,
        setAvailableRecipeTypes,
    } = useContext(filterContext);

    // const [open, setOpen] = useState(false);
    // const [searchResult, setSearchResult] = useState([]);
    // const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (recipeTypes === null) {
            getRecipeTypes();
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (recipeTypes !== null && availableRecipeTypes === null) {
            setAvailableRecipeTypes(recipeTypes);
        }
        // eslint-disable-next-line
    }, [recipeTypes, availableRecipeTypes]);

    // const searchRecipeType = (e) => {
    //     const { value } = e.target;

    //     setSearchTerm(value);

    //     if (!value) {
    //         return setOpen(false);
    //     }

    //     const results = availableRecipeTypes.filter(({ recipe_type }) =>
    //         recipe_type.includes(value)
    //     );
    //     setSearchResult(results);
    //     setOpen(true);
    // };

    const addRecipeType = (recipeType) => {
        // setOpen(false);
        // setSearchTerm('');

        addFilter({
            type: RECIPE_TYPE_FILTER,
            data: recipeType,
        });

        const remainingRecipeTypes = availableRecipeTypes.filter(
            ({ _id }) => _id !== recipeType._id
        );
        setAvailableRecipeTypes(remainingRecipeTypes);
    };

    if (availableRecipeTypes === null) {
        return (
            <Fragment>
                <Loading />
            </Fragment>
        );
    }

    return (
        <Fragment>
            {/* <input
                type='search'
                placeholder='Search for a recipe type...'
                onChange={searchRecipeType}
                autoComplete='off'
                value={searchTerm}
            />
            <div className='dropdown-ingredients'>
                <Dropdown open={open}>
                    {searchResult
                        .sort((a, b) =>
                            a.recipe_type.localeCompare(b.recipe_type)
                        )
                        .map((recipeType) => (
                            <div
                                onClick={() => addRecipeType(recipeType)}
                                key={recipeType._id}
                            >
                                {recipeType.recipe_type}
                            </div>
                        ))}
                </Dropdown>
            </div> */}
            <div className='filter-list'>
                {availableRecipeTypes.map((recipeType) => (
                    <div
                        onClick={() => addRecipeType(recipeType)}
                        key={recipeType._id}
                    >
                        {recipeType.recipe_type}
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default RecipeTypeFilter;
