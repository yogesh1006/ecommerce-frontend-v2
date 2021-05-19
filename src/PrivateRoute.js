import React from 'react';
import { Route, Redirect } from 'react-router-dom';
export const isLogin = () => {
    if (localStorage.getItem("jwt")) {
        return true;
    }

    return false;
}

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        <Route {...rest} render={props => (
            isLogin()?
                <Component {...props} />
            : <Redirect to="/ushopweship/login" />
        )} />
    );
};

export default PrivateRoute;



