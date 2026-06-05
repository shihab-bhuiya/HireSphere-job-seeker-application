import { DashboardSideBar } from '@/components/dashboard/DashboardSideBar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className="flex min-h-screen w-full overflow-hidden">
            <DashboardSideBar/> 
            
          
            <div className="flex-1"> {children} </div>
           
        </div>
    );
};

export default DashboardLayout;