import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

import { db } from '@/db/drizzle';
import { accounts, users } from '@/db/schema';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  providers: [Github],
  pages: {
    signIn: '/sign-in',
  },
});
