import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import recipeContext from '../../../../context/recipe/recipeContext';
import Back from '../../../icons/Back';
import InternalLink from '../../../reusable/InternalLink';
import Loading from '../../../reusable/Loading';

const CuisineForm = () => {
    const {
        current,
        success,
        getCuisine,
        updateCuisine,
        createCuisine,
        deleteCuisine,
        setCurrent,
        clearCurrent,
        setSuccess,
    } = useContext(recipeContext);

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        if (current === null && id) {
            getCuisine(id);
            return;
        }

        if (current !== null) {
            setCuisine(current.cuisine_name);
            return;
        }

        setCurrent('');

        // eslint-disable-next-line
    }, [current, id]);

    useEffect(() => {
        if (success) {
            history.push('/admin/recipes/cuisines');
            setSuccess(false);
        }
    }, [success]);

    const [cuisine, setCuisine] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        id ? updateCuisine(current._id, cuisine) : createCuisine(cuisine);
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setCuisine(value);
    };

    return (
        <div className='cuisine-form'>
            <InternalLink to='/admin/recipes/cuisines' onClick={clearCurrent}>
                <div className='back-container'>
                    <Back fill='#f15a2e' width='18px' height='18px' />
                    <span>Back</span>
                </div>
            </InternalLink>
            <h2>{id ? 'Edit ' : 'Add New'} Cuisine</h2>
            {current !== null ? (
                <form onSubmit={onSubmit}>
                    <div className='row'>
                        <label>Cuisine Name</label>

                        <input
                            type='text'
                            name='cuisine_name'
                            value={cuisine || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='button-container'>
                        <button
                            type='submit'
                            className='button primary rounded-md'
                        >
                            {id ? 'save changes' : 'add'}
                        </button>
                        {id ? (
                            <button
                                className='button rounded-md delete'
                                type='button'
                                onClick={() => deleteCuisine(current._id)}
                            >
                                Delete
                            </button>
                        ) : (
                            ''
                        )}
                    </div>
                </form>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default CuisineForm;
