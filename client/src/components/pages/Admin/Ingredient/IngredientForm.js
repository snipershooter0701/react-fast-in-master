import React, { useContext, useEffect, useState } from 'react';
import InternalLink from '../../../reusable/InternalLink';
import IngredientContext from '../../../../context/ingredient/ingredientContext';
import { useParams, useHistory } from 'react-router-dom';
import Select from '../../../reusable/Select';
import Back from '../../../icons/Back';
import Loading from '../../../reusable/Loading';

const IngredientForm = () => {
    const {
        loading,
        current,
        success,
        categories,
        allergies,
        getIngredient,
        createIngredient,
        updateIngredient,
        deleteIngredient,
        setCurrent,
        clearCurrent,
        setSuccess,
    } = useContext(IngredientContext);

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        if (current === null && id) {
            getIngredient(id);
            return;
        }

        if (current !== null) {
            setIngredient(current);
            return;
        }

        if (categories !== null && allergies !== null) {
            const initialState = {
                image: 'ignore',
                ingredient_name: '',
                ingredient_category: categories[0],
                allergy: allergies[0],
            };
            setCurrent(initialState);
            setIngredient(initialState);
        }

        // eslint-disable-next-line
    }, [current, id, categories, allergies]);

    useEffect(() => {
        if (success) {
            history.push('/admin/ingredients');
            setSuccess(false);
        }
    }, [success]);

    const [ingredient, setIngredient] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIngredient((prev) => ({ ...prev, [name]: value }));
    };

    const categoryChange = (value) => {
        const category = categories.find(({ _id }) => _id === value);
        setIngredient((prev) => ({
            ...prev,
            ingredient_category: category,
        }));
    };

    const allergyChange = (value) => {
        const allergy = allergies.find(({ _id }) => _id === value);
        setIngredient((prev) => ({
            ...prev,
            allergy,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        id ? updateIngredient(ingredient) : createIngredient(ingredient);
        clearCurrent();
    };

    const { ingredient_name, ingredient_category, allergy } = ingredient;

    return (
        <div className='ingredient-form'>
            <InternalLink to='/admin/ingredients' onClick={clearCurrent}>
                <div className='back-container'>
                    <Back fill='#f15a2e' width='18px' height='18px' />
                    <span>Back</span>
                </div>
            </InternalLink>
            <h2>{id ? 'Edit ' : 'Add New'} Ingredient</h2>
            {current !== null &&
            ingredient &&
            categories !== null &&
            allergies !== null &&
            !loading ? (
                <form onSubmit={onSubmit}>
                    {/* <div className='row'>
                        <label>Ingredient Image</label>
                        <input
                            type='text'
                            name='image'
                            value={image}
                            onChange={handleChange}
                            placeholder='Image'
                            required
                        />
                    </div> */}
                    <div className='row'>
                        <label>Ingredient Name</label>
                        <input
                            type='text'
                            name='ingredient_name'
                            value={ingredient_name}
                            onChange={handleChange}
                            placeholder='Ingredient Name'
                            required
                        />
                    </div>
                    <div className='row'>
                        <div className='half'>
                            <div>
                                <label>Category</label>
                                <Select
                                    value={ingredient_category.name}
                                    options={categories.map(
                                        ({ name, _id }) => ({
                                            label: name,
                                            value: _id,
                                        })
                                    )}
                                    onChange={categoryChange}
                                />
                            </div>
                            <div>
                                <label>Allergy</label>
                                <Select
                                    value={allergy.name}
                                    options={allergies.map(({ name, _id }) => ({
                                        label: name,
                                        value: _id,
                                    }))}
                                    onChange={allergyChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='button-container'>
                        <button
                            className='button primary rounded-md'
                            type='submit'
                        >
                            {id ? 'Save Changes' : 'Add'}
                        </button>
                        {id ? (
                            <button
                                className='button rounded-md delete'
                                type='button'
                                onClick={() => deleteIngredient(id)}
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

export default IngredientForm;
