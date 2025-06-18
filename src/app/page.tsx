import { protectServer } from '@/features/auth/utils';

export default async function Home() {
  await protectServer();

  return <div className='h-full'>You are logged in</div>;
}
