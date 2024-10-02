import { Navbar } from '@/src/components/ui/navbar';
import React from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative flex flex-col h-screen'>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
