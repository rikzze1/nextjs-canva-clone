import React from 'react';

import { Sidebar } from '@/features/Dashboard/components/Sidebar';
import { Navbar } from '@/features/Dashboard/components/Navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className='bg-zinc-100 h-full'>
      <Sidebar />
      <div className='lg:pl-[300px] flex flex-col h-full'>
        <Navbar />
        <main className='bg-white flex-1 overflow-auto p-8 rounded-tl-2xl'>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
