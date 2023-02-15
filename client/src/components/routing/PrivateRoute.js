import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, admin = false, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading, user } = authContext;

    if (admin && isAuthenticated && !loading && user !== null) {
        return (
            <Route
                {...rest}
                render={(props) =>
                    user.type === 'admin' ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to='/login' />
                    )
                }
            />
        );
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                // Not logged in / unauthorized
                !isAuthenticated && !loading ? (
                    <Redirect to='/login' />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PrivateRoute;
