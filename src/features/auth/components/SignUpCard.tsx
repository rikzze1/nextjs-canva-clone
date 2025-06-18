'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaGoogle } from 'react-icons/fa6';
import { Loader } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { useSignUp } from '@/features/auth/services/mutation/use-signup';

import { Card, CardTitle, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/Logo/Logo';
import { signInAutCredentials } from '@/lib/auth-action';

export const SignUpCard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const params = useSearchParams();
  const error = params.get('error');

  const signUpMutation = useSignUp();

  const onCredentialSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpMutation.mutate(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          signInAutCredentials({ email, password });
        },
      }
    );
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
        className='w-full h-full rounded-lg p-8 border-1 border-zinc-200 bg-white'
      >
        <CardHeader className='px-0 pt-0 font-semibold text-xl'>
          <CardTitle className='flex flex-col gap-2'>Create an account</CardTitle>
          <CardDescription className='text-sm text-gray-400'>
            Use your email or another service to continue
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
            <TriangleAlert className='size-4' />
            <p>Invalid email or password</p>
          </div>
        )}
        <CardContent className='flex flex-col gap-4 px-0 pb-0'>
          <form onSubmit={onCredentialSignUp} className='space-y-2.5'>
            <Input
              className='border border-gray-300'
              disabled={signUpMutation.isPending}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Name'
              type='text'
              required
            />
            <Input
              className='border border-gray-300'
              disabled={signUpMutation.isPending}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Email'
              type='email'
              required
            />
            <Input
              className='border border-gray-300'
              disabled={signUpMutation.isPending}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Password'
              type='password'
              minLength={3}
              maxLength={20}
              required
            />
            <Button
              type='submit'
              className='w-full text-white bg-black cursor-pointer hover:bg-black/80'
              size='lg'
              disabled={signUpMutation.isPending}
            >
              {signUpMutation.isPending ? (
                <Loader className='size-4 animate-spin' />
              ) : (
                <span>Continue</span>
              )}
            </Button>
          </form>
          <Separator />
          <div className='flex flex-col gap-2 px-0 pb-0'>
            <Button
              onClick={() => onCredentialSignUp}
              className='bg-black text-white hover:bg-black/80'
            >
              <FaGithub />
              <span>Continue with Github</span>
            </Button>
            <Button
              onClick={() => onCredentialSignUp}
              className='bg-black text-white hover:bg-black/80'
            >
              <FaGoogle />
              <span>Continue with Google</span>
            </Button>
          </div>
          <p className='text-sm text-muted-foreground'>
            Already have an account?{' '}
            <Link href='/sign-in'>
              <span className='text-sky-700 hover:underline'>Sign in</span>
            </Link>
          </p>
        </CardContent>
      </motion.Card>
    </div>
  );
};
