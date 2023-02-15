import React, { useContext, useEffect } from 'react';
import recipeContext from '../../../context/recipe/recipeContext';
import Star from '../../icons/Star';
import InternalLink from '../../reusable/InternalLink';
import Loading from '../../reusable/Loading';

const TopRatedRecipes = () => {
    const { topRecipes, loading, getTopRecipes } = useContext(recipeContext);

    useEffect(() => {
        getTopRecipes();

        // eslint-disable-next-line
    }, []);

    return (
        <div className='top-recipes'>
            <h3 className='section-title'>Top Recipes</h3>

            <div className='top-recipe-card-container container'>
                {topRecipes !== null && !loading ? (
                    topRecipes
                        .sort((a, b) => b.rating - a.rating)
                        .slice(0, 3)
                        .map((recipe, index) => (
                            <InternalLink
                                to={`/recipes/${recipe._id}`}
                                className='top-rated-recipe-card'
                                key={recipe._id}
                            >
                                <div className='top-image-container'>
                                    <img
                                        src={recipe.images[0].location}
                                        alt={recipe.recipe_name}
                                    />
                                </div>
                                <div className='overlay'></div>
                                <div className='top-recipe-content-container'>
                                    <div className='top-recipe-content'>
                                        <div>
                                            <h2>#{index + 1}</h2>
                                        </div>
                                        <div className='recipe-name'>
                                            <h5>
                                                {recipe.rating}
                                                <Star
                                                    fill='#f15a2e'
                                                    width='20px'
                                                    height='20px'
                                                />
                                            </h5>
                                            <h3>{recipe.recipe_name}</h3>
                                        </div>
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

export default TopRatedRecipes;
