import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import recipeContext from '../../../../context/recipe/recipeContext';
import Back from '../../../icons/Back';
import ImageUpload, { ImagePreview } from '../../../reusable/ImageUploader';
import InternalLink from '../../../reusable/InternalLink';
import Select from '../../../reusable/Select';
import TextareaAutosize from 'react-textarea-autosize';
import Dropdown from '../../../reusable/Dropdown';
import Cancel from '../../../icons/Cancel';
import SwitchToggle from 'rc-switch';
import Loading from '../../../reusable/Loading';

const RecipeForm = () => {
    const {
        loading,
        current,
        ingredients: allIngredients,
        categories,
        cuisines,
        success,
        recipeTypes,
        difficulty: difficultyLevels,
        getRecipe,
        setCurrent,
        createRecipe,
        updateRecipe,
        deleteRecipe,
        setSuccess,
    } = useContext(recipeContext);

    const history = useHistory();
    const { id } = useParams();
    const [recipe, setRecipe] = useState('');
    const [uploaded, setUploaded] = useState([]);
    const [removedImage, setRemovedImage] = useState([]);
    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (current === null && id) {
            getRecipe(id);
            return;
        }

        if (current !== null) {
            setRecipe(current);
            return;
        }

        if (categories !== null && recipeTypes !== null && cuisines !== null) {
            const initialState = {
                recipe_name: '',
                description: '',
                images: [],
                ingredients: [],
                directions: [],
                cuisine: cuisines[0],
                recipe_type: recipeTypes[0],
                category: categories[0],
                duration: 1,
                servings: 1,
                difficulty: 'easy',
                public: true,
                halal: false,
            };
            setCurrent(initialState);
            setRecipe(initialState);
        }

        return () => {
            uploaded.forEach((file) => URL.revokeObjectURL(file.preview));
        };
        // eslint-disable-next-line
    }, [current, id, categories, recipeTypes, cuisines]);

    useEffect(() => {
        if (current !== null && allIngredients !== null) {
            const existingIngredientIds = current.ingredients.map(
                ({ _id }) => _id
            );
            const available = allIngredients.filter(
                ({ _id }) => !~existingIngredientIds.indexOf(_id)
            );
            setAvailableIngredients(available);
        }
    }, [current, allIngredients]);

    useEffect(() => {
        if (success) {
            history.push('/admin/recipes');
            setSuccess(false);
        }
    }, [success]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe((prev) => ({ ...prev, [name]: value }));
    };

    const handleInput = (e) => {
        return e.target.validity.valid || (e.target.value = '');
    };

    const categoryChange = (value) => {
        const category = categories.find(({ _id }) => _id === value);
        setRecipe((prev) => ({
            ...prev,
            category,
        }));
    };

    const cuisineChange = (value) => {
        const cuisine = cuisines.find(({ _id }) => _id === value);
        setRecipe((prev) => ({
            ...prev,
            cuisine,
        }));
    };

    const recipeTypeChange = (value) => {
        const recipe_type = recipeTypes.find(({ _id }) => _id === value);
        setRecipe((prev) => ({
            ...prev,
            recipe_type,
        }));
    };

    const difficultyChange = (value) => {
        setRecipe((prev) => ({
            ...prev,
            difficulty: value,
        }));
    };

    const onDrop = (files) => {
        if (files.length) {
            setUploaded((prev) => [...prev, ...files]);
        }
    };

    const changeHalalState = (value) => {
        setRecipe((prev) => ({
            ...prev,
            halal: value,
        }));
    };

    const removeImage = (existing, deleteField) => {
        if (!existing) {
            setUploaded((uploaded) =>
                uploaded.filter((file) => file.lastModified !== deleteField)
            );
            return;
        }

        const filteredImage = recipe.images.filter((image) => {
            if (image.key === deleteField) {
                setRemovedImage((prev) => [...prev, image]);
            }
            return image.key !== deleteField;
        });

        setRecipe((prev) => ({
            ...prev,
            images: filteredImage,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(recipe).map(([key, value]) =>
            formData.append(key, JSON.stringify(value))
        );

        uploaded.length &&
            uploaded.map((file) => formData.append('uploaded', file));

        formData.append('removedImages', JSON.stringify(removedImage));
        id ? updateRecipe(id, formData) : createRecipe(formData);
    };

    const searchIngredients = (e) => {
        if (ingredients === null && loading) {
            return;
        }

        const { value } = e.target;

        setSearchTerm(value);

        if (!value) {
            return setOpen(false);
        }
        const results = availableIngredients.filter(({ ingredient_name }) =>
            ingredient_name.includes(value)
        );
        setSearchResult(results);
        setOpen(true);
    };

    const addIngredient = (ingredient) => {
        setSearchTerm('');
        setOpen(false);

        setRecipe((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, ingredient],
        }));
        setAvailableIngredients((prev) =>
            prev.filter(({ _id }) => _id !== ingredient._id)
        );
    };

    const removeIngredient = (ingredient) => {
        setRecipe((prev) => ({
            ...prev,
            ingredients: prev.ingredients.filter(
                ({ _id }) => _id !== ingredient._id
            ),
        }));
        setAvailableIngredients((prev) => [...prev, ingredient]);
    };

    const addStep = () => {
        setRecipe((prev) => ({
            ...prev,
            directions: [...prev.directions, ''],
        }));
    };

    const changeSteps = (e, changedIndex) => {
        const { value } = e.target;
        setRecipe((prev) => ({
            ...prev,
            directions: prev.directions.map((step, index) =>
                index === changedIndex ? value : step
            ),
        }));
    };

    const removeStep = (removedIndex) => {
        setRecipe((prev) => ({
            ...prev,
            directions: prev.directions.filter(
                (step, index) => index !== removedIndex
            ),
        }));
    };

    const {
        recipe_name,
        category,
        images,
        cuisine,
        difficulty,
        recipe_type,
        description,
        ingredients,
        halal,
        duration,
        servings,
        directions,
    } = recipe;

    return (
        <div className='recipe-form-container'>
            <InternalLink to='/admin/recipes'>
                <div className='back-container'>
                    <Back fill='#f15a2e' width='18px' height='18px' />
                    <span>Back</span>
                </div>
            </InternalLink>
            <div>
                <h2>{id ? 'Edit ' : 'Add New'} Recipe</h2>
            </div>

            {current !== null &&
            allIngredients !== null &&
            categories !== null &&
            recipeTypes !== null &&
            cuisines !== null &&
            !loading ? (
                <form onSubmit={onSubmit}>
                    <div className='row'>
                        <label>Featured Image</label>
                        {images && images.length
                            ? images.map(({ key, location }) => (
                                  <ImagePreview
                                      key={key}
                                      name={key}
                                      src={location}
                                      deleteField={key}
                                      removeImage={removeImage}
                                  />
                              ))
                            : ''}
                        {uploaded.length
                            ? uploaded.map((file) => (
                                  <ImagePreview
                                      key={file.name}
                                      name={file.name}
                                      src={file.preview}
                                      existing={false}
                                      deleteField={file.lastModified}
                                      removeImage={removeImage}
                                  />
                              ))
                            : 'No files uploaded'}
                        <ImageUpload onDrop={onDrop} />
                    </div>
                    <div className='row'>
                        <label>Recipe Name</label>
                        <input
                            type='text'
                            name='recipe_name'
                            value={recipe_name || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='row half'>
                        <div>
                            <label>Category</label>
                            <Select
                                value={category ? category.category_name : ''}
                                options={categories.map(
                                    ({ category_name, _id }) => ({
                                        label: category_name,
                                        value: _id,
                                    })
                                )}
                                onChange={categoryChange}
                            />
                        </div>
                        <div>
                            <label>Recipe Type</label>
                            <Select
                                value={
                                    recipe_type ? recipe_type.recipe_type : ''
                                }
                                options={recipeTypes.map(
                                    ({ recipe_type, _id }) => ({
                                        label: recipe_type,
                                        value: _id,
                                    })
                                )}
                                onChange={recipeTypeChange}
                            />
                        </div>
                    </div>
                    <div className='row half'>
                        <div>
                            <label>Cuisine</label>
                            <Select
                                value={cuisine ? cuisine.cuisine_name : ''}
                                options={cuisines.map(
                                    ({ cuisine_name, _id }) => ({
                                        label: cuisine_name,
                                        value: _id,
                                    })
                                )}
                                onChange={cuisineChange}
                            />
                        </div>
                        <div>
                            <label>Difficulty</label>
                            <Select
                                value={difficulty ? difficulty : ''}
                                options={difficultyLevels.map((level) => ({
                                    label: level,
                                    value: level,
                                }))}
                                onChange={difficultyChange}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <label>Description</label>
                        <div>
                            <TextareaAutosize
                                name='description'
                                value={description || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='row half'>
                        <div>
                            <label>Duration (minutes)</label>
                            <input
                                type='number'
                                name='duration'
                                min={1}
                                onInput={handleInput}
                                value={duration || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Servings</label>
                            <input
                                type='number'
                                name='servings'
                                min={1}
                                onInput={handleInput}
                                value={servings || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <label>Ingredients</label>
                        <div className='ingredients'>
                            <div className='selected-ingredient-container'>
                                {ingredients && ingredients.length
                                    ? ingredients.map((ingredient) => (
                                          <div
                                              key={ingredient._id}
                                              className='selected-ingredient'
                                          >
                                              <div>
                                                  {ingredient.ingredient_name}
                                              </div>
                                              <button
                                                  type='button'
                                                  onClick={() =>
                                                      removeIngredient(
                                                          ingredient
                                                      )
                                                  }
                                              >
                                                  <Cancel
                                                      fill='#f15a2e'
                                                      width='10px'
                                                      height='10px'
                                                  />
                                              </button>
                                          </div>
                                      ))
                                    : ''}
                            </div>
                            <div>
                                <input
                                    type='search'
                                    name='ingredient'
                                    placeholder='Search an ingredient...'
                                    onChange={searchIngredients}
                                    value={searchTerm}
                                    autoComplete='off'
                                />
                                <div className='dropdown-ingredients'>
                                    <Dropdown open={open}>
                                        {searchResult
                                            .sort((a, b) =>
                                                a.ingredient_name.localeCompare(
                                                    b.ingredient_name
                                                )
                                            )
                                            .map((ingredient) => (
                                                <div
                                                    onClick={() =>
                                                        addIngredient(
                                                            ingredient
                                                        )
                                                    }
                                                    key={ingredient._id}
                                                >
                                                    {ingredient.ingredient_name}
                                                </div>
                                            ))}
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <label>Directions</label>
                        {directions && directions.length
                            ? directions.map((step, index) => (
                                  <div
                                      className='steps'
                                      key={`step ${index + 1}`}
                                  >
                                      <span>Step {index + 1} :</span>
                                      <div className='textarea-container'>
                                          <TextareaAutosize
                                              value={step || ''}
                                              onChange={(e) =>
                                                  changeSteps(e, index)
                                              }
                                              required
                                          />
                                          <button
                                              type='button'
                                              onClick={() => removeStep(index)}
                                          >
                                              <Cancel
                                                  fill='#f15a2e'
                                                  width='17px'
                                                  height='17px'
                                              />
                                          </button>
                                      </div>
                                  </div>
                              ))
                            : ''}
                        <button
                            className='button rounded-md inverted'
                            onClick={addStep}
                            type='button'
                        >
                            Add step
                        </button>
                    </div>
                    <div className='row'>
                        <SwitchToggle
                            onChange={changeHalalState}
                            onClick={changeHalalState}
                        />
                        {halal ? 'Halal' : 'Non-Halal'}
                    </div>
                    <div className='button-container'>
                        <div>
                            <input
                                className='button rounded-md primary'
                                type='submit'
                                value={id ? 'Save changes' : 'Create recipe'}
                            />
                        </div>
                        <div>
                            {id ? (
                                <button
                                    type='button'
                                    className='button rounded-md delete'
                                    onClick={() => deleteRecipe(id)}
                                >
                                    delete recipe
                                </button>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </form>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default RecipeForm;
