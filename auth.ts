import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { login, hash, googleOauth } from './app/lib/dbSchema/schema';
import google from 'next-auth/providers/google';
import { NextResponse } from 'next/server';


//extend the auth.config object with the login and logout functions
 
export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,

  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      
      credentials: {
        user: { label: "user", type: "text" },
        password: {  label: "password", type: "password" }
      },
      
      async authorize(credentials) {
        console.log(credentials)
        let user = null;

        const username = credentials.user as string;
        const password = credentials.password as string;
        
        const inputData:{name:string, password:string} = {name: username, password: await hash(password)};

        user = await login(inputData);

        if(!user || user.error) return null;

        return user as User;
      },
    }),
  ],
  callbacks: {

    async signIn({account, profile, user}) {
      if (account?.provider === 'credentials') {
          return true;
      }
      if(account?.provider === 'google' && profile) {
        const check = await googleOauth(profile.email as string);
        if(check) {
          user.id = check.id;
          return true;
        }
        return false;
      }
      return false;
    },

    async jwt({token, user}) {
        return {...token, ...user};
    },
  
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        }
      };
    },
  },
});