import React, { useContext } from 'react';
import recipeContext from '../../../context/recipe/recipeContext';
import Star from '../../icons/Star';
import Views from '../../icons/Views';
import InternalLink from '../../reusable/InternalLink';

const RecipeCard = ({ recipe }) => {
    const { setCurrent } = useContext(recipeContext);

    return (
        <InternalLink
            className='recipe-card'
            to={`/recipes/${recipe._id}`}
            onClick={() => setCurrent(recipe)}
        >
            <div className='image-container'>
                {recipe.images && recipe.images[0] ? (
                    <img
                        src={recipe.images[0].location}
                        alt={recipe.images[0].key}
                    />
                ) : (
                    ''
                )}
            </div>

            <div className='content'>
                <h4>{recipe.recipe_name}</h4>
                <div className='desc'>
                    <p className='cuisine'>{recipe.cuisine.cuisine_name}</p>
                    <div className='stats'>
                        <div>
                            <p>{recipe.rating}</p>
                            <Star fill='#fff' height='16px' width='16px' />
                        </div>
                        <div>
                            <p>{recipe.views}</p>
                            <Views fill='#fff' height='16px' width='16px' />
                        </div>
                    </div>
                </div>
            </div>
        </InternalLink>
    );
};

export default RecipeCard;
