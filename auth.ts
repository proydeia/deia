import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
//import { logIn, hash } from './app/lib/db/schema';
import { User } from 'next-auth';

 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        //   const username = credentials.user as string;
        //   const password = await hash(credentials.password as string);

        //   console.log(password);
  
        //   const inputData:{name:string, password:string} = {name: username, password: password };
          
        //   const user = await logIn(inputData);
          
        //   return user as User;
        return null;
    },
    }),
  ],
});