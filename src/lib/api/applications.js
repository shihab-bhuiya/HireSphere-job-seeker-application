import { serverFetch } from "../core/server"

export const getApplicationByApplicant = async(applicantId)=>{
    return await serverFetch(`/api/applications?applicantId=${applicantId}`);
}