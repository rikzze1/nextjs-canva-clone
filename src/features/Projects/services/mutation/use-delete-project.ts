import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<
  (typeof client.api.projects)[':id']['$delete'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[':id']['$delete']
>['param'];

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async param => {
      const response = await client.api.projects[':id'].$delete({
        param,
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects', {
        id: data.id
      }] });
    },
    onError: () => {
      toast.error('Failed to delete project');
    },
  });
};
