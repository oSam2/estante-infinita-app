import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export function useProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/sign-in');
    }
  }, [isAuthenticated, loading]);

  return { isAuthenticated, loading };
}
