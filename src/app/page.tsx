import { Button } from '@/components/ui/button';
import { signIn, auth } from '@/auth';

export default async function Home() {
  const session = await auth();

  return <div className='h-full'>{JSON.stringify(session)}</div>;
}
