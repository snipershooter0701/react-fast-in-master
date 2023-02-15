import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import recipeContext from '../../../context/recipe/recipeContext';
import userContext from '../../../context/users/userContext';
import InternalLink from '../../reusable/InternalLink';
import Loading from '../../reusable/Loading';

const MyRecipes = () => {
    const { profile, loading, myRecipes } = useContext(userContext);

    const { setCustomising } = useContext(recipeContext);

    const { id } = useParams();

    return (
        <div className='my-recipes section'>
            <h3 className='section-title'>My Uploads</h3>
            <div className='container saved-recipes-container'>
                {profile !== null && !loading && myRecipes ? (
                    myRecipes.map((recipe) => (
                        <InternalLink
                            className='saved-recipe-container'
                            key={recipe._id}
                            to={`/profile/${id}/customise`}
                            onClick={() => setCustomising(recipe)}
                        >
                            <div className='saved-recipe'>
                                <div className='saved-recipe-image'>
                                    <img
                                        src={recipe.images[0].location}
                                        alt={recipe.recipe_name}
                                    />
                                </div>
                                <div className='overlay'></div>
                                <div className='saved-recipe-content'>
                                    <h3>{recipe.recipe_name}</h3>
                                    <p>{recipe.cuisine.cuisine_name}</p>
                                </div>
                            </div>
                        </InternalLink>
                    ))
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
};

export default MyRecipes;
