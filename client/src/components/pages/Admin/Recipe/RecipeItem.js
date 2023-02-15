import React, { useContext } from 'react';
import InternalLink from '../../../reusable/InternalLink';
import Edit from '../../../icons/Edit';
import RecipeContext from '../../../../context/recipe/recipeContext';

const RecipeItem = ({ recipe }) => {
    const { setCurrent } = useContext(RecipeContext);

    const { _id, images, recipe_name } = recipe;
    return (
        <div className='item recipe'>
            <div>
                {images.length && images[0] ? (
                    <img src={images[0].location} alt={images[0].key} />
                ) : (
                    ''
                )}
            </div>
            <span>
                <b>{recipe_name ?? ''}</b>
            </span>
            <InternalLink
                onClick={() => setCurrent(recipe)}
                to={`/admin/recipes/edit/${_id}`}
            >
                <Edit fill='#000' weight='22px' height='22px' />
            </InternalLink>
        </div>
    );
};

export default RecipeItem;
