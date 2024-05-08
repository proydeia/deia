import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';
 
export const authConfig = {

  secret: "vncuwipehwcvuwcvnweui938ry8", //cambiar a proccess.env.AUTH_SECRET
  
  pages: {
    signIn: '/login',
  },
  
  session: {strategy: 'jwt'},
  
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
    return {...token, ...user};
  },

  async session({session, token}) {
    session.userId = token.id as string;
    session.user.id = token.id as string;
    return session;
  },
},

  providers: [],
  
} satisfies NextAuthConfig;