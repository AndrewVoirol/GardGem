
'use client';

import {Search, Upload} from 'lucide-react';
import React from 'react';

import {
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function AppSidebarContent() {
  return (
    <SidebarContent>
      <SidebarHeader>
        <SidebarInput placeholder="Search" type="search" />
      </SidebarHeader>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Search className="mr-2 h-4 w-4" />
              <span>Search</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Upload className="mr-2 h-4 w-4" />
              <span>Upload</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
