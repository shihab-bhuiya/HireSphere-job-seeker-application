"use client";
import DashboardStats from '@/components/StateCard';
import { authClient } from '@/lib/auth-client';
import { Briefcase, Persons, Thunderbolt, CircleCheck } from '@gravity-ui/icons';
import React from 'react';

const RecruiterPage = () => {
      const { data: session, isPending } = authClient.useSession();
      const user = session?.user;
      console.log("Current User of Recruiter Page:", user);

      if(isPending) {
        return <div>Loading...</div>;
      }
      const recruiterStats = [
    { title: "Total Job Posts", value: "48", icon: Briefcase },
    { title: "Total Applicants", value: "1,284", icon: Persons },
    { title: "Active Jobs", value: "18", icon: Thunderbolt },
    { title: "Jobs Closed", value: "32", icon: CircleCheck },
  ];
     
    return (
        <div className="p-6 space-y-6">
            <h2>Welcome Back, {user?.name}</h2>
            <DashboardStats statsData={recruiterStats} />
        </div>
    );
};

export default RecruiterPage;