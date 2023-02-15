import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import recipeContext from '../../../../context/recipe/recipeContext';
import InternalLink from '../../../reusable/InternalLink';
import Back from '../../../icons/Back';
import CuisineForm from './CuisineForm';
import Edit from '../../../icons/Edit';
import Loading from '../../../reusable/Loading';

const Cuisine = () => {
    const { loading, cuisines, setCurrent } = useContext(recipeContext);

    return (
        <div className='cuisine-container'>
            <Switch>
                <Route exact path='/admin/recipes/cuisines'>
                    <InternalLink to='/admin/recipes'>
                        <div className='back-container'>
                            <Back fill='#f15a2e' width='18px' height='18px' />
                            <span>Back</span>
                        </div>
                    </InternalLink>
                    <div className='title'>
                        <h2>Cuisines</h2>
                        <InternalLink
                            variant='button'
                            to='/admin/recipes/cuisines/add'
                            className='btn rounded-md primary'
                        >
                            ADD new cuisine
                        </InternalLink>
                    </div>
                    <div className='table-title'>
                        <h4>Cuisines</h4>
                    </div>
                    {cuisines !== null && !loading ? (
                        cuisines.map((cuisine) => (
                            <div
                                key={cuisine.cuisine_name}
                                className='category-row'
                            >
                                <div className='name'>
                                    {cuisine.cuisine_name}
                                </div>
                                <InternalLink
                                    to={`/admin/recipes/cuisines/edit/${cuisine._id}`}
                                    onClick={() => setCurrent(cuisine)}
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
                        '/admin/recipes/cuisines/edit/:id',
                        '/admin/recipes/cuisines/add',
                    ]}
                    component={CuisineForm}
                />
                <Redirect to='404' />
            </Switch>
        </div>
    );
};

export default Cuisine;
