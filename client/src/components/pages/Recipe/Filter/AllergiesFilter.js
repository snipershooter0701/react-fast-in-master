import React, { useContext, useEffect, useState } from 'react';
import { Fragment } from 'react';
import filterContext from '../../../../context/filter/filterContext';
import ingredientContext from '../../../../context/ingredient/ingredientContext';
import { ALLERGIES_FILTER } from '../../../../context/types';
import Loading from '../../../reusable/Loading';
// import Dropdown from '../../../reusable/Dropdown';

const AllergiesFilter = () => {
    const { allergies, getAllergies } = useContext(ingredientContext);
    const { addFilter, availableAllergies, setAvailableAllergies } = useContext(
        filterContext
    );

    const [open, setOpen] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (allergies === null) {
            getAllergies();
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (allergies !== null && availableAllergies === null) {
            setAvailableAllergies(allergies);
        }
        // eslint-disable-next-line
    }, [allergies, availableAllergies]);

    // const searchAllergy = (e) => {
    //     const { value } = e.target;

    //     setSearchTerm(value);

    //     if (!value) {
    //         return setOpen(false);
    //     }

    //     const results = availableAllergies.filter(({ name }) =>
    //         name.includes(value)
    //     );
    //     setSearchResult(results);
    //     setOpen(true);
    // };

    const addAllergy = (allergy) => {
        setOpen(false);
        setSearchTerm('');

        addFilter({
            type: ALLERGIES_FILTER,
            data: allergy,
        });

        const remainingAllergies = availableAllergies.filter(
            ({ _id }) => _id !== allergy._id
        );
        setAvailableAllergies(remainingAllergies);
    };

    if (availableAllergies === null) {
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
                placeholder='Search for an allergy...'
                onChange={searchAllergy}
                autoComplete='off'
                value={searchTerm}
            />
            <div className='dropdown-ingredients'>
                <Dropdown open={open}>
                    {searchResult
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((allergy) => (
                            <div
                                onClick={() => addAllergy(allergy)}
                                key={allergy._id}
                            >
                                {allergy.name}
                            </div>
                        ))}
                </Dropdown>
            </div> */}
            <div className='filter-list'>
                {availableAllergies.map((allergy) => (
                    <div onClick={() => addAllergy(allergy)} key={allergy._id}>
                        {allergy.name}
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default AllergiesFilter;
