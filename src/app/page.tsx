'use client';

import {CollectionDisplay} from '@/components/CollectionDisplay';
// import {SidebarProvider} from '@/components/ui/sidebar'; // Remove SidebarProvider
import {Toaster} from '@/components/ui/toaster';
import inventoryData from '@/data/master_inventory_colab.json'; // Import the JSON data

export default function Home() {
  return (
    <>
      {/* Pass the imported data as a prop */}
      <CollectionDisplay items={inventoryData} /> 
      <Toaster />
    </>
  );
}
