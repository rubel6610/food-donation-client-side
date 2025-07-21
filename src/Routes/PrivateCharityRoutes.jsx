import React from 'react';
import UseRole from '../hooks/UseRole';
import Unauthorized from '../Components/UnAuthorized';
import LoadingPage from '../components/LoadingPage';


const PrivateCharityRoutes = ({children}) => {
    const {role, isRoleLoading}=UseRole();
    if(isRoleLoading){
        return <LoadingPage/>
    }
    if(role !== 'charity'){
        return <Unauthorized/>
    }
   return children;

   
};

export default PrivateCharityRoutes;