import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<(typeof client.api.projects)['$post']>;
type RequestType = InferRequestType<(typeof client.api.projects)['$post']>['json'];

export const useCreateProject = () => {
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async json => {
      const response = await client.api.projects.$post({ json });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('Project created');
    },
    onError: () => {
      toast.error('Failed to create project');
    },
  });
};
