import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";


const Base_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getRecruiterCompanies = async (recruiterId) => {
  return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`)
};

export const getLoggedInRecruiterCompany = async () => {
 const user = await getUserSession();
 return getRecruiterCompanies(user?.id);

}