'use client';

import { CheckCircle2 } from 'lucide-react';

import { useSubscriptionModal } from '@/features/Subscriptions/store/use-subscription-modal';
import { useCheckout } from '@/features/Subscriptions/services/mutations/use-checkout';

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo/Logo';

export const SubscriptionModal = () => {
  const mutation = useCheckout();
  const { isOpen, onClose } = useSubscriptionModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-1/3 bg-white'>
        <DialogHeader className='flex items-center space-y-4'>
          <Logo variant='large' />
          <DialogTitle className='text-center'>Upgrade to a paid plan</DialogTitle>
          <DialogDescription className='text-center'>
            Upgrade to a paid plan to unlock more features
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <ul className='space-y-2'>
          <li className='flex items-center'>
            <CheckCircle2 className='size-5 mr-2 fill-blue-500 text-white' />
            <p className='text-sm text-gray-700'>Unlimited projects</p>
          </li>
          <li className='flex items-center'>
            <CheckCircle2 className='size-5 mr-2 fill-blue-500 text-white' />
            <p className='text-sm text-gray-700'>AI Background removal</p>
          </li>
          <li className='flex items-center'>
            <CheckCircle2 className='size-5 mr-2 fill-blue-500 text-white' />
            <p className='text-sm text-gray-700'>AI Image generation</p>
          </li>
        </ul>
        <DialogFooter className='pt-2 mt-4 gap-y-2'>
          <Button
            className='w-full bg-black text-white hover:opacity-80'
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
