import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CreatePieceRequest {
  categoryPath: string[];
  description: string;
  quantity?: number;
}

export interface FilterPiecesQuery {
  categoryId?: string;
  subcategoryId?: string;
  genderId?: string;
  search?: string;
}

// Instância do Axios apontando para o inventory
const api = axios.create({
  baseURL: 'http://192.168.3.7:3333/api/inventory',
  timeout: 5000,
});

// Função auxiliar para pegar o token e montar headers
async function getAuthHeaders() {
  const token = await AsyncStorage.getItem('accessToken');
  if (!token) throw new Error('Token não encontrado');
  return { Authorization: `Bearer ${token}` };
}

export const inventoryService = {
  // Criar nova peça
  createPiece: async (data: CreatePieceRequest) => {
    try {
      const headers = await getAuthHeaders();
      const response = await api.post('/pieces', data, { headers });
      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar peça:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error || 'Erro desconhecido',
      };
    }
  },

  // Buscar peças filtradas
  getFilteredPieces: async (categoryPath: string[], search: string, query: FilterPiecesQuery) => {
    const headers = await getAuthHeaders();
    const response = await api.get('/pieces/filter', { params: { ...query, search }, headers });
    return response.data.data;
  },

  // Buscar árvore de categorias
  getCategoryTree: async () => {
    const headers = await getAuthHeaders();
    const response = await api.get('/categories/tree', { headers });
    return response.data.data;
  },
};
