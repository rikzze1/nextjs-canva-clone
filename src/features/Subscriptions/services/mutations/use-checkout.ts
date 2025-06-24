'use client';

import { useMutation } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<(typeof client.api.subscriptions.checkout)['$post']>;

export const useCheckout = () => {
  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.subscriptions.checkout.$post();

      if (!response.ok) {
        throw new Error('Failed to create session');
      }

      return await response.json();
    },
    // @ts-expect-error - Response type structure may vary
    onSuccess: ({ data }) => {
      window.location.href = data;
    },
    onError: () => {
      toast.error('Failed to create session');
    },
  });
};
