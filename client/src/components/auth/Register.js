import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import loginimage from '../../assets/img/login-media.png';

const Register = () => {
    const authContext = useContext(AuthContext);

    const {
        register,
        errors,
        isAuthenticated,
        errorMessage,
        user,
    } = authContext;

    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const [fields, setFields] = useState(initialState);

    const onSubmit = (e) => {
        e.preventDefault();
        register(fields);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));
    };

    const { username, email, password, confirmPassword } = fields;

    if (isAuthenticated && user !== null) {
        return <Redirect to={`/profile/${user._id}`} />;
    }

    return (
        <div className='register-container'>
            <div className='image-container'>
                <img src={loginimage} alt='Food on plate' />
            </div>

            <div className='form-content'>
                <div className='register-title'>
                    <h2>Register for free!</h2>
                </div>

                <form onSubmit={onSubmit}>
                    <p>Username</p>
                    <input
                        placeholder='Enter Username'
                        type='text'
                        name='username'
                        value={username}
                        onChange={handleChange}
                        required
                    />
                    <p>Email Address</p>
                    <input
                        placeholder='Enter Email Address'
                        type='email'
                        name='email'
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    <p>Password</p>
                    <input
                        placeholder='Enter Password'
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                        required
                    />
                    <p>Confirm Password</p>
                    <input
                        placeholder='Confirm Password'
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors !== null
                        ? Object.values(errors).map((error, index) => (
                              <div className='register-error' key={index}>
                                  {error}.
                              </div>
                          ))
                        : ''}
                    {errorMessage && (
                        <div className='password-error'>{errorMessage}.</div>
                    )}

                    <button className='button rounded-md primary' type='submit'>
                        Get Started
                    </button>

                    <div className='register-agreement'>
                        <p>
                            *By registering you agree to Feast-In's{' '}
                            <a href='./terms'>Terms and conditions</a>.
                        </p>
                    </div>

                    <div className='existing-link'>
                        <p>
                            Already have an account?{' '}
                            <a href='./login'>Login here</a>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
