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
  baseURL: 'http://192.168.3.7:3333/api/sales', // Ajuste para a rota de vendas
  timeout: 5000,
});

async function getAuthHeaders() {
  const token = await AsyncStorage.getItem('accessToken');
  if (!token) {
    console.error('❌ Token de acesso não encontrado.');
    throw new Error('Token não encontrado');
  }
  return { Authorization: `Bearer ${token}` };
}

export const saleService = {
  createSale: async (data: CreateSaleRequest): Promise<{ success: boolean; message: string; data?: CreateSaleResponse['data'] }> => {
    try {
      const headers = await getAuthHeaders();
      const response = await api.post<CreateSaleResponse>('/', data, { headers });
      return { success: true, message: response.data.message, data: response.data.data };
    } catch (error: any) {
      console.error('Erro ao criar venda:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.error || 'Erro desconhecido ao criar venda.',
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
