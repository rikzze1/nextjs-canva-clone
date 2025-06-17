import { redirect } from 'next/navigation';

import { auth } from '@/auth';

import { SignOutCard } from '@/features/auth/components/SignOutCard';

const SignUpPage = async () => {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <div className='h-full w-full flex items-center justify-center'>
      <div className='h-full w-full md:h-auto md:w-[420px]'>
        <SignOutCard />
      </div>
    </div>
  );
};

export default SignUpPage;
