import React from 'react';
import LoadingPage from '../components/LoadingPage';
import UseAuth from '../hooks/UseAuth';
import { useLocation } from 'react-router';

const PrivateRoutes = ({ children }) => {
    const {user, loading} = UseAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    if(loading) return <LoadingPage />;
    if(!user) {
        return <Navigate to="/login" state={{ from }} replace />;
    }
    return children;
};

export default PrivateRoutes;