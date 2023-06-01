import { Route, Navigate, RouteProps } from 'react-router-dom';
import React, { useContext } from 'react';
import AuthContext, { AuthContextProps } from '../context/AuthContext';

interface PrivateRouteProps extends Omit<RouteProps, 'element'> {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
    const { user } = useContext(AuthContext) as AuthContextProps;
    return <Route {...rest} element={!user ? <Navigate to="/" /> : children} />;
};

export default PrivateRoute;
