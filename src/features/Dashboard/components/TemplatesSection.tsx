'use client';

import { useRouter } from 'next/navigation';
import { Loader, TriangleAlert } from 'lucide-react';

import { ResponseType } from '@/features/Projects/services/queries/use-get-projects';
import { useGetTemplates } from '@/features/Projects/services/queries/use-get-templates';
import { useCreateProject } from '@/features/Projects/services/mutation/use-create-project';
import { usePaywall } from '@/features/Subscriptions/hooks/use-paywall';

import { TemplateCard } from '@/features/Dashboard/components/TemplateCard';

export const TemplatesSection = () => {
  const router = useRouter();

  const { shouldBlock, triggerPaywall } = usePaywall();
  const mutation = useCreateProject();

  const { data, isLoading, isError } = useGetTemplates({
    page: '1',
    limit: '4',
  });

  const onClick = (template: ResponseType['data'][0]) => {
    if (template.isPro && shouldBlock) {
      triggerPaywall();
      return;
    }

    mutation.mutate(
      {
        name: `${template.name} project`,
        json: template.json,
        width: template.width,
        height: template.height,
      },
      {
        // @ts-expect-error - Response type structure may vary
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div>
        <h3 className='font-semibold text-lg'>Start from a template</h3>
        <div className='flex items-center justify-center h-32'>
          <Loader className='size-6 text-gray-400 animate-spin' />
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return null;
  }

  if (isError) {
    return (
      <div>
        <h3 className='font-semibold text-lg'>Start from a template</h3>
        <div className='flex items-center justify-center h-32'>
          <TriangleAlert className='size-6 text-gray-400 animate-spin' />
          <p>Failed to load templates</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className='font-semibold text-lg'>Start from a template</h3>
      <div className='grid grid-cols-2 md:grid-cols-4 mt-4 gap-4'>
        {data?.map(template => (
          <TemplateCard
            key={template.id}
            title={template.name}
            imageSrc={template.thumbnailUrl || ''}
            onClick={() => onClick(template)}
            disabled={mutation.isPending}
            description={`${template.width} x ${template.height}px`}
            width={template.width}
            height={template.height}
            isPremium={template.isPro}
            isPro={template.isPro}
          />
        ))}
      </div>
    </div>
  );
};
