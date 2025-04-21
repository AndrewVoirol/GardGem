'use client';

import {CollectionDisplay} from '@/components/CollectionDisplay';
// import {SidebarProvider} from '@/components/ui/sidebar'; // Remove SidebarProvider
import {Toaster} from '@/components/ui/toaster';

export default function Home() {
  return (
    <>
      <CollectionDisplay />
      <Toaster />
    </>
  );
}

