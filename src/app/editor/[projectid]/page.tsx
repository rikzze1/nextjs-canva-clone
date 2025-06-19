import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { EditorWrapper } from '@/components/ClientWrappers/EditorWrapper';

const EditorProjectIdPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <div className='w-full h-screen overflow-hidden'>
      <EditorWrapper variant='fill' />
    </div>
  );
};

export default EditorProjectIdPage;
