import React, { useContext, useState } from 'react';
import { Fragment } from 'react';
import filterContext from '../../../../context/filter/filterContext';
import Cancel from '../../../icons/Cancel';
import IngredientFilter from './IngredientFilter';
import CuisineFilter from './CuisineFilter';
import RecipeTypeFilter from './RecipeTypeFilter';
import AllergyFilter from './AllergiesFilter';
import DurationFilter from './DurationFIlter';

const Filter = () => {
    const { filters, removeFilter, getFilterName } = useContext(filterContext);

    const tabs = [
        {
            label: 'ingredients',
            render: <IngredientFilter />,
        },
        {
            label: 'cuisine',
            render: <CuisineFilter />,
        },
        {
            label: 'type',
            render: <RecipeTypeFilter />,
        },
        {
            label: 'allergies',
            render: <AllergyFilter />,
        },
        {
            label: 'duration',
            render: <DurationFilter />,
        },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <Fragment>
            <div className='selected-filter-container'>
                {filters.map((filter, index) => (
                    <div key={index} className='selected-filter'>
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
            <div className='filter-container'>
                <div className='filter-labels'>
                    {tabs.map((tab) => (
                        <div
                            key={tab.label}
                            onClick={() => setActiveTab(tab)}
                            className={`labels ${
                                activeTab.label === tab.label ? 'active' : ''
                            }`}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>
                <div className='filters'>{activeTab.render}</div>
            </div>
        </Fragment>
    );
};

export default Filter;
