import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { login } from './app/lib/db/schema';
import { User } from 'next-auth';

 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {

        const username = credentials.user as string;
        const password = credentials.password as string;
        
        const inputData:{name:string, password:string} = {name: username, password: password};
        
        const user = await login(inputData);
        if(!user)
        {
          return null;
        }   

        return user;
      },
    }),
  ],
});