import { useAuth } from '@/contexts/AuthContext';
import { useCallback } from 'react';

export interface CreatePieceRequest {
  categoryPath: string[];
  description: string;
  quantity?: number;
  // Removido price - será definido como 0.00 no backend
}

export interface FilterPiecesQuery {
  categoryId?: string;
  subcategoryId?: string;
  genderId?: string;
  search?: string;
}

// Interface para atualização de preço
export interface UpdatePiecePriceRequest {
  price: number;
}

const BASE_URL = 'http://192.168.3.7:3333/api/inventory';

export const useInventory = () => {
  const { authenticatedFetch, isAuthenticated } = useAuth();

  const ensureAuthenticated = () => {
    if (!isAuthenticated) {
      throw new Error('Usuário não autenticado');
    }
  };

  const createPiece = async (data: CreatePieceRequest) => {
    try {
      ensureAuthenticated();
      
      console.log('🚀 useInventory: Criando peça com dados:', data);
      
      // Validações locais antes de enviar
      if (!data.description || data.description.trim() === '') {
        throw new Error('Descrição da peça é obrigatória');
      }
      
      if (!data.categoryPath || data.categoryPath.length === 0) {
        throw new Error('Caminho da categoria é obrigatório');
      }
      
      if (data.quantity !== undefined && (data.quantity <= 0 || !Number.isInteger(data.quantity))) {
        throw new Error('Quantidade deve ser um número inteiro maior que zero');
      }

      const response = await authenticatedFetch(`${BASE_URL}/pieces`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryPath: data.categoryPath,
          description: data.description.trim(),
          quantity: data.quantity || 1,
          // Não enviar price - será definido como 0.00 no backend
        }),
      });

      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erro na resposta do servidor:', errorText);
        
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.error || 'Erro desconhecido do servidor');
        } catch (parseError) {
          throw new Error(errorText || `Erro HTTP ${response.status}`);
        }
      }

      const result = await response.json();
      console.log('✅ useInventory: Peça criada com sucesso:', result);
      
      return { success: true, data: result.data };
      
    } catch (error: any) {
      console.error('❌ useInventory: Erro ao criar peça:', error);
      return { 
        success: false, 
        error: error.message || 'Erro desconhecido ao criar peça' 
      };
    }
  };

  const getFilteredPieces = async (categoryPath: string[], search: string, query: FilterPiecesQuery) => {
    try {
      ensureAuthenticated();
      
      console.log('🔍 useInventory: Buscando peças filtradas:', { categoryPath, search, query });
      
      const params = new URLSearchParams();
      
      if (query.categoryId) params.append('categoryId', query.categoryId);
      if (query.subcategoryId) params.append('subcategoryId', query.subcategoryId);
      if (query.genderId) params.append('genderId', query.genderId);
      if (search && search.trim()) params.append('search', search.trim());

      const url = `${BASE_URL}/pieces/filter${params.toString() ? `?${params}` : ''}`;
      console.log('📡 URL da requisição:', url);
      
      const response = await authenticatedFetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erro ao filtrar peças:', errorText);
        throw new Error(errorText);
      }

      const result = await response.json();
      console.log('✅ useInventory: Peças filtradas obtidas:', result.data?.length, 'itens');
      
      return { success: true, data: result.data };
      
    } catch (error: any) {
      console.error('❌ useInventory: Erro ao filtrar peças:', error);
      return { 
        success: false, 
        error: error.message || 'Erro desconhecido ao filtrar peças', 
        data: [] 
      };
    }
  };

  const getAllPieces = async () => {
    try {
      ensureAuthenticated();
      
      console.log('📦 useInventory: Buscando todas as peças...');
      
      const response = await authenticatedFetch(`${BASE_URL}/pieces`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erro ao buscar todas as peças:', errorText);
        throw new Error(errorText);
      }

      const result = await response.json();
      console.log('✅ useInventory: Todas as peças obtidas:', result.data?.length, 'itens');
      
      return { success: true, data: result.data };
      
    } catch (error: any) {
      console.error('❌ useInventory: Erro ao buscar todas as peças:', error);
      return { 
        success: false, 
        error: error.message || 'Erro desconhecido ao buscar peças', 
        data: [] 
      };
    }
  };

  const updatePiecePrice = async (pieceId: string, data: UpdatePiecePriceRequest) => {
    try {
      ensureAuthenticated();
      
      console.log('💰 useInventory: Atualizando preço da peça:', { pieceId, price: data.price });
      
      // Validação local
      if (typeof data.price !== 'number' || data.price < 0) {
        throw new Error('Preço deve ser um número maior ou igual a zero');
      }
      
      const response = await authenticatedFetch(`${BASE_URL}/pieces/${pieceId}/price`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erro ao atualizar preço:', errorText);
        
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.error || 'Erro desconhecido do servidor');
        } catch (parseError) {
          throw new Error(errorText || `Erro HTTP ${response.status}`);
        }
      }
      
      const result = await response.json();
      console.log('✅ useInventory: Preço atualizado com sucesso:', result);
      
      return { success: true, data: result.data };
      
    } catch (error: any) {
      console.error('❌ useInventory: Erro ao atualizar preço:', error);
      return { 
        success: false, 
        error: error.message || 'Erro desconhecido ao atualizar preço' 
      };
    }
  };

  return {
    createPiece: useCallback(createPiece, [authenticatedFetch, isAuthenticated]),
    getFilteredPieces: useCallback(getFilteredPieces, [authenticatedFetch, isAuthenticated]),
    getAllPieces: useCallback(getAllPieces, [authenticatedFetch, isAuthenticated]),
    updatePiecePrice: useCallback(updatePiecePrice, [authenticatedFetch, isAuthenticated]),
  };
};