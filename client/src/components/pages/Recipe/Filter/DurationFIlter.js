import React, { useContext, useEffect, useState } from 'react';
import { Fragment } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import filterContext from '../../../../context/filter/filterContext';
import {
    DURATION_FILTER,
    LESS_THAN,
    MORE_THAN,
} from '../../../../context/types';
import Select from '../../../reusable/Select';
import Loading from '../../../reusable/Loading';

const DurationFilter = () => {
    const {
        setAvailableDurations,
        availableDurations,
        addFilter,
        filters,
    } = useContext(filterContext);

    useEffect(() => {
        if (availableDurations === null) {
            setAvailableDurations(options);
            return;
        }

        if (availableDurations.length === options.length) {
            setRange(initialState);
            return;
        }

        setSelectedOption(availableDurations[0]);

        const filter = filters.find(({ type }) => type === DURATION_FILTER);

        if (filter.data._id === LESS_THAN) {
            setRange({
                ...initialState,
                max: filter.data.duration - 1,
                range: filter.data.duration - 1,
            });
            return;
        }

        setRange({
            ...initialState,
            min: filter.data.duration + 1,
            range: filter.data.duration + 1,
        });
        // eslint-disable-next-line
    }, [availableDurations]);

    const initialState = {
        min: 1,
        max: 100,
        range: 20,
    };

    const options = [LESS_THAN, MORE_THAN];
    const [range, setRange] = useState(initialState);
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const changeRange = (value) => {
        if (!availableDurations.length) {
            return;
        }

        setRange((prev) => ({ ...prev, range: value }));
    };

    const addDuration = () => {
        addFilter({
            type: DURATION_FILTER,
            data: {
                _id: selectedOption,
                duration: range.range,
            },
        });
        const remainingDurations = availableDurations.filter(
            (option) => option !== selectedOption
        );

        setAvailableDurations(remainingDurations);
        setSelectedOption(remainingDurations[0]);

        if (selectedOption === LESS_THAN) {
            setRange((prev) => ({
                ...prev,
                max: range.range - 1,
                range: range.range - 1,
            }));
            return;
        }

        setRange((prev) => ({
            ...prev,
            min: range.range + 1,
            range: range.range + 1,
        }));
    };

    if (availableDurations === null) {
        return (
            <Fragment>
                <Loading />
            </Fragment>
        );
    }

    return (
        <div className='duration-filter-container'>
            <Select
                value={selectedOption || 'No more options'}
                onChange={(value) => setSelectedOption(value)}
                options={availableDurations.map((option) => ({
                    label: option,
                    value: option,
                }))}
            />
            <div className='slider-container'>
                <Slider
                    min={range.min}
                    max={range.max}
                    value={range.range}
                    onChange={changeRange}
                    tooltip={!!availableDurations.length}
                />
                <span>minutes</span>
            </div>
            <button
                className={`${
                    availableDurations.length ? '' : 'disabled'
                } button rounded-md primary`}
                type='button'
                onClick={addDuration}
                disabled={!availableDurations.length}
            >
                add
            </button>
        </div>
    );
};

export default DurationFilter;
