import NextAuth from 'next-auth';

import authConfig from '@/auth.config';

declare module 'next-auth/jwt' {
  interface JWT {
    id: string | undefined;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
