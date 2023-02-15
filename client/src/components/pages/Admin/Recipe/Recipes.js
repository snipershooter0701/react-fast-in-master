import React, { useContext, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import RecipeContext from '../../../../context/recipe/recipeContext';
import InternalLink from '../../../reusable/InternalLink';
import RecipeItem from './RecipeItem';
import Cuisine from './Cuisine';
import RecipeType from './RecipeType';
import RecipeForm from './RecipeForm';
import Category from './Category';
import Loading from '../../../reusable/Loading';

const Recipes = () => {
    const {
        getIngredients,
        getRecipesByPage,
        getCategories,
        getCuisines,
        getRecipeTypes,
        currentPageData,
        loading,
        total,
        page,
        limit,
        setPage,
    } = useContext(RecipeContext);

    useEffect(() => {
        if (currentPageData === null) {
            getRecipesByPage(page);
        }
        getIngredients();
        getCategories();
        getCuisines();
        getRecipeTypes();
        // eslint-disable-next-line
    }, []);

    const changePage = async (num) => {
        setPage(num + 1);
        getRecipesByPage(num + 1);
    };

    return (
        <section id='recipes' className='background'>
            <Switch>
                <Route exact path='/admin/recipes'>
                    <div className='head'>
                        <div className='title'>
                            <h2>Manage Recipes</h2>
                            <div>
                                <InternalLink
                                    to='/admin/recipes/add'
                                    variant='button'
                                    className='btn rounded-md primary'
                                >
                                    add new record
                                </InternalLink>
                            </div>
                        </div>
                        <div className='table-title'>
                            <h4>Recipes</h4>
                            <div className='category-container'>
                                <InternalLink
                                    to='/admin/recipes/categories'
                                    variant='text'
                                >
                                    categories
                                </InternalLink>
                                <InternalLink
                                    to='/admin/recipes/cuisines'
                                    variant='text'
                                >
                                    cuisines
                                </InternalLink>
                                <InternalLink
                                    to='/admin/recipes/types'
                                    variant='text'
                                >
                                    recipe types
                                </InternalLink>
                            </div>
                        </div>
                        {currentPageData !== null && !loading ? (
                            currentPageData.map((recipe) => (
                                <RecipeItem key={recipe._id} recipe={recipe} />
                            ))
                        ) : (
                            <Loading />
                        )}
                        <div className='pagination'>
                            {total && limit && total !== limit
                                ? [...Array(Math.ceil(total / limit))].map(
                                      (x, index) => (
                                          <button
                                              key={index}
                                              type='button'
                                              className={`${
                                                  page === index + 1
                                                      ? 'active'
                                                      : ''
                                              }`}
                                              onClick={() => changePage(index)}
                                          >
                                              {index + 1}
                                          </button>
                                      )
                                  )
                                : ''}
                        </div>
                    </div>
                </Route>
                <Route path='/admin/recipes/categories' component={Category} />
                <Route path='/admin/recipes/cuisines' component={Cuisine} />
                <Route path='/admin/recipes/types' component={RecipeType} />
                <Route
                    exact
                    path={['/admin/recipes/add', '/admin/recipes/edit/:id']}
                    component={RecipeForm}
                />
                <Redirect to='/404' />
            </Switch>
        </section>
    );
};

export default Recipes;
