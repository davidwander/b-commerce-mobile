import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CreateSaleRequest {
  clientName: string;
  phone?: string;
  address?: string;
}

interface CreateSaleResponse {
  message: string;
  data: {
    id: string;
    clientName: string;
    phone: string | null;
    address: string | null;
    userId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface AddPieceToSaleRequest {
  pieceId: string;
  quantity: number;
}

interface AddPieceToSaleResponse {
  message: string;
  data: {
    id: string;
    saleId: string;
    pieceId: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
  };
}

const api = axios.create({
  baseURL: 'http://192.168.3.7:3333/api/sales',
  timeout: 5000,
});

async function getAuthHeaders() {
  try {
    // Usar a chave correta que está no seu sistema: @AuthToken
    const token = await AsyncStorage.getItem('@AuthToken');
    console.log('🔑 Token (@AuthToken):', token ? 'ENCONTRADO' : 'NÃO ENCONTRADO');
    
    if (!token) {
      // Listar todas as chaves para debug se não encontrar
      const keys = await AsyncStorage.getAllKeys();
      console.log('🔍 Chaves disponíveis no AsyncStorage:', keys);
      
      // Tentar outras possíveis chaves do token como fallback
      const alternativeKeys = ['@authToken', 'accessToken', 'token', 'authToken', 'access_token', 'userToken'];
      for (const key of alternativeKeys) {
        const altToken = await AsyncStorage.getItem(key);
        if (altToken) {
          console.log(`✅ Token encontrado com chave alternativa: ${key}`);
          return { Authorization: `Bearer ${altToken}` };
        }
      }
      
      console.error('❌ Token de acesso não encontrado.');
      throw new Error('Token não encontrado');
    }

    // Verificar se o token não está expirado
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp < Math.floor(Date.now() / 1000);
      
      if (isExpired) {
        console.error('❌ Token expirado');
        throw new Error('Token expirado');
      }
      
      console.log('✅ Token válido, expira em:', new Date(payload.exp * 1000).toISOString());
    } catch (tokenError) {
      console.error('⚠️ Erro ao verificar validade do token, mas continuando...', tokenError);
    }
    
    return { Authorization: `Bearer ${token}` };
  } catch (error) {
    console.error('❌ Erro ao obter headers de autenticação:', error);
    throw error;
  }
}

// Função para verificar se o usuário está logado (removida pois não é necessária)

export const saleService = {
  createSale: async (data: CreateSaleRequest): Promise<{ success: boolean; message: string; data?: CreateSaleResponse['data'] }> => {
    try {
      console.log('📤 Tentando criar venda:', data);
      
      const headers = await getAuthHeaders();
      console.log('📋 Headers preparados:', { ...headers, Authorization: headers.Authorization ? 'Bearer [TOKEN_PRESENTE]' : 'TOKEN_AUSENTE' });
      
      const response = await api.post<CreateSaleResponse>('/', data, { headers });
      console.log('✅ Venda criada com sucesso:', response.data);
      
      return { success: true, message: response.data.message, data: response.data.data };
    } catch (error: any) {
      console.error('❌ Erro completo ao criar venda:', error);
      
      if (error.response) {
        console.error('📄 Resposta do servidor:', error.response.data);
        console.error('📊 Status:', error.response.status);
      } else if (error.request) {
        console.error('📡 Sem resposta do servidor:', error.request);
      } else {
        console.error('⚙️ Erro de configuração:', error.message);
      }
      
      return {
        success: false,
        message: error.response?.data?.error || error.message || 'Erro desconhecido ao criar venda.',
      };
    }
  },

  addPieceToSale: async (saleId: string, data: AddPieceToSaleRequest): Promise<{ success: boolean; message: string; data?: AddPieceToSaleResponse['data'] }> => {
    try {
      const headers = await getAuthHeaders();
      const response = await api.post<AddPieceToSaleResponse>(`/${saleId}/pieces`, data, { headers });
      return { success: true, message: response.data.message, data: response.data.data };
    } catch (error: any) {
      console.error('Erro ao adicionar peça à venda:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.error || 'Erro desconhecido ao adicionar peça à venda.',
      };
    }
  },
};