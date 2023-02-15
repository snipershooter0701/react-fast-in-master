import React, { useContext } from 'react';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import recipeContext from '../../../context/recipe/recipeContext';
import userContext from '../../../context/users/userContext';
import InternalLink from '../../reusable/InternalLink';
import Add from '../../icons/Add';
import Loading from '../../reusable/Loading';

const CustomRecipes = () => {
    const { profile, loading, customRecipes } = useContext(userContext);

    const { setCustomising } = useContext(recipeContext);

    const { id } = useParams();

    return (
        <div className='custom-recipes section'>
            <h3 className='section-title'>Customised Recipes</h3>
            <div className='container saved-recipes-container'>
                {profile !== null && !loading ? (
                    <Fragment>
                        <InternalLink
                            to={`/profile/${id}/customise`}
                            className='add-custom-recipe-container'
                        >
                            <div>
                                <Add fill='#fff' width='20px' height='20px' />
                            </div>
                            <h3>Upload a Recipe</h3>
                        </InternalLink>
                        {customRecipes
                            ? customRecipes.map((recipe) => (
                                  <InternalLink
                                      className='saved-recipe-container'
                                      key={recipe._id}
                                      to={`/profile/${id}/customise`}
                                      onClick={() => setCustomising(recipe)}
                                  >
                                      <div className='saved-recipe'>
                                          <div className='saved-recipe-image'>
                                              {recipe.images &&
                                              recipe.images[0] ? (
                                                  <img
                                                      src={
                                                          recipe.images[0]
                                                              .location
                                                      }
                                                      alt={recipe.recipe_name}
                                                  />
                                              ) : (
                                                  ''
                                              )}
                                          </div>
                                          <div className='overlay'></div>
                                          <div className='saved-recipe-content'>
                                              <h3>{recipe.recipe_name}</h3>
                                              <p>
                                                  {recipe.cuisine.cuisine_name}
                                              </p>
                                          </div>
                                      </div>
                                  </InternalLink>
                              ))
                            : ''}
                    </Fragment>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
};

export default CustomRecipes;
