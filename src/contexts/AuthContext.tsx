import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService, LoginRequest, RegisterRequest, validatePassword } from '@/services/api';

import { debugAuthComplete } from '@/utils/debugTokens';
debugAuthComplete(); 

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
  authenticatedFetch: (url: string, options?: RequestInit) => Promise<Response>;
  getToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Função para obter token atual
  const getToken = async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem('@AuthToken');
      console.log('🔑 Obtendo token:', token ? 'ENCONTRADO' : 'NÃO ENCONTRADO');
      return token;
    } catch (error) {
      console.error('❌ Erro ao obter token:', error);
      return null;
    }
  };

  // Função para refresh do token
  const refreshToken = async (): Promise<boolean> => {
    try {
      console.log('🔄 Tentando renovar token...');
      const refreshTokenValue = await AsyncStorage.getItem('@RefreshToken');
      
      if (!refreshTokenValue) {
        console.log('❌ Refresh token não encontrado');
        await signOut();
        return false;
      }

      // Aqui você precisa implementar a função refreshToken no authService
      // const response = await authService.refreshToken(refreshTokenValue);
      
      // Por enquanto, vamos tentar fazer um novo login se necessário
      console.log('ℹ️ Refresh automático não implementado - redirecionando para login');
      await signOut();
      return false;

    } catch (error) {
      console.error('❌ Erro ao renovar token:', error);
      await signOut();
      return false;
    }
  };

  // Função para fazer requisições autenticadas
  const authenticatedFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    console.log('🌐 Fazendo requisição autenticada para:', url);
    
    const token = await getToken();
    
    if (!token) {
      console.log('❌ Token não encontrado para requisição');
      throw new Error('Token não encontrado');
    }

    // Configura headers com autenticação
    const authHeaders = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    console.log('📋 Headers da requisição:', {
      'Authorization': `Bearer ${token.substring(0, 20)}...`,
      'Content-Type': 'application/json',
      ...Object.keys(options.headers || {}).reduce((acc, key) => {
        acc[key] = 'presente';
        return acc;
      }, {} as Record<string, string>)
    });

    try {
      const response = await fetch(url, {
        ...options,
        headers: authHeaders,
      });

      console.log('📊 Status da resposta:', response.status);

      // Se token expirado (401), tenta renovar
      if (response.status === 401) {
        console.log('🔄 Token expirado, tentando renovar...');
        const refreshed = await refreshToken();
        
        if (refreshed) {
          // Tenta novamente com o novo token
          const newToken = await getToken();
          const newResponse = await fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              'Authorization': `Bearer ${newToken}`,
              'Content-Type': 'application/json',
            },
          });
          
          console.log('📊 Status após renovação:', newResponse.status);
          return newResponse;
        } else {
          throw new Error('Token expirado e não foi possível renovar');
        }
      }

      return response;
    } catch (error) {
      console.error('❌ Erro na requisição autenticada:', error);
      throw error;
    }
  };

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

        console.log('📱 Carregando auth armazenado...');
        console.log('🔑 Token encontrado:', token ? 'SIM' : 'NÃO');
        console.log('👤 Dados do usuário encontrados:', userData ? 'SIM' : 'NÃO');

        if (token && userData) {
          setUser(JSON.parse(userData));
          console.log('✅ Auth carregado com sucesso');
        }
      } catch (error) {
        console.log('❌ Erro ao carregar dados de autenticação:', error);
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

        // Debug: Verificar se tokens foram salvos
        const savedToken = await AsyncStorage.getItem('@AuthToken');
        console.log('🔍 Token salvo no storage:', savedToken ? 'SIM' : 'NÃO');
        if (savedToken) {
          console.log('🔍 Token salvo (primeiros 50 chars):', savedToken.substring(0, 50) + '...');
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
      console.log('❌ Erro no signIn:', error);
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
      console.log('❌ Erro no signUp:', error);
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
      console.log('❌ Erro ao fazer logout na API:', error);
    } finally {
      // Remove dados localmente
      await AsyncStorage.multiRemove(['@AuthToken', '@RefreshToken', '@UserData']);
      setUser(null);
      console.log('🚪 Logout realizado');
    }
  };

  const value = {
    user,
    loadingAuth,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
    authenticatedFetch,
    getToken,
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