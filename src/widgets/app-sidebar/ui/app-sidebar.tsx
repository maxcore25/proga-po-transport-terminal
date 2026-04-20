'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/shared/ui/sidebar';
import { NavMain } from '@/widgets/app-sidebar/ui/nav-main';
import { NavUser } from '@/widgets/app-sidebar/ui/nav-user';
import { TeamSwitcher } from '@/widgets/app-sidebar/ui/team-switcher';
import { Code2, Home } from 'lucide-react';
import * as React from 'react';

const data = {
  team: {
    name: 'CodeCraft',
    logo: Code2,
  },
  navMain: [
    {
      title: 'Главная',
      url: '#',
      icon: Home,
      isActive: true,
      items: [
        {
          title: 'Основная',
          url: '/',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher team={data.team} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
