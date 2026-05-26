import { createAuthClient } from "better-auth/react"

// 1. Create your configured client instance
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL, // Note: In Next.js clientside, use NEXT_PUBLIC_BETTER_AUTH_URL if this value is needed directly on the client.
})

// 2. Extract the methods directly from your configured instance
export const { signIn, signUp, useSession } = authClient;