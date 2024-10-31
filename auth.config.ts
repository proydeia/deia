import type { NextAuthConfig, User  } from 'next-auth';
import { NextResponse } from 'next/server';
import { hash } from "#/auth/salt&hash";
import { login, googleOauth } from "#/auth/credentialLogin";
import Credentials from 'next-auth/providers/credentials';
import google from 'next-auth/providers/google';

export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },

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
          user.adm = check.adm;
          user.organization = check.organization;
          return true;
        }
        return false;
      }
      return false;
    },

    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
        token.adm = user.adm;
        token.organization = user.organization;
      }
      return token;
    },
  
    async session({ session, token, user }) {
      if (token) {
        session.user = { ...token, ...user };
      }
      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const adm = !!auth?.user?.adm;

      const isOnMedic = nextUrl.pathname.startsWith('/medic');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin')
      
      
      if (!isLoggedIn && (isOnMedic || isOnAdmin)) {
        return false;
      }

      if (isOnLogin && isLoggedIn) {
        if(adm){
          return NextResponse.redirect(new URL('/admin', nextUrl));
        }
        return NextResponse.redirect(new URL('/medic', nextUrl));
      }

      if(adm && isOnMedic) {
        return NextResponse.redirect(new URL('/admin', nextUrl));
      }

      if(!adm && isOnAdmin) {
        return NextResponse.redirect(new URL('/medic', nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;