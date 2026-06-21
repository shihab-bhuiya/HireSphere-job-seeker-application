import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db("HireSphere");

export const auth = betterAuth({
    trustedOrigins: [
      // process.env.BETTER_AUTH_URL,
      process.env.LOCAL_URL,
  ],
      emailAndPassword: { 
    enabled: true, 
  }, 
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  user: {
    additionalFields: {
      role: {
        default: "seeker"
      },
         plan: {
                default: 'seeker_free'
            }
    }
  }
});