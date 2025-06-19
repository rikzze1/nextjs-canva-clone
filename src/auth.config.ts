import type { NextAuthConfig } from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import z from 'zod';
import { eq } from 'drizzle-orm';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { JWT } from 'next-auth/jwt';

import { db } from '@/db/drizzle';
import { accounts, users } from '@/db/schema';
import bcrypt from 'bcryptjs';

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

declare module 'next-auth/jwt' {
  interface JWT {
    id: string | undefined;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string | undefined;
  }
}

export default {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validatedFields = CredentialsSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const query = await db.select().from(users).where(eq(users.email, email));

        const user = query[0];

        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
    Github,
    Google,
  ],
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
