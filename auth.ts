import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { login, hash } from './app/lib/db/schema';


//extend the auth.config object with the login and logout functions
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      
      credentials: {
        user: { label: "user", type: "text" },
        password: {  label: "password", type: "password" }
      },
      
      async authorize(credentials) {
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
});