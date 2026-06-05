

const Base_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getCompanyJobs = async (companyId, status="active") => {

    const res = await fetch(`${Base_URL}/api/jobs?companyId=${companyId}&status=${status}`,{
        method: 'GET',
        headers:{
            'content-type': 'application/json'
        }
    })
    return res.json();

}
