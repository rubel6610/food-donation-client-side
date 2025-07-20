import React from 'react';
import DashboardAside from './DashboardAside';
import { Outlet } from 'react-router';

const Dashboard = () => {
    return (
        <div>
           <DashboardAside />
           <div>
             <Outlet/>
           </div>
        </div>
    );
};

export default Dashboard;