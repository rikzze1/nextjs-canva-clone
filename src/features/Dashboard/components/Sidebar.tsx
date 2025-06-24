import React from 'react';

import { Logo } from '@/features/Dashboard/components/Logo';
import { SidebarRoutes } from '@/features/Dashboard/components/SidebarRoutes';

export const Sidebar = () => {
  return (
    <aside className='hidden lg:flex fixed flex-col w-[300px] lef-0 shrink-0 h-full'>
      {/* @ts-expect-error - Logo component may not have variant prop */}
      <Logo variant='large' />
      <SidebarRoutes />
    </aside>
  );
};
