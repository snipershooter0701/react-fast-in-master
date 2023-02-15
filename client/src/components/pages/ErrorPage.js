import React from 'react';
import InternalLink from '../reusable/InternalLink';

const ErrorPage = () => {
    return (
        <div className='error'>
            <div>
                <h1>404 Error</h1>
                <h3>
                    Oops, we can't seem to find that page you're looking for.
                </h3>
                <p>
                    This page you are looking for does not appear to exist.
                    Please go back or head on over to our homepage to choose a
                    new direction.
                </p>
                <InternalLink
                    to='/'
                    variant='button'
                    className='register primary small rounded-md'
                >
                    Back to homepage
                </InternalLink>
            </div>
        </div>
    );
};

export default ErrorPage;
