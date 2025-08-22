import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService, LoginRequest, RegisterRequest, validatePassword } from '@/services/api';

interface User {
  id: string | number;
  email: string;
  name?: string;
}

type AuthContextType = {
  user: User | null;
  loadingAuth: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ success: boolean; message: string }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Carrega dados do usuário ao iniciar o app
  useEffect(() => {
    async function loadStoredAuth() {
      try {
        const [storedToken, storedUser] = await AsyncStorage.multiGet([
          '@AuthToken',
          '@UserData'
        ]);

        const token = storedToken[1];
        const userData = storedUser[1];

        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.log('Erro ao carregar dados de autenticação:', error);
        // Se houver erro, limpa dados corrompidos
        await AsyncStorage.multiRemove(['@AuthToken', '@RefreshToken', '@UserData']);
      } finally {
        setLoadingAuth(false);
      }
    }

    loadStoredAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const credentials: LoginRequest = { email, password };
      const response = await authService.signIn(credentials);

      console.log('🔐 AuthContext - Resposta do login:', JSON.stringify(response, null, 2));

      // Sua API retorna { message: "...", data: { token, refreshToken, user } }
      if (response.data && response.data.token && response.data.refreshToken) {
        console.log('✅ Login bem-sucedido - salvando tokens');
        // Salva tokens e dados do usuário
        await AsyncStorage.multiSet([
          ['@AuthToken', response.data.token],
          ['@RefreshToken', response.data.refreshToken],
          ['@UserData', JSON.stringify(response.data.user || {})]
        ]);

        if (response.data.user) {
          setUser(response.data.user);
        }

        return {
          success: true,
          message: response.message || 'Login realizado com sucesso!'
        };
      } else {
        console.log('❌ Login falhou - response:', response);
        return {
          success: false,
          message: response.message || 'Erro no login'
        };
      }
    } catch (error) {
      console.log('Erro no signIn:', error);
      return {
        success: false,
        message: 'Erro de conexão. Verifique sua internet.'
      };
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      // Valida senha forte
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return {
          success: false,
          message: `Senha deve ter: ${passwordValidation.errors.join(', ')}`
        };
      }

      const userData: RegisterRequest = { email, password, name };
      const response = await authService.signUp(userData);

      console.log('📱 Resposta do signUp:', response);

      // Verifica se o cadastro foi bem-sucedido
      if (response.message === 'Usuário criado com sucesso' && response.data) {
        // Usuário foi criado, agora precisa fazer login para pegar os tokens
        console.log('✅ Usuário criado, fazendo login automático...');
        
        const loginResult = await signIn(email, password);
        
        if (loginResult.success) {
          return {
            success: true,
            message: 'Conta criada e login realizado com sucesso!'
          };
        } else {
          return {
            success: false,
            message: 'Conta criada, mas houve erro no login. Tente fazer login manualmente.'
          };
        }
      } else if (response.success && response.data && response.data.token && response.data.refreshToken) {
        // Se já veio com tokens (caso futuro)
        await AsyncStorage.multiSet([
          ['@AuthToken', response.data.token],
          ['@RefreshToken', response.data.refreshToken],
          ['@UserData', JSON.stringify(response.data.user || {})]
        ]);

        if (response.data.user) {
          setUser(response.data.user);
        }

        return {
          success: true,
          message: 'Conta criada com sucesso!'
        };
      } else {
        return {
          success: false,
          message: response.message || 'Erro no cadastro'
        };
      }
    } catch (error) {
      console.log('Erro no signUp:', error);
      return {
        success: false,
        message: 'Erro de conexão. Verifique sua internet.'
      };
    }
  };

  const signOut = async () => {
    try {
      // Faz logout na API (adiciona token na blacklist)
      await authService.signOut();
    } catch (error) {
      console.log('Erro ao fazer logout na API:', error);
    } finally {
      // Remove dados localmente
      await AsyncStorage.multiRemove(['@AuthToken', '@RefreshToken', '@UserData']);
      setUser(null);
    }
  };

  const value = {
    user,
    loadingAuth,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}