import { DashboardSideBar } from '@/components/dashboard/DashboardSideBar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className="flex h-screen w-full overflow-hidden">
            <DashboardSideBar/> 
            <div> {children} </div>
           
        </div>
    );
};

export default DashboardLayout;