import { useAuth } from '@/contexts/AuthContext';
import { useCallback } from 'react';

export interface CreatePieceRequest {
  categoryPath: string[];
  description: string;
  quantity?: number;
  price?: number; // Adicionar campo de preço
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

  const ensureAuthenticated = () => {
    if (!isAuthenticated) throw new Error('Usuário não autenticado');
  };

  const createPiece = async (data: CreatePieceRequest) => {
    try {
      ensureAuthenticated();
      const response = await authenticatedFetch(`${BASE_URL}/pieces`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(await response.text());
      const result = await response.json();
      return { success: true, data: result.data };
    } catch (error: any) {
      return { success: false, error: error.message || 'Erro desconhecido' };
    }
  };

  const getFilteredPieces = async (categoryPath: string[], search: string, query: FilterPiecesQuery) => {
    try {
      ensureAuthenticated();
      const params = new URLSearchParams();
      if (query.categoryId) params.append('categoryId', query.categoryId);
      if (query.subcategoryId) params.append('subcategoryId', query.subcategoryId);
      if (query.genderId) params.append('genderId', query.genderId);
      if (search) params.append('search', search);

      const url = `${BASE_URL}/pieces/filter${params.toString() ? `?${params}` : ''}`;
      const response = await authenticatedFetch(url);
      if (!response.ok) throw new Error(await response.text());
      const result = await response.json();


      return { success: true, data: result.data };
    } catch (error: any) {
      return { success: false, error: error.message || 'Erro desconhecido', data: [] };
    }
  };

  const getAllPieces = async () => {
    try {
      ensureAuthenticated();
      const response = await authenticatedFetch(`${BASE_URL}/pieces`);
      if (!response.ok) throw new Error(await response.text());
      const result = await response.json();


      return { success: true, data: result.data };
    } catch (error: any) {
      return { success: false, error: error.message || 'Erro desconhecido', data: [] };
    }
  };

  return {
    createPiece: useCallback((data: CreatePieceRequest) => createPiece(data), [authenticatedFetch, isAuthenticated]),
    getFilteredPieces: useCallback((categoryPath: string[], search: string, query: FilterPiecesQuery) => getFilteredPieces(categoryPath, search, query), [authenticatedFetch, isAuthenticated]),
    getAllPieces: useCallback(() => getAllPieces(), [authenticatedFetch, isAuthenticated]),
  };
};
