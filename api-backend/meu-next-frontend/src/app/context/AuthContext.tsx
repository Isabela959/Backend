// app/context/AuthContext.tsx
'use client'; // ESSENCIAL: Este é um componente de cliente

import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: any) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const checkAuth = () => {
    // No Next.js, a verificação real é feita no middleware.
    // Aqui, podemos apenas verificar se o estado local é verdadeiro
    // ou, se necessário, fazer uma chamada a uma rota '/api/me' para validar o token.
    // Para este tutorial, o middleware cuidará disso.
    // Esta função se torna mais útil para forçar uma verificação do lado do cliente.
    const tokenExists = document.cookie.includes('authToken=');
    setIsAuthenticated(tokenExists);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (data: any) => {
    await axios.post('/api/auth/login', data);
    setIsAuthenticated(true);
    router.push('/products');
  };

  const logout = async () => {
    await axios.post('/api/auth/logout');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};