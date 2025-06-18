'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaGithub, FaGoogle } from 'react-icons/fa6';
import { Loader } from 'lucide-react';

import { Card, CardTitle, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signInAutCredentials, signInAuth } from '@/lib/auth-action';
import { Logo } from '@/components/Logo/Logo';

export const SignInCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const params = useSearchParams();
  const error = params.get('error');

  const [isCredLoding, setIsCredLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const onCredentialSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTimeout(() => {
      setIsCredLoading(true);
    }, 500);

    try {
      signInAutCredentials({ email, password });
    } catch (error) {
      console.log('login Error. Please try again', error);
    } finally {
      setIsCredLoading(false);
    }
  };

  const onProviderSignIn = async (provider: 'google' | 'github') => {
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
    <div className='flex flex-col w-full items-center justify-center gap-10'>
      <div className='flex flex-col gap-2 items-center justify-center w-full'>
        <Logo variant='large' />
        <motion.span
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial='hidden'
          animate='visible'
          transition={{ duration: 0.8, delay: 0.25 }}
          className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 font-bold text-3xl text-center'
        >
          IMG CANVAS
        </motion.span>
      </div>
      <motion.Card
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
        initial='hidden'
        animate='visible'
        transition={{ duration: 0.9, delay: 0.35 }}
        className='w-full h-full p-8 border-1 border-zinc-200 bg-white rounded-lg'
      >
        <CardHeader className='px-0 pt-0 font-semibold text-xl'>
          <CardTitle>Login to continue</CardTitle>
          <CardDescription className='text-semibold text-sm text-zinc-600 mb-5'>
            Use your email or another service to continue
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
            <TriangleAlert className='size-4' />
            <p>Invalid email or password</p>
          </div>
        )}
        <CardContent className='flex flex-col w-full justify-center items-center gap-4 px-0 pb-0'>
          <form onSubmit={onCredentialSignIn} className='w-full space-y-2.5'>
            <Input
              className='border border-gray-300'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Email'
              type='email'
              required
            />
            <Input
              className='border border-gray-300'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Password'
              type='password'
              required
            />
            <Button
              type='submit'
              className='w-full text-white bg-black cursor-pointer hover:bg-black/80'
              size='lg'
              disabled={isCredLoding}
            >
              {!isCredLoding ? (
                <span>Continue</span>
              ) : (
                <Loader className='animate-spinner size-4' />
              )}
            </Button>
          </form>
          <Separator className='bg-gray-200' />
          <div className='flex flex-col w-full justify-center items-center gap-2 px-0 pb-0'>
            <Button
              onClick={() => onProviderSignIn('google')}
              disabled={isGoogleLoading}
              variant='outline'
              size='lg'
              className='w-full min-w-full'
            >
              <FaGoogle />
              {!isGoogleLoading ? (
                <span>Continue with Google</span>
              ) : (
                <Loader className='animate-spinner size-4' />
              )}
            </Button>
            <Button
              onClick={() => onProviderSignIn('github')}
              disabled={isGithubLoading}
              variant='outline'
              size='lg'
              className='w-full min-w-full'
            >
              <FaGithub />
              {!isGithubLoading ? (
                <span>Continue with Github</span>
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
      </motion.Card>
    </div>
  );
};
