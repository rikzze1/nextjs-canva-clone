import { redirect } from 'next/navigation';
import { auth } from '@/auth';

import { EditorWrapper } from '@/components/ClientWrappers/EditorWrapper';

const EditorProjectIdPage = async ({ params }: { params: Promise<{ projectid: string }> }) => {
  const session = await auth();

  if (!session) {
    redirect('/sign-in');
  }

  const { projectid } = await params;

  return (
    <div className='w-full h-screen overflow-hidden'>
      <EditorWrapper variant='fill' params={{ projectId: projectid }} />
    </div>
  );
};

export default EditorProjectIdPage;
