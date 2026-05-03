import { useState, useEffect } from 'react';
import { useZustandStore } from '../../src/store/authStore';

interface UseAuthReturn {
  user: {
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const useAuth = (): UseAuthReturn => {
  const zustandStore = useZustandStore((state) => state.auth);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const user = zustandStore.user;
        if (!user) {
          setError('No user data found in Zustand store.');
        }
        setLoading(false);
      } catch (err) {
        setError(String(err));
        setLoading(false);
      }
    };

    fetchData();
  }, [zustandStore.user]);

  return {
    user: zustandStore.user,
    loading,
    error,
  };
};

export default useAuth;