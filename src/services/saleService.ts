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

// NOVAS INTERFACES PARA LISTAGEM
export interface Sale {
  id: string;
  clientName: string;
  phone: string | null;
  address: string | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
  totalPieces: number;
  totalValue: number;
  status: 'open' | 'closed';
  salePieces?: SalePiece[];
}

export interface SalePiece {
  id: string;
  saleId: string;
  pieceId: string;
  quantity: number;
  piece: {
    id: string;
    description: string;
    price: number;
    categoryPath?: string;
  };
}

interface GetSalesResponse {
  message: string;
  data: Sale[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface GetSaleByIdResponse {
  message: string;
  data: Sale;
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

  // NOVA FUNÇÃO: Listar vendas
  getSales: async (params?: { 
    status?: 'open' | 'closed'; 
    page?: number; 
    limit?: number 
  }): Promise<{ success: boolean; message: string; data?: Sale[]; pagination?: any }> => {
    try {
      console.log('📋 Tentando listar vendas:', params);
      
      const headers = await getAuthHeaders();
      
      // Construir query parameters
      const queryParams = new URLSearchParams();
      if (params?.status) queryParams.append('status', params.status);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      
      const queryString = queryParams.toString();
      const url = queryString ? `/?${queryString}` : '/';
      
      console.log('🌐 URL da requisição:', `${api.defaults.baseURL}${url}`);
      
      const response = await api.get<GetSalesResponse>(url, { headers });
      console.log('✅ Vendas listadas com sucesso:', response.data);
      
      return { 
        success: true, 
        message: response.data.message, 
        data: response.data.data,
        pagination: response.data.pagination
      };
    } catch (error: any) {
      console.error('❌ Erro completo ao listar vendas:', error);
      
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
        message: error.response?.data?.error || error.message || 'Erro desconhecido ao listar vendas.',
      };
    }
  },

  // NOVA FUNÇÃO: Buscar venda por ID
  getSaleById: async (saleId: string): Promise<{ success: boolean; message: string; data?: Sale }> => {
    try {
      console.log('🔍 Tentando buscar venda por ID:', saleId);
      
      const headers = await getAuthHeaders();
      const response = await api.get<GetSaleByIdResponse>(`/${saleId}`, { headers });
      console.log('✅ Venda encontrada com sucesso:', response.data);
      
      return { 
        success: true, 
        message: response.data.message, 
        data: response.data.data 
      };
    } catch (error: any) {
      console.error('❌ Erro completo ao buscar venda:', error);
      
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
        message: error.response?.data?.error || error.message || 'Erro desconhecido ao buscar venda.',
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