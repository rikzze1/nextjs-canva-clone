'use client';

import { useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa6';
import Link from 'next/link';

import { Card, CardTitle, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signInAuth } from '@/lib/auth-action';
import { Loader } from 'lucide-react';

export const SignOutCard = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const onProviderSignOut = async (provider: 'google' | 'github') => {
    setTimeout(() => {
      if (provider === 'google') setIsGoogleLoading(true);
      if (provider === 'github') setIsGithubLoading(true);
    }, 1000);

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
    <Card className='w-full h-full p-8 border-1 border-zinc-200 bg-white'>
      <CardHeader className='px-0 pt-0 font-semibold text-xl'>
        <CardTitle>Create an account</CardTitle>
        <CardDescription className='text-semibold text-sm text-zinc-600'>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4 px-0 pb-0'>
        <div className='flex flex-col gap-2 px-0 pb-0'>
          <Button
            onClick={() => onProviderSignOut('github')}
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
            onClick={() => onProviderSignOut('google')}
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
          Already have an account?{' '}
          <Link href='/sign-in'>
            <span className='text-sky-700 hover:underline'>Sign in</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
