import React, { useContext } from 'react';
import InternalLink from '../../../reusable/InternalLink';
import IngredientContext from '../../../../context/ingredient/ingredientContext';
import Edit from '../../../icons/Edit';

const IngredientItem = ({ ingredient }) => {
    const ingredientContext = useContext(IngredientContext);

    const { setCurrent } = ingredientContext;

    const { _id, ingredient_name } = ingredient;

    return (
        <div className='item'>
            {/* <span>{image} </span> */}
            <span>
                <b>{ingredient_name}</b>
            </span>
            <InternalLink
                onClick={() => setCurrent(ingredient)}
                to={`/admin/ingredients/edit/${_id}`}
            >
                <Edit fill='#000' weight='22px' height='22px' />
            </InternalLink>
        </div>
    );
};

export default IngredientItem;
