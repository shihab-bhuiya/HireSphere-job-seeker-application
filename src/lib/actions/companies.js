'use server'

import { serverMutation } from "../core/server"


export const createCompany = async(companyData)=>{
    return await serverMutation('/api/my/companies', companyData)
}

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

// export const createCompany = async(companyData)=>{
//     const res = await fetch(`${baseUrl}/api/companies`,{
//         method: "POST",
//         headers:{
//             'content-type': 'application/json'
//         },
//         body : JSON.stringify(companyData)
//     })
//     const data = await res.json()
//     return data;
// }

// /** @format */
// "use server";

// export async function createCompany(companyData) {
//   try {
//     const response = await fetch("http://localhost:5000/api/my/companies", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(companyData),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Failed to communicate with API server");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Server Action Execution Error:", error.message);
//     throw error;
//   }
// }