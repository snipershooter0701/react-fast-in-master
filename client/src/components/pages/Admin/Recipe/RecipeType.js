import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import recipeContext from '../../../../context/recipe/recipeContext';
import Back from '../../../icons/Back';
import InternalLink from '../../../reusable/InternalLink';
import RecipeTypeForm from './RecipeTypeForm';
import Edit from '../../../icons/Edit';
import Loading from '../../../reusable/Loading';

const RecipeType = () => {
    const { loading, recipeTypes, setCurrent } = useContext(recipeContext);

    return (
        <div className='recipe-type-container'>
            <Switch>
                <Route exact path='/admin/recipes/types'>
                    <InternalLink to='/admin/recipes'>
                        <div className='back-container'>
                            <Back fill='#f15a2e' width='18px' height='18px' />
                            <span>Back</span>
                        </div>
                    </InternalLink>
                    <div className='title'>
                        <h2>Recipe Types</h2>
                        <InternalLink
                            variant='button'
                            to='/admin/recipes/types/add'
                            className='btn rounded-md primary'
                        >
                            ADD new recipe type
                        </InternalLink>
                    </div>
                    <div className='table-title'>
                        <h4>Recipe Types</h4>
                    </div>
                    {recipeTypes !== null && !loading ? (
                        recipeTypes.map((recipeType) => (
                            <div
                                key={recipeType.recipe_type}
                                className='category-row'
                            >
                                <div className='name'>
                                    {recipeType.recipe_type}
                                </div>
                                <InternalLink
                                    to={`/admin/recipes/types/edit/${recipeType._id}`}
                                    onClick={() => setCurrent(recipeType)}
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
                        '/admin/recipes/types/edit/:id',
                        '/admin/recipes/types/add',
                    ]}
                    component={RecipeTypeForm}
                />
                <Redirect to='404' />
            </Switch>
        </div>
    );
};

export default RecipeType;
