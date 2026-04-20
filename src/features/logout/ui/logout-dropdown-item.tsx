'use client';

import { clearAuthTokens } from '@/shared/api';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLogout } from '../model/use-logout';
import { useAuthStore } from '@/features/auth';

export const LogoutDropdownItem = () => {
  const router = useRouter();
  const { mutate } = useLogout();
  const setUser = useAuthStore(s => s.setUser);

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        clearAuthTokens();
        router.push('/login');
        setUser(null);
      },
    });
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      Выйти
    </DropdownMenuItem>
  );
};
