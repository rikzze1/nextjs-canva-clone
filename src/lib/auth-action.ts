'use server';

import { signIn } from '@/auth';

export async function signInAuth(auth: 'google' | 'github') {
  return await signIn(auth, {
    callbackUrl: '/',
  });
}
