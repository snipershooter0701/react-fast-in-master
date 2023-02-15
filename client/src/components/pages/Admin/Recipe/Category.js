import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import recipeContext from '../../../../context/recipe/recipeContext';
import InternalLink from '../../../reusable/InternalLink';
import Back from '../../../icons/Back';
import CategoryForm from './CategoryForm';
import Edit from '../../../icons/Edit';
import Loading from '../../../reusable/Loading';

const Category = () => {
    const { loading, categories, setCurrent } = useContext(recipeContext);

    return (
        <div className='cuisine-container'>
            <Switch>
                <Route exact path='/admin/recipes/categories'>
                    <InternalLink to='/admin/recipes'>
                        <div className='back-container'>
                            <Back fill='#f15a2e' width='18px' height='18px' />
                            <span>Back</span>
                        </div>
                    </InternalLink>
                    <div className='title'>
                        <h2>Categories</h2>
                        <InternalLink
                            variant='button'
                            to='/admin/recipes/categories/add'
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
                            <div
                                key={category.category_name}
                                className='category-row'
                            >
                                <div className='name'>
                                    {category.category_name}
                                </div>
                                <InternalLink
                                    to={`/admin/recipes/categories/edit/${category._id}`}
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
                        '/admin/recipes/categories/edit/:id',
                        '/admin/recipes/categories/add',
                    ]}
                    component={CategoryForm}
                />
                <Redirect to='404' />
            </Switch>
        </div>
    );
};

export default Category;
