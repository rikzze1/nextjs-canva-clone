'use client';

import { useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa6';
import Link from 'next/link';

import { Card, CardTitle, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signInAuth } from '@/lib/auth-action';
import { Loader } from 'lucide-react';

export const SignInCard = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const onProviderSignIn = async (provider: 'google' | 'github') => {
    if (provider === 'google') setIsGoogleLoading(true);
    if (provider === 'github') setIsGithubLoading(true);

    try {
      await signInAuth(provider);
    } catch (error) {
      console.log('Sign in failed', error);
    } finally {
      if (provider === 'google') setIsGoogleLoading(false);
      if (provider === 'github') setIsGithubLoading(false);
    }
  };

  return (
    <Card className='w-full h-full p-8 border-1 border-zinc-200'>
      <CardHeader className='px-0 pt-0 font-semibold text-xl'>
        <CardTitle>Login to continue</CardTitle>
        <CardDescription className='text-semibold text-sm text-zinc-600'>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4 px-0 pb-0'>
        <div className='flex flex-col gap-2 px-0 pb-0'>
          <Button
            onClick={() => onProviderSignIn('github')}
            disabled={isGithubLoading}
            className='bg-black text-white hover:bg-black/80'
          >
            <FaGithub />
            {!isGithubLoading ? (
              <span>Continue with Github</span>
            ) : (
              <Loader className='animate-spinner size-4' />
            )}
          </Button>
          <Button
            onClick={() => onProviderSignIn('google')}
            disabled={isGoogleLoading}
            className='bg-black text-white hover:bg-black/80'
          >
            <FaGoogle />
            {!isGoogleLoading ? (
              <span>Continue with Google</span>
            ) : (
              <Loader className='animate-spinner size-4' />
            )}
          </Button>
        </div>
        <p className='text-sm text-muted-foreground'>
          Dont&apos;t have an account?{' '}
          <Link href='/sign-up'>
            <span className='text-sky-700 hover:underline'>Sign up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
