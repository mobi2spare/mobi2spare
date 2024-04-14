import { Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context';
import { ReactNode, useContext } from 'react';

export function PrivateRoute(){

    const { authenticated } = useContext(AuthContext);
    const location = useLocation();
    return (
        authenticated ? <Outlet /> : <Navigate to="/" replace state={{ from: location }} />
      
    );
}

