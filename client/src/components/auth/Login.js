import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import loginimage from '../../assets/img/login-media.png';
const Login = () => {
    const authContext = useContext(AuthContext);

    const { user, login, errorMessage, isAuthenticated } = authContext;

    const history = useHistory();

    const initialState = {
        email: '',
        password: '',
    };

    const [fields, setFields] = useState(initialState);

    const onSubmit = (e) => {
        e.preventDefault();
        login(fields);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));
    };

    const { email, password } = fields;

    useEffect(() => {
        if (!isAuthenticated || user === null) {
            return;
        }

        const { type } = user;
        if (type === 'admin') {
            return history.push('/admin');
        }

        history.push('/');
    }, [isAuthenticated, user, history]);

    return (
        <div className='login-container'>
            <div className='image-container'>
                <img src={loginimage} alt='Food on plate' />
            </div>

            <div className='form-content'>
                <div className='login-title'>
                    <h2>Login to your account</h2>
                </div>

                <form onSubmit={onSubmit}>
                    <p>E-mail</p>
                    <input
                        placeholder='Enter E-mail Address'
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
                    {errorMessage && (
                        <div className='login-error'>{errorMessage}.</div>
                    )}
                    <button className='button rounded-md primary' type='submit'>
                        Login
                    </button>

                    <div className='register-link'>
                        <p>
                            Don't have an account yet?{' '}
                            <a href='./register'>Register here</a>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
