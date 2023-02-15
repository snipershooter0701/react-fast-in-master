import React, { useContext, useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import recipeContext from '../../../context/recipe/recipeContext';
import Star from '../../icons/Star';
import InternalLink from '../../reusable/InternalLink';
import { Link } from 'react-scroll';
import Reviews from './Reviews';
import userContext from '../../../context/users/userContext';
import authContext from '../../../context/auth/authContext';
import Heart from '../../icons/Heart';
import Loading from '../../reusable/Loading';
import systemContext from '../../../context/System/systemContext';

const Recipe = () => {
    const {
        loading,
        recipes,
        current,
        getRecipe,
        updateRecipeViewCount,
        clearCurrent,
        clearReviews,
        setCustomising,
    } = useContext(recipeContext);

    const { user } = useContext(authContext);
    const { openLoginModal } = useContext(systemContext);
    const { profile, updateUserProfile } = useContext(userContext);

    const { id } = useParams();

    useEffect(() => {
        if (current === null && id) {
            getRecipe(id);
            return;
        }

        if (current !== null) {
            setRecipe(current);
            return;
        }

        // eslint-disable-next-line
    }, [current, id]);

    useEffect(() => {
        // When component first mounts, update recipe view count
        if (!id || loading || !recipes) {
            return;
        }

        updateRecipeViewCount(id);

        return () => {
            clearCurrent();
            clearReviews();
        };
        // eslint-disable-next-line
    }, [id, loading]);

    const [recipe, setRecipe] = useState('');

    const {
        recipe_name,
        images,
        description,
        cuisine,
        duration,
        servings,
        recipe_type,
        rating,
        ingredients,
        directions,
    } = recipe;

    const addToSavedRecipes = () => {
        if (!user || !profile) {
            openLoginModal();
            return;
        }

        const newProfile = {
            ...profile,
            savedRecipes: ~profile.savedRecipes.indexOf(id)
                ? profile.savedRecipes.filter((recipe) => recipe !== id)
                : [...profile.savedRecipes, id],
        };

        const profileData = new FormData();

        Object.entries(newProfile).map(([key, value]) =>
            profileData.append(key, JSON.stringify(value))
        );
        updateUserProfile(user._id, profileData);
    };

    return (
        <div className='single-recipe'>
            {current !== null && !loading ? (
                <Fragment>
                    <div className='header-container'>
                        <div className='summary'>
                            <h2>{recipe_name ?? ''}</h2>

                            <div className='category-save'>
                                <div className='category'>
                                    <p className='cuisine'>
                                        {cuisine ? cuisine.cuisine_name : ''}
                                    </p>
                                    <p className='type'>
                                        {recipe_type
                                            ? recipe_type.recipe_type
                                            : ''}
                                    </p>
                                </div>
                                <span
                                    onClick={addToSavedRecipes}
                                    className={`favourite ${
                                        profile &&
                                        recipe._id &&
                                        profile.savedRecipes &&
                                        ~profile.savedRecipes.indexOf(
                                            recipe._id
                                        )
                                            ? 'active'
                                            : ''
                                    }
                                    `}
                                >
                                    <Heart
                                        fill='#f15a2e'
                                        width={50}
                                        height={45}
                                    />
                                </span>
                            </div>

                            <div className='details'>
                                <div className='item-details'>
                                    <p className='number'>{duration ?? ''}</p>
                                    <p>Minutes</p>
                                </div>
                                <div className='item-details'>
                                    <p className='number'>{servings ?? ''}</p>
                                    <p>Servings</p>
                                </div>
                                <div className='item-details'>
                                    <div className='ratings'>
                                        <p className='number'>{rating ?? ''}</p>
                                        <Star
                                            fill='#f15a2e'
                                            width='18px'
                                            height='18px'
                                        />
                                    </div>
                                    <p>Rating</p>
                                </div>
                            </div>
                            <div className='button-container'>
                                <Link
                                    className='button rounded-md primary'
                                    to='directions'
                                    spy={true}
                                    smooth={true}
                                >
                                    Directions
                                </Link>
                                <InternalLink
                                    className='button rounded-md primary'
                                    to={`${
                                        user
                                            ? `/profile/${user._id}/customise`
                                            : '/login'
                                    }`}
                                    onClick={() => setCustomising(current)}
                                >
                                    Customise
                                </InternalLink>
                            </div>
                        </div>
                        <div className='featured-image'>
                            <div>
                                {images && images[0] ? (
                                    <img
                                        src={images[0].location}
                                        alt={images[0].key}
                                    />
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='recipe-body'>
                        <div className='description section'>
                            <h3 className='section-title'>Description</h3>
                            <div className='content container'>
                                <p>{description}</p>
                            </div>
                        </div>
                        <div className='ingredients section'>
                            <h3 className='section-title'>Ingredients</h3>
                            <div className='content container'>
                                {ingredients && ingredients.length
                                    ? ingredients.map((ingredient) => (
                                          <div key={ingredient._id}>
                                              <p>
                                                  {ingredient.ingredient_name}
                                              </p>
                                          </div>
                                      ))
                                    : ''}
                            </div>
                        </div>
                        <div id='directions' className='directions section'>
                            <h3 className='section-title'>Directions</h3>
                            <div className='content container'>
                                {directions && directions.length
                                    ? directions.map((step, index) => (
                                          <div
                                              className='steps'
                                              key={`step ${index + 1}`}
                                          >
                                              <div className='step-container'>
                                                  <p className='step'>
                                                      {index + 1}
                                                  </p>
                                                  <p>{step || ''}</p>
                                              </div>
                                          </div>
                                      ))
                                    : ''}
                            </div>
                        </div>
                        <Reviews />
                    </div>
                </Fragment>
            ) : (
                <Loading />
            )}
        </div>
    );
};
export default Recipe;
