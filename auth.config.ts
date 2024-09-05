import type { NextAuthConfig, DefaultSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { googleOauth } from './app/lib/dbSchema/schema';

declare module "next-auth" {
  interface Session {
    user: {
      address: string,
      admin: boolean | null,
    } & DefaultSession["user"]
  }
}

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  
  pages: {
    signIn: '/login',
    error: '/login',
  },
  
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isOnAuthorized = nextUrl.pathname.startsWith('/authorized');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      
      if (isOnLogin && isLoggedIn) {
        return NextResponse.redirect(new URL('/authorized', nextUrl));
      }

      if (isOnAuthorized && !isLoggedIn) {
        return false;
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;