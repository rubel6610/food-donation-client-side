import React from 'react';
import UseRole from '../hooks/UseRole';
import LoadingPage from '../components/LoadingPage';
import Unauthorized from '../Components/UnAuthorized';

const PrivateRestaurantRoutes = ({children}) => {
    const {role,isRoleLoading}=UseRole();
    if(isRoleLoading){
        return <LoadingPage/>
    }
    if(role !== "restaurant"){
        return <Unauthorized/>;
    }
    return children;
   
};

export default PrivateRestaurantRoutes;