import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<(typeof client.api.users)['$post']>;
type RequestType = InferRequestType<(typeof client.api.users)['$post']>['json'];

export const useSignUp = () => {
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async json => {
      const response = await client.api.users.$post({ json });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('Account created successfully');
    },
    onError: (error: Error) => {
      const message = error.message ?? 'Signup Error. Please try again.';
      toast.error(message);
    },
  });
};
