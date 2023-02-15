import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import authContext from '../../../context/auth/authContext';
import userContext from '../../../context/users/userContext';
import ingredientContext from '../../../context/ingredient/ingredientContext';
import header from '../../../assets/img/profile-header.jpg';
import profilePic from '../../../assets/img/profile.png';
import Avatar from '../../reusable/Avatar';
import Settings from './Settings';
import InternalLink from '../../reusable/InternalLink';
import SavedRecipes from './SavedRecipes';
import CustomRecipes from './CustomRecipes';
import MyRecipes from './MyRecipes';
import CustomRecipeForm from './CustomRecipeForm';
import ImageUpload from '../../reusable/ImageUploader';

const Profile = () => {
    const { user } = useContext(authContext);
    const { getAllergies } = useContext(ingredientContext);
    const {
        profile,
        updateUserProfile,
        getMyRecipes,
        getCustomRecipes,
        getSavedRecipes,
    } = useContext(userContext);

    const { id } = useParams();
    const [uploaded, setUploaded] = useState('');

    useEffect(() => {
        getAllergies();
        getMyRecipes(id);
        getCustomRecipes(id);
        getSavedRecipes(id);
        // eslint-disable-next-line
    }, []);

    const onDrop = (file) => {
        setUploaded(file[0]);
    };

    const saveProfilePic = () => {
        const formData = new FormData();

        Object.entries(profile).map(([key, value]) =>
            formData.append(key, JSON.stringify(value))
        );

        uploaded && formData.append('uploaded', uploaded);

        updateUserProfile(id, formData);

        setUploaded('');
    };

    return (
        <section id='profile'>
            <div
                className='header'
                style={{ background: 'url(' + header + ')' }}
            >
                <div className='header-container container'>
                    <div className='profile-image-container'>
                        <label htmlFor='profile-uploader'>
                            {uploaded ? (
                                <Avatar
                                    src={uploaded.preview}
                                    alt={uploaded.name}
                                    size='large'
                                />
                            ) : (
                                <Avatar
                                    src={profile?.image?.location || profilePic}
                                    alt=''
                                    size='large'
                                />
                            )}
                        </label>
                        <ImageUpload
                            onDrop={onDrop}
                            multiple={false}
                            id='profile-uploader'
                            hideButton={true}
                        />
                    </div>
                    <div>
                        <h2>{user ? user.username : ''}</h2>
                        <p>{user ? user.email : ''}</p>
                        {uploaded ? (
                            <button
                                class='button rounded-md primary'
                                type='button'
                                onClick={saveProfilePic}
                            >
                                Save
                            </button>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
            <Route
                exact
                path={[
                    '/profile/:id',
                    '/profile/:id/recipes/saved',
                    '/profile/:id/recipes/custom',
                    '/profile/:id/recipes',
                ]}
            >
                <div className='profile-links-container'>
                    <div className='link-container'>
                        <InternalLink to={`/profile/${id}`}>
                            Settings
                        </InternalLink>
                    </div>
                    <div className='link-container'>
                        <InternalLink to={`/profile/${id}/recipes/saved`}>
                            Saved
                        </InternalLink>
                    </div>
                    <div className='link-container'>
                        <InternalLink to={`/profile/${id}/recipes/custom`}>
                            Custom
                        </InternalLink>
                    </div>
                    <div className='link-container'>
                        <InternalLink to={`/profile/${id}/recipes`}>
                            Uploads
                        </InternalLink>
                    </div>
                </div>
            </Route>
            <div className='profile-body'>
                <Switch>
                    <Route path='/profile/:id' exact component={Settings} />
                    <Route
                        path='/profile/:id/recipes/saved'
                        exact
                        component={SavedRecipes}
                    />
                    <Route
                        path='/profile/:id/recipes/custom'
                        exact
                        component={CustomRecipes}
                    />
                    <Route
                        path='/profile/:id/recipes'
                        exact
                        component={MyRecipes}
                    />
                    <Route
                        path='/profile/:id/customise'
                        exact
                        component={CustomRecipeForm}
                    />
                    <Redirect to='/404' />
                </Switch>
            </div>
        </section>
    );
};

export default Profile;
