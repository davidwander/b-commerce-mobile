import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ URL da sua API - CONFIRME SE ESTÁ CORRETO
const BASE_URL = 'http://192.168.3.7:3333'; // ⚠️ MUDE PARA SEU IP REAL

// Tipos TypeScript
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string; // se sua API aceitar nome
}

export interface AuthResponse {
  success?: boolean;
  message: string;
  data?: {
    token?: string;
    refreshToken?: string;
    user?: {
      id: string | number;
      email: string;
      name?: string;
      createdAt?: string;
    };
    // Para resposta do CreateUserController
    id?: number;
    email?: string;
    name?: string;
    createdAt?: string;
  };
}

// Interface específica para resposta de login (formato real da sua API)
export interface LoginResponse {
  message: string;
  data: {
    token: string;
    refreshToken: string;
    user: {
      id: number;
      email: string;
      name: string;
    };
  };
}

export interface RefreshResponse {
  success: boolean;
  data?: {
    token: string;
  };
}

// Configuração do Axios
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@AuthToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para refresh token automático
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('@RefreshToken');
        if (refreshToken) {
          const response = await axios.post(`${BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          if (response.data.success) {
            const newToken = response.data.data.token;
            await AsyncStorage.setItem('@AuthToken', newToken);
            
            // Retry the original request with new token
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        // Se refresh falhar, limpa tokens e redireciona para login
        await AsyncStorage.multiRemove(['@AuthToken', '@RefreshToken', '@UserData']);
        // Você pode dispatch um evento ou usar navigation aqui se necessário
      }
    }

    return Promise.reject(error);
  }
);

// Services de Autenticação
export const authService = {
  // Login - usa /auth/login
  async signIn(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('🔑 Fazendo login para:', credentials.email);
      console.log('🎯 URL login:', `${BASE_URL}/auth/login`);
      
      const response = await api.post('/auth/login', credentials);
      console.log('✅ Login - Status:', response.status);
      console.log('✅ Login - Resposta:', JSON.stringify(response.data, null, 2));
      
      return response.data;
    } catch (error: any) {
      console.log('❌ Erro no login:', error.message);
      console.log('📊 Login - Status do erro:', error.response?.status);
      console.log('📱 Login - Data do erro:', JSON.stringify(error.response?.data, null, 2));
      
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Erro de conexão no login. Verifique sua internet.',
      };
    }
  },

  // Cadastro - usa /user (CreateUserController)  
  async signUp(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      console.log('🚀 Tentando conectar em:', BASE_URL);
      console.log('📡 Enviando dados:', userData);
      
      const response = await api.post('/user', userData);
      console.log('✅ Resposta recebida:', response.data);
      console.log('✅ Status:', response.status);
      return response.data;
    } catch (error: any) {
      console.log('❌ Erro no cadastro:', error.message);
      console.log('📊 Status do erro:', error.response?.status);
      console.log('📱 Data do erro:', JSON.stringify(error.response?.data, null, 2));
      console.log('📋 Headers:', error.response?.headers);
      
      // Se for erro 409 (usuário já existe), tenta fazer login
      if (error.response?.status === 409) {
        console.log('🔄 Email já existe, tentando fazer login...');
        
        // Extrai email e password dos dados originais
        const loginData = {
          email: userData.email,
          password: userData.password
        };
        
        try {
          const loginResponse = await api.post('/auth/login', loginData);
          console.log('✅ Login automático bem-sucedido:', loginResponse.data);
          return loginResponse.data;
        } catch (loginError: any) {
          console.log('❌ Login automático falhou:', loginError.response?.data);
          return {
            success: false,
            message: 'Email já cadastrado. Tente fazer login.',
          };
        }
      }
      
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: `Erro de conexão: ${error.message}`,
      };
    }
  },

  // Logout - usa /auth/logout (precisa de autenticação)
  async signOut(): Promise<void> {
    try {
      const token = await AsyncStorage.getItem('@AuthToken');
      if (token) {
        await api.post('/auth/logout');
      }
    } catch (error) {
      console.log('Erro no logout da API:', error);
    } finally {
      // Remove tokens localmente mesmo se API falhar
      await AsyncStorage.multiRemove(['@AuthToken', '@RefreshToken', '@UserData']);
    }
  },

  // Refresh token - usa /auth/refresh
  async refreshToken(): Promise<RefreshResponse> {
    try {
      const refreshToken = await AsyncStorage.getItem('@RefreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      const response = await api.post('/auth/refresh', { refreshToken });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
      };
    }
  },
};

// Validador de senha forte (baseado nos critérios da sua API)
export const validatePassword = (password: string) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Mínimo 8 caracteres');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Uma letra maiúscula');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Uma letra minúscula');
  }
  if (!/\d/.test(password)) {
    errors.push('Um número');
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Um caractere especial');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export default api;