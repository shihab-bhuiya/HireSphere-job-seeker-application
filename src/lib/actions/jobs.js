'use server'

const Base_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const createJob = async (newJobData) => {

    const res = await fetch(`${Base_URL}/api/jobs`,{
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(newJobData)
    })

    return res.json();

}