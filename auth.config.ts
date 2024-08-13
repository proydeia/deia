import type { NextAuthConfig, DefaultSession } from 'next-auth';
import { NextResponse } from 'next/server';

declare module "next-auth" {
  interface Session {
    user: {
      address: string,
      admin: boolean | null,
    } & DefaultSession["user"]
  }
}

export const authConfig = {
  secret: "vncuwipehwcvuwcvnweui938ry8", //cambiar a proccess.env.AUTH_SECRET
  
  pages: {
    signIn: '/login',
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

    jwt({token, user}) {
      if (user) {
        return {...token, ...user};
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        }
      
      };
    },

  },
  providers: [],
} satisfies NextAuthConfig;