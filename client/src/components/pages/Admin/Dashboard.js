import React, { useContext, useEffect } from 'react';
import Recipes from '../../icons/Recipes';
import Users from '../../icons/Users';
import Ingredients from '../../icons/Ingredients';
import InternalLink from '../../reusable/InternalLink';
import ingredientContext from '../../../context/ingredient/ingredientContext';
import recipeContext from '../../../context/recipe/recipeContext';
import userContext from '../../../context/users/userContext';
import Loading from '../../reusable/Loading';

const Dashboard = () => {
    const { getIngredients, total: ingredientTotal } = useContext(
        ingredientContext
    );
    const { getRecipes, total: recipeTotal } = useContext(recipeContext);
    const { getUsers, total: userTotal } = useContext(userContext);

    useEffect(() => {
        if (ingredientTotal === null) {
            getIngredients();
        }
        if (recipeTotal === null) {
            getRecipes();
        }

        if (userTotal === null) {
            getUsers();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <section id='dashboard' className='background'>
            <div className='head'>
                <div className='title'>
                    <h2>Dashboard</h2>
                </div>
                <div className='row'>
                    <div className='subtitle'>
                        <h3>Summary</h3>
                    </div>
                    {ingredientTotal !== null &&
                    recipeTotal !== null &&
                    userTotal !== null ? (
                        <div className='summary'>
                            <div className='summary-card'>
                                <div>
                                    <Ingredients
                                        fill='#fff'
                                        width='50px'
                                        height='50px'
                                    />
                                    <p>
                                        Total
                                        <br /> Ingredients
                                    </p>
                                </div>
                                <h3>{ingredientTotal ?? 0}</h3>
                            </div>
                            <div className='summary-card'>
                                <div>
                                    <Recipes
                                        fill='#fff'
                                        width='50px'
                                        height='50px'
                                    />
                                    <p>
                                        Total
                                        <br /> Recipes
                                    </p>
                                </div>
                                <h3>{recipeTotal ?? 0}</h3>
                            </div>
                            <div className='summary-card'>
                                <div>
                                    <Users
                                        fill='#fff'
                                        width='50px'
                                        height='50px'
                                    />
                                    <p>
                                        Total
                                        <br /> Users
                                    </p>
                                </div>
                                <h3>{userTotal ?? 0}</h3>
                            </div>
                        </div>
                    ) : (
                        <Loading />
                    )}
                </div>
                <div className='row'>
                    <div className='subtitle'>
                        <h3>Manage</h3>
                    </div>
                    <div className='manage'>
                        <InternalLink to='/admin/ingredients'>
                            <div>
                                <Ingredients
                                    fill='#fff'
                                    width='50px'
                                    height='50px'
                                />
                                <p>Ingredients</p>
                            </div>
                        </InternalLink>
                        <InternalLink to='/admin/recipes'>
                            <div>
                                <Recipes
                                    fill='#fff'
                                    width='50px'
                                    height='50px'
                                />
                                <p>Recipes</p>
                            </div>
                        </InternalLink>
                        <InternalLink to='/admin/users'>
                            <div>
                                <Users fill='#fff' width='50px' height='50px' />
                                <p> Users</p>
                            </div>
                        </InternalLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
