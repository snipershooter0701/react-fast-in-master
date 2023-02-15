import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import IngredientContext from '../../../../context/ingredient/ingredientContext';
import Back from '../../../icons/Back';
import InternalLink from '../../../reusable/InternalLink';
import AllergyForm from './AllergyForm';
import Edit from '../../../icons/Edit';
import Loading from '../../../reusable/Loading';
const Allergies = () => {
    const { allergies, loading, setCurrent } = useContext(IngredientContext);

    return (
        <div className='ingredient-subcategory-container'>
            <Switch>
                <Route exact path='/admin/ingredients/allergies'>
                    <InternalLink to='/admin/ingredients'>
                        <div className='back-container'>
                            <Back fill='#f15a2e' width='18px' height='18px' />
                            <span>Back</span>
                        </div>
                    </InternalLink>
                    <div className='title'>
                        <h2>Allergies</h2>
                        <InternalLink
                            variant='button'
                            to='/admin/ingredients/allergies/add'
                            className='btn rounded-md primary'
                        >
                            ADD new allergy
                        </InternalLink>
                    </div>
                    <div className='table-title'>
                        <h4>Allergies</h4>
                    </div>
                    {allergies !== null && !loading ? (
                        allergies.map((allergy) => (
                            <div key={allergy.name} className='category-row'>
                                <div className='name'>{allergy.name}</div>
                                <InternalLink
                                    to={`/admin/ingredients/allergies/edit/${allergy._id}`}
                                    onClick={() => setCurrent(allergy)}
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
                        '/admin/ingredients/allergies/edit/:id',
                        '/admin/ingredients/allergies/add',
                    ]}
                    component={AllergyForm}
                />
                <Redirect to='/404' />
            </Switch>
        </div>
    );
};

export default Allergies;
