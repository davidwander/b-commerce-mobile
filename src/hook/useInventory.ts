// hooks/useInventory.ts - Crie este arquivo
import { useAuth } from '@/contexts/AuthContext';

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

const BASE_URL = 'http://192.168.3.7:3333/api/inventory';

export const useInventory = () => {
  const { authenticatedFetch, isAuthenticated } = useAuth();

  // Verificar se está autenticado antes de fazer requisições
  const ensureAuthenticated = () => {
    if (!isAuthenticated) {
      console.log('❌ useInventory - Usuário não autenticado');
      throw new Error('Usuário não está autenticado');
    }
    console.log('✅ useInventory - Usuário autenticado, prosseguindo...');
  };

  const createPiece = async (data: CreatePieceRequest) => {
    try {
      ensureAuthenticated();
      console.log('📦 useInventory - Criando nova peça:', data);
      
      const response = await authenticatedFetch(`${BASE_URL}/pieces`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP ${response.status}`;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('✅ useInventory - Peça criada com sucesso:', result);
      
      return {
        success: true,
        data: result,
      };
    } catch (error: any) {
      console.error('❌ useInventory - Erro ao criar peça:', error.message);
      return {
        success: false,
        error: error.message || 'Erro desconhecido',
      };
    }
  };

  const getFilteredPieces = async (categoryPath: string[], search: string, query: FilterPiecesQuery) => {
    try {
      ensureAuthenticated();
      console.log('🔍 useInventory - Buscando peças filtradas:', { categoryPath, search, query });
      
      // Construir query string
      const params = new URLSearchParams();
      if (query.categoryId) params.append('categoryId', query.categoryId);
      if (query.subcategoryId) params.append('subcategoryId', query.subcategoryId);
      if (query.genderId) params.append('genderId', query.genderId);
      if (search) params.append('search', search);
      
      const queryString = params.toString();
      const url = `${BASE_URL}/pieces/filter${queryString ? `?${queryString}` : ''}`;
      
      const response = await authenticatedFetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP ${response.status}`;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('✅ useInventory - Peças encontradas:', result);
      
      return {
        success: true,
        data: result.data || result,
      };
    } catch (error: any) {
      console.error('❌ useInventory - Erro ao buscar peças:', error.message);
      return {
        success: false,
        error: error.message || 'Erro desconhecido',
        data: [],
      };
    }
  };

  const getCategoryTree = async () => {
    try {
      ensureAuthenticated();
      console.log('🌳 useInventory - Buscando árvore de categorias...');
      
      const response = await authenticatedFetch(`${BASE_URL}/categories/tree`);

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP ${response.status}`;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('✅ useInventory - Árvore de categorias carregada:', result);
      
      return {
        success: true,
        data: result.data || result,
      };
    } catch (error: any) {
      console.error('❌ useInventory - Erro ao buscar categorias:', error.message);
      return {
        success: false,
        error: error.message || 'Erro desconhecido',
        data: [],
      };
    }
  };

  const getAllPieces = async () => {
    try {
      ensureAuthenticated();
      console.log('📦 useInventory - Buscando todas as peças...');
      
      const response = await authenticatedFetch(`${BASE_URL}/pieces`);

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP ${response.status}`;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('✅ useInventory - Todas as peças carregadas:', result);
      
      return {
        success: true,
        data: result.data || result,
      };
    } catch (error: any) {
      console.error('❌ useInventory - Erro ao buscar todas as peças:', error.message);
      return {
        success: false,
        error: error.message || 'Erro desconhecido',
        data: [],
      };
    }
  };

  return {
    createPiece,
    getFilteredPieces,
    getCategoryTree,
    getAllPieces,
  };
};