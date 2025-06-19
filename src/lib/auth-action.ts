'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function signInAuth(auth: 'google' | 'github') {
  try {
    await signIn(auth, {
      redirectTo: '/',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'OAuthSignInError':
          redirect('/sign-in?error=OAuthSignInError');
        default:
          redirect('/sign-in?error=Unknown');
      }
    }
    throw error;
  }
}

export async function signInAutCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password' };
        default:
          return { error: 'Authentication failed' };
      }
    }
    throw error;
  }
}
