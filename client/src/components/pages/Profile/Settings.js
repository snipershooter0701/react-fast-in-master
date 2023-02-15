import React, { useContext } from 'react';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import nonhalal from '../../../assets/img/non-halal.png';
import halal from '../../../assets/img/halal.png';
import ingredientContext from '../../../context/ingredient/ingredientContext';
import userContext from '../../../context/users/userContext';
import Loading from '../../reusable/Loading';

const Settings = () => {
    const { profile, updateUserProfile, loading } = useContext(userContext);
    const { allergies } = useContext(ingredientContext);
    const { id } = useParams();

    const updateAllergies = (_id) => {
        const newProfile = {
            ...profile,
            allergies: ~profile.allergies.indexOf(_id)
                ? profile.allergies.filter((allergy) => allergy !== _id)
                : [...profile.allergies, _id],
        };

        const formData = new FormData();

        Object.entries(newProfile).map(([key, value]) =>
            formData.append(key, JSON.stringify(value))
        );

        updateUserProfile(id, formData);
    };

    const setHalal = (halal) => {
        const newProfile = {
            ...profile,
            halal,
        };

        const formData = new FormData();

        Object.entries(newProfile).map(([key, value]) =>
            formData.append(key, JSON.stringify(value))
        );
        updateUserProfile(id, formData);
    };

    return (
        <Fragment>
            {allergies !== null && profile !== null && !loading ? (
                <div className='general section'>
                    <h3 className='section-title'>General Information</h3>
                    <div className='content container'>
                        <div className='row'>
                            <h4>Halal / Non-Halal</h4>
                            <h5>My meals are...</h5>
                            <div className='options'>
                                <div className='option-container'>
                                    <div
                                        onClick={() => setHalal(true)}
                                        className={`option-image ${
                                            profile && profile.halal
                                                ? 'selected'
                                                : ''
                                        }`}
                                    >
                                        <img src={halal} alt=' Halal' />
                                    </div>
                                    <p>Halal</p>
                                </div>
                                <div className='option-container'>
                                    <div
                                        onClick={() => setHalal(false)}
                                        className={`option-image ${
                                            profile && !profile.halal
                                                ? 'selected'
                                                : ''
                                        }`}
                                    >
                                        <img src={nonhalal} alt='Non halal' />
                                    </div>
                                    <p>Non-Halal</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className='row'>
                            <h4>Diet</h4>
                            <h5>My diet(s) is towards...</h5>
                            <div className='options three'>
                                <div className='option-container'>
                                    <div className='option-image selected'>
                                        <img
                                            src={lactose}
                                            alt=' Lactose-Intolerant'
                                        />
                                    </div>
                                    <p>Lactose</p>
                                </div>
                                <div className='option-container'>
                                    <div className='option-image'>
                                        <img src={ketogenic} alt='Ketogenic' />
                                    </div>
                                    <p>Ketogenic</p>
                                </div>
                                <div className='option-container'>
                                    <div className='option-image'>
                                        <img src={paleo} alt='Paleo' />
                                    </div>
                                    <p>Paleo</p>
                                </div>
                                <div className='option-container'>
                                    <div className='option-image'>
                                        <img
                                            src={pescatarian}
                                            alt='Pescatarian'
                                        />
                                    </div>
                                    <p>Pescatarian</p>
                                </div>
                                <div className='option-container'>
                                    <div className='option-image'>
                                        <img src={vegan} alt='Vegan' />
                                    </div>
                                    <p>Vegan</p>
                                </div>
                                <div className='option-container'>
                                    <div className='option-image'>
                                        <img
                                            src={vegetarian}
                                            alt='Vegetarian'
                                        />
                                    </div>
                                    <p>Vegetarian</p>
                                </div>
                            </div>
                        </div> */}
                        <div className='row'>
                            <h4>Food Allergies</h4>
                            <h5>I'm allergic to...</h5>
                            <div className='options three'>
                                {allergies.map(({ name, image, _id }) => (
                                    <div key={_id} className='option-container'>
                                        <div
                                            onClick={() => updateAllergies(_id)}
                                            className={`option-image ${
                                                profile &&
                                                profile.allergies &&
                                                ~profile.allergies.indexOf(_id)
                                                    ? 'selected'
                                                    : ''
                                            }`}
                                        >
                                            <img
                                                src={image.location}
                                                alt={image.key}
                                            />
                                        </div>
                                        <p>{name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
            {/* <div className='settings section'>
                    <h3 className='section-title'>Account Settings</h3>
                    <div className='content container'>
                        <div className='row'>
                            <h4>Account Credentials</h4>
                            <div className='half'>
                                <div>
                                    <label>Email</label>
                                    <input type='email' />
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input type='password' />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <h4>Manage Account</h4>
                            <div className='delete-wrapper'>
                                <p>Delete your account and account data</p>
                                <button className='button rounded-md delete '>
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}
        </Fragment>
    );
};

export default Settings;
