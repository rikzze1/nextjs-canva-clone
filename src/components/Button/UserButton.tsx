'use client';

import { useSession, signOut } from 'next-auth/react';
import { CreditCard, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader } from 'lucide-react';

export const UserButton = () => {
  const session = useSession();

  if (session.status === 'loading') {
    return <Loader className='animate-spin size-4 text-black' />;
  }

  if (session.status === 'unauthenticated' || !session.data) {
    return null;
  }

  const name = session.data.user?.name || 'User';
  const imageUrl = session.data.user?.image;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className='size-10 hover:opacity-75 transition'>
          <AvatarImage alt={name} src={imageUrl || ''} />
          <AvatarFallback className='bg-blue-500 font-medium text-white flex items-center justify-center'>
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-60 bg-white border border-gray-200'>
        <DropdownMenuItem
          disabled={false}
          onClick={() => {}}
          className='h-10 cursor-pointer hover:bg-gray-200'
        >
          <CreditCard className='size-4 mr-2' />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={false}
          onClick={() => signOut()}
          className='h-10 cursor-pointer hover:bg-gray-200'
        >
          <LogOut className='size-4 mr-2' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
