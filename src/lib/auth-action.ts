'use server';

import { signIn } from '@/auth';

export async function signInAuth(auth: 'google' | 'github') {
  return await signIn(auth, {
    callbackUrl: '/',
  });
}

export async function signInAutCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return await signIn('credentials', {
    email: email,
    password: password,
    callbackUrl: '/',
  });
}
