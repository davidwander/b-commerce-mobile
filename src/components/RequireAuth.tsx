import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.replace("../contexts/AuthContext"); // redireciona para login se não estiver logado
    }
  }, [user]);

  if (!user) return null; // não renderiza nada enquanto redireciona

  return <>{children}</>;
};
