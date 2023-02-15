import React, { useContext, useEffect, useState } from 'react';
import { Fragment } from 'react';
import filterContext from '../../../../context/filter/filterContext';
import recipeContext from '../../../../context/recipe/recipeContext';
import { CUISINE_FILTER } from '../../../../context/types';
import Loading from '../../../reusable/Loading';
// import Dropdown from '../../../reusable/Dropdown';

const CuisineFilter = () => {
    const { cuisines, loading, getCuisines } = useContext(recipeContext);
    const { addFilter, availableCuisine, setAvailableCuisine } = useContext(
        filterContext
    );

    // const [open, setOpen] = useState(false);
    // const [searchResult, setSearchResult] = useState([]);
    // const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (cuisines === null) {
            getCuisines();
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (cuisines !== null && availableCuisine === null) {
            setAvailableCuisine(cuisines);
        }
        // eslint-disable-next-line
    }, [cuisines, availableCuisine]);

    // const searchCuisines = (e) => {
    //     const { value } = e.target;

    //     setSearchTerm(value);

    //     if (!value) {
    //         return setOpen(false);
    //     }

    //     const results = availableCuisine.filter(({ cuisine_name }) =>
    //         cuisine_name.includes(value)
    //     );
    //     setSearchResult(results);
    //     setOpen(true);
    // };

    const addCuisine = (cuisine) => {
        // setOpen(false);
        // setSearchTerm('');

        addFilter({
            type: CUISINE_FILTER,
            data: cuisine,
        });

        const remainingCuisines = availableCuisine.filter(
            ({ _id }) => _id !== cuisine._id
        );
        setAvailableCuisine(remainingCuisines);
    };

    if (availableCuisine === null) {
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
                placeholder='Search for a cuisine...'
                onChange={searchCuisines}
                autoComplete='off'
                value={searchTerm}
            />
            <div className='dropdown-ingredients'>
                <Dropdown open={open}>
                    {searchResult
                        .sort((a, b) =>
                            a.cuisine_name.localeCompare(b.cuisine_name)
                        )
                        .map((cuisine) => (
                            <div
                                onClick={() => addCuisine(cuisine)}
                                key={cuisine._id}
                            >
                                {cuisine.cuisine_name}
                            </div>
                        ))}
                </Dropdown>
            </div> */}
            <div className='filter-list'>
                {availableCuisine.map((cuisine) => (
                    <div onClick={() => addCuisine(cuisine)} key={cuisine._id}>
                        {cuisine.cuisine_name}
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default CuisineFilter;
