import { create } from 'zustand';
import { AxiosError } from '../src/api/client';

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  token: string | null;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
}

interface AuthActions {
  setAuthData: (data: AuthState) => void;
  clearAuthData: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: AxiosError | null) => void;
}

const useAuthStore = create<AuthState>(
  (set) => ({
    user: null,
    token: null,
    isLoading: false,
    isError: false,
    error: null,

    setAuthData: (data: AuthState) => set(data),
    clearAuthData: () => set({ user: null, token: null, isLoading: false, isError: false, error: null }),
    setLoading: (isLoading: boolean) => set({ isLoading }),
    setError: (error: AxiosError | null) => set({ isError, error }),
  })
);

export default useAuthStore;