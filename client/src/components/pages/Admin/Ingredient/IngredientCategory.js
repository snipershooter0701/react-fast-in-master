import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import IngredientContext from '../../../../context/ingredient/ingredientContext';
import Back from '../../../icons/Back';
import InternalLink from '../../../reusable/InternalLink';
import CategoryForm from './CategoryForm';
import Edit from '../../../icons/Edit';
import Loading from '../../../reusable/Loading';

const IngredientCategory = () => {
    const { categories, loading, setCurrent } = useContext(IngredientContext);

    return (
        <div className='ingredient-category-container'>
            <Switch>
                <Route exact path='/admin/ingredients/categories'>
                    <InternalLink to='/admin/ingredients'>
                        <div className='back-container'>
                            <Back fill='#f15a2e' width='18px' height='18px' />
                            <span>Back</span>
                        </div>
                    </InternalLink>
                    <div className='title'>
                        <h2>Categories</h2>
                        <InternalLink
                            variant='button'
                            to='/admin/ingredients/categories/add'
                            className='btn rounded-md primary'
                        >
                            ADD new category
                        </InternalLink>
                    </div>
                    <div className='table-title'>
                        <h4>Categories</h4>
                    </div>
                    {categories !== null && !loading ? (
                        categories.map((category) => (
                            <div key={category.name} className='category-row'>
                                <div className='name'>{category.name}</div>
                                <InternalLink
                                    to={`/admin/ingredients/categories/edit/${category._id}`}
                                    onClick={() => setCurrent(category)}
                                >
                                    <Edit
                                        fill='#000'
                                        weight='22px'
                                        height='22px'
                                    />
                                </InternalLink>
                            </div>
                        ))
                    ) : (
                        <Loading />
                    )}
                </Route>
                <Route
                    exact
                    path={[
                        '/admin/ingredients/categories/edit/:id',
                        '/admin/ingredients/categories/add',
                    ]}
                    component={CategoryForm}
                />
                <Redirect to='/404' />
            </Switch>
        </div>
    );
};

export default IngredientCategory;
