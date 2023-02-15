import React, { useContext, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ingredientContext from '../../../../context/ingredient/ingredientContext';
import InternalLink from '../../../reusable/InternalLink';
import IngredientCategory from './IngredientCategory';
import IngredientForm from './IngredientForm';
import IngredientItem from './IngredientItem';
import Allergies from './Allergies';
import Loading from '../../../reusable/Loading';

const Ingredients = () => {
    const {
        loading,
        getIngredientsByPage,
        getCategories,
        getAllergies,
        currentPageData,
        total,
        page,
        limit,
        setPage,
    } = useContext(ingredientContext);

    useEffect(() => {
        if (currentPageData === null) {
            getIngredientsByPage(page);
        }
        getCategories();
        getAllergies();
        // eslint-disable-next-line
    }, []);

    const changePage = async (num) => {
        setPage(num + 1);
        getIngredientsByPage(num + 1);
    };

    return (
        <section id='ingredients' className='background'>
            <Switch>
                <Route exact path='/admin/ingredients'>
                    <div className='head'>
                        <div className='title'>
                            <h2>Manage Ingredients</h2>
                            <div>
                                <InternalLink
                                    to='/admin/ingredients/add'
                                    variant='button'
                                    className='btn rounded-md primary'
                                >
                                    Add new record
                                </InternalLink>
                            </div>
                        </div>

                        <div className='table-title'>
                            <h4>Ingredients</h4>
                            <div className='category-container'>
                                <InternalLink
                                    to='/admin/ingredients/categories'
                                    variant='text'
                                >
                                    Categories
                                </InternalLink>
                                <InternalLink
                                    to='/admin/ingredients/allergies'
                                    variant='text'
                                >
                                    Allergies
                                </InternalLink>
                            </div>
                        </div>
                        {currentPageData !== null && !loading ? (
                            currentPageData.map((ingredient, index) => (
                                <IngredientItem
                                    key={ingredient._id}
                                    ingredient={ingredient}
                                />
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
                <Route
                    path='/admin/ingredients/categories'
                    component={IngredientCategory}
                />
                <Route
                    path='/admin/ingredients/allergies'
                    component={Allergies}
                />
                <Route
                    exact
                    path={[
                        '/admin/ingredients/add',
                        '/admin/ingredients/edit/:id',
                    ]}
                    component={IngredientForm}
                />
                <Redirect to='/404' />
            </Switch>
        </section>
    );
};

export default Ingredients;
