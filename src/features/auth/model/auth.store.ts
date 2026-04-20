import { User } from '@/entities/user';
import { create } from 'zustand';

type AuthState = {
  user: User | null;
};

type AuthActions = {
  setUser: (user: User | null) => void;
  reset: () => void;
};

type AuthStore = AuthState & AuthActions;

const initialAuthState: AuthState = {
  user: null,
};

export const useAuthStore = create<AuthStore>(set => ({
  ...initialAuthState,

  setUser: user => set({ user }),

  reset: () => {
    set({ ...initialAuthState });
  },
}));
