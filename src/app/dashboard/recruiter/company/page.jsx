
import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';
import { getLoggedInRecruiterCompany, getRecruiterCompanies } from '@/lib/api/companies';

const CompanyPage = async () => {

        const user = await getUserSession();
        const recruiterCompany = await getRecruiterCompanies(user?.id);
        const userLoggedIn = await getLoggedInRecruiterCompany();
        console.log("Current User Session:", user);
        console.log("Recruiter Company:", recruiterCompany);
        console.log("User Logged In Company:", userLoggedIn);
    return (
        <div>
            <CompanyProfile recruiter={user} recruiterCompany={recruiterCompany}></CompanyProfile>
        </div>
    );
};

export default CompanyPage;