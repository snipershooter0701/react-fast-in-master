import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import recipeContext from '../../../../context/recipe/recipeContext';
import Back from '../../../icons/Back';
import InternalLink from '../../../reusable/InternalLink';
import Loading from '../../../reusable/Loading';
const RecipeTypeForm = () => {
    const {
        current,
        success,
        getRecipeType,
        updateRecipeType,
        createRecipeType,
        deleteRecipeType,
        setCurrent,
        clearCurrent,
        setSuccess,
    } = useContext(recipeContext);

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        if (current === null && id) {
            getRecipeType(id);
            return;
        }

        if (current !== null) {
            setRecipeType(current.recipe_type);
            return;
        }

        setCurrent('');

        // eslint-disable-next-line
    }, [current, id]);

    useEffect(() => {
        if (success) {
            history.push('/admin/recipes/types');
            setSuccess(false);
        }
    }, [success]);

    const [recipeType, setRecipeType] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        id
            ? updateRecipeType(current._id, recipeType)
            : createRecipeType(recipeType);
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setRecipeType(value);
    };

    return (
        <div className='recipe-type-form'>
            <InternalLink to='/admin/recipes/types' onClick={clearCurrent}>
                <div className='back-container'>
                    <Back fill='#f15a2e' width='18px' height='18px' />
                    <span>Back</span>
                </div>
            </InternalLink>
            <h2>{id ? 'Edit ' : 'Add New'} Recipe Type</h2>
            {current !== null ? (
                <form onSubmit={onSubmit}>
                    <div className='row'>
                        <label>Recipe Type Name</label>
                        <input
                            type='text'
                            name='cuisine_name'
                            value={recipeType || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div class='button-container'>
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
                                onClick={() => deleteRecipeType(current._id)}
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

export default RecipeTypeForm;
