'use client';

import { usePathname } from 'next/navigation';
import { Crown, Home, CreditCard, MessageCircleQuestion } from 'lucide-react';

import { SidebarItem } from '@/features/Dashboard/components/SidebarItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const SidebarRoutes = () => {
  const pathname = usePathname();

  return (
    <div className='flex flex-col gap-y-4 flex-1'>
      <div className='px-4'>
        <Button
          onClick={() => {}}
          className='w-full rounded-xl border-none bg-white hover:bg-white/80 hover:opacity-75 transition'
          variant='outline'
          size='lg'
        >
          <Crown className='mr-2 size-4 fill-yellow-500 text-yellow-500' />
          Upgrade to Image AI Pro
        </Button>
      </div>
      <div className='px-3'>
        <Separator />
      </div>
      <ul className='flex flex-col gap-y-1 px-3'>
        <SidebarItem href='/' icon={Home} label='Home' isActive={pathname === '/'} />
      </ul>
      <div className='px-3 w-full'>
        <Separator className='bg-zinc-200' />
      </div>
      <ul className='flex flex-col gap-y-1 px-3'>
        <SidebarItem
          href={pathname}
          icon={CreditCard}
          label='Billing'
          isActive={pathname === '/'}
          onClick={() => {}}
        />
        <SidebarItem
          href='mailto:support@mm.rikkimae@gmail.com'
          icon={MessageCircleQuestion}
          label='Get Help'
        />
      </ul>
    </div>
  );
};
