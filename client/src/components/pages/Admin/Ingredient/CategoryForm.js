import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import IngredientContext from '../../../../context/ingredient/ingredientContext';
import Back from '../../../icons/Back';
import InternalLink from '../../../reusable/InternalLink';
import Loading from '../../../reusable/Loading';

const CategoryForm = () => {
    const {
        current,
        success,
        createCategory,
        getCategory,
        setCurrent,
        clearCurrent,
        updateCategory,
        deleteCategory,
        setSuccess,
    } = useContext(IngredientContext);

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        if (current === null && id) {
            getCategory(id);
            return;
        }

        if (current !== null) {
            setCategory(current.name);
            return;
        }

        setCurrent('');

        // eslint-disable-next-line
    }, [current, id]);

    useEffect(() => {
        if (success) {
            history.push('/admin/ingredients/categories');
            setSuccess(false);
        }
    }, [success]);

    const [category, setCategory] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        id ? updateCategory(current._id, category) : createCategory(category);
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setCategory(value);
    };

    return (
        <div className='category-form'>
            <InternalLink
                to='/admin/ingredients/categories'
                onClick={clearCurrent}
            >
                <div className='back-container'>
                    <Back fill='#f15a2e' width='18px' height='18px' />
                    <span>Back</span>
                </div>
            </InternalLink>
            <h2>{id ? 'Edit ' : 'Add New'} Category</h2>
            {current !== null ? (
                <form onSubmit={onSubmit}>
                    <div className='row'>
                        <label>Category Name</label>
                        <input
                            type='text'
                            name='category_name'
                            value={category || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='button-container'>
                        <button
                            className='button primary rounded-md'
                            type='submit'
                        >
                            {id ? 'save changes' : 'add'}
                        </button>
                        {id ? (
                            <button
                                className='button rounded-md delete'
                                type='button'
                                onClick={() => deleteCategory(current._id)}
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

export default CategoryForm;
