import React, { useContext } from 'react';
import userContext from '../../../context/users/userContext';
import InternalLink from '../../reusable/InternalLink';
import Loading from '../../reusable/Loading';

const SavedRecipes = () => {
    const { profile, loading, savedRecipes } = useContext(userContext);

    return (
        <div className='saved-recipes section'>
            <h3 className='section-title'>Saved Recipes</h3>
            <div className='container saved-recipes-container'>
                {profile !== null && !loading && savedRecipes ? (
                    savedRecipes.map((recipe) => (
                        <InternalLink
                            key={recipe._id}
                            className='saved-recipe-container'
                            to={`/recipes/${recipe._id}`}
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

export default SavedRecipes;
