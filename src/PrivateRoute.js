import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({component: Component, ...rest}) => {
    const {authState} = useAuth();
    return (

        <Route {...rest} render={props => (
            authState.token ?
                <Component {...props} />
            : <Redirect to="/ushopweship/login" />
        )} />
    );
};

export default PrivateRoute;



