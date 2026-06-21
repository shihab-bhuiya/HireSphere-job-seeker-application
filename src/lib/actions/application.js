'use server'

import { serverMutation } from "../core/server"

export const  submitApplication = async (applicationData)=>{
    return await serverMutation('/api/applications',applicationData);
}