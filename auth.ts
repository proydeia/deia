import NextAuth, { DefaultSession, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { login, hash, googleOauth } from './app/lib/dbSchema/schema';
import google from 'next-auth/providers/google';

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