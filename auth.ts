import NextAuth, { DefaultSession } from 'next-auth';
import { authConfig } from './auth.config';

declare module "next-auth" {
  interface Session {
    user: {
      address: string,
      id: string,
      adm: boolean | null,
      organization: string
    } & DefaultSession["user"]
  }
  interface User {
    address: string,
    adm: boolean,
    organization: string,
  }
}

//extend the auth.config object with the login and logout functions
 
export const { auth, signIn, signOut, handlers } = NextAuth({
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});