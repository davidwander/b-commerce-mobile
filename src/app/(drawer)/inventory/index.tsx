import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from './styles';

import { Header } from '@/components/Header';
import { CustomInput } from '@/components/CustomInput';
import { ActionButton } from '@/components/ActionButton';
import { CategorySelectorModal } from '@/components/Modal/CategorySelectorModal';

import { CategoryList } from '@/components/CategoryList';
import { colors } from '@/styles/colors';
import Feather from '@expo/vector-icons/Feather';

import { partsTree, PartNode, PartLeaf } from '@/data/partsTree';
import { fonts } from '@/styles/fonts';
import { useInventory } from '@/hook/useInventory';

export default function Inventory() {
  const [navigationStack, setNavigationStack] = useState<Array<(PartNode | PartLeaf)[]>>([partsTree]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pieces, setPieces] = useState<PartLeaf[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Usar useRef para o timeout
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { getFilteredPieces, getAllPieces } = useInventory();

  const currentLevel = navigationStack[navigationStack.length - 1];

  // ✅ CORREÇÃO: Verificar se o nível atual contém apenas folhas (peças finais)
  // Uma folha é um item que NÃO tem children OU tem children vazio
  const isLeafLevel = currentLevel.length > 0 && currentLevel.every(item => 
    !('children' in item) || !item.children || item.children.length === 0
  );
  
  // Tem categorias se pelo menos um item tem children não vazios
  const hasCategories = currentLevel.some(item => 
    'children' in item && item.children && item.children.length > 0
  );

  // 🔍 DEBUG: Logs para entender o comportamento
  console.log('🔍 Debug navegação:', {
    currentLevel: currentLevel.map(item => ({ 
      id: item.id, 
      name: item.name, 
      hasChildren: 'children' in item,
      childrenLength: 'children' in item ? (item.children?.length || 0) : 0,
      isPartLeaf: !('children' in item)
    })),
    navigationStackLength: navigationStack.length,
    isLeafLevel,
    hasCategories,
    searchText: searchText.trim()
  });

  function handleItemPress(item: PartNode | PartLeaf) {
    if ('children' in item && item.children && item.children.length > 0) {
      console.log('📂 Navegando para:', item.name, 'com', item.children.length, 'itens');
      setNavigationStack([...navigationStack, item.children]);
      setPieces([]); // Limpar peças ao navegar para uma nova categoria
    } else {
      // Se é uma folha (gênero), disparar a busca de peças COM este item no caminho.
      console.log('🍃 Item folha clicado (gênero): ', item.name, '- buscando peças com filtro...');
      const currentPathExcludingGender = getCurrentCategoryPath(); // Pega o caminho até a subcategoria
      // Agora adicionamos o item (gênero) clicado a esse caminho para a busca
      fetchFilteredPieces([...currentPathExcludingGender, item as PartNode], searchText);
    }
  }

  function handleBack() {
    if (navigationStack.length > 1) {
      setNavigationStack(navigationStack.slice(0, -1));
      // ✅ Limpar peças ao voltar para níveis de categoria
      if (navigationStack.length > 2) {
        setPieces([]);
      }
    }
  }

  function handleAddPiece() {
    setModalVisible(true);
  }

  function handleModalClose() {
    setModalVisible(false);
  }

  async function handleModalConfirm(selectedPath: PartNode[]) {
    setModalVisible(false);
    console.log("Selecionou:", selectedPath);
    
    // ✅ Recarregar as peças após adicionar uma nova
    const currentCategoryPath = getCurrentCategoryPath();
    await fetchFilteredPieces(currentCategoryPath, searchText);
  }

  function getCurrentCategoryPath(): PartNode[] {
    const path: PartNode[] = [];
  
    for (let i = 1; i < navigationStack.length; i++) {
      const level = navigationStack[i - 1];
      const nodesOnly = level.filter((item): item is PartNode => 'children' in item);
      const selected = nodesOnly.find(node => node.children === navigationStack[i]);
      if (selected) path.push(selected);
    }
  
    return path;
  }

  function handleSearchChange(text: string) {
    setSearchText(text);

    // ✅ Limpar timeout anterior
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      const currentCategoryPath = getCurrentCategoryPath();
      fetchFilteredPieces(currentCategoryPath, text);
    }, 500);
  }

  async function fetchFilteredPieces(categoryPath: PartNode[], search: string) {
    console.log('🔎 Filtrando peças para:', categoryPath.map(c => c.name), 'com busca:', search);
    
    setIsLoading(true);
    
    try {
      const queryParams = {
        categoryId: categoryPath.length > 0 ? categoryPath[0].id : undefined,
        subcategoryId: categoryPath.length > 1 ? categoryPath[1].id : undefined,
        genderId: categoryPath.length > 2 ? categoryPath[2].id : undefined,
        search: search || undefined
      };

      console.log('🔧 Query params preparados:', queryParams);

      // ✅ Tentar primeiro a busca filtrada
      let result = await getFilteredPieces(categoryPath.map(p => p.id), search, queryParams);
      
      // ✅ Se der erro 404, tentar buscar todas as peças para teste
      if (!result.success && result.error?.includes('Not Found')) {
        console.log('⚠️ Rota de filtro não encontrada, tentando buscar todas as peças...');
        result = await getAllPieces();
        
        // Se conseguiu todas as peças, filtrar manualmente no frontend temporariamente
        if (result.success && result.data) {
          const allPieces = result.data;
          console.log('📦 Total de peças no banco:', allPieces.length);
          
          // Filtro simples para teste - você pode ajustar conforme sua necessidade
          let filteredPieces = allPieces;
          
          if (search) {
            filteredPieces = allPieces.filter((piece: any) => 
              piece.name?.toLowerCase().includes(search.toLowerCase()) ||
              piece.description?.toLowerCase().includes(search.toLowerCase())
            );
          }
          
          result.data = filteredPieces;
          console.log('🔍 Peças após filtro manual:', filteredPieces.length);
        }
      }
      
      if (result.success && result.data) {
        console.log('✅ Peças encontradas:', result.data.length, 'peças');
        console.log('📄 Primeira peça (exemplo):', result.data[0]);
        setPieces(result.data);
      } else {
        console.log('❌ Erro ao buscar peças:', result);
        setPieces([]);
      }
    } catch (error) {
      console.error('❌ Erro ao buscar peças:', error);
      setPieces([]);
    } finally {
      setIsLoading(false);
    }
  }

  // ✅ Carregar peças quando chegar no nível final ou quando buscar
  useEffect(() => {
    const currentCategoryPath = getCurrentCategoryPath();
    
    console.log('🔍 Debug - Nível atual:', {
      currentLevel: currentLevel.map(item => ({ id: item.id, name: item.name, hasChildren: 'children' in item })),
      isLeafLevel,
      hasCategories,
      searchText: searchText.trim(),
      categoryPath: currentCategoryPath.map(c => c.name)
    });
    
    // Só buscar peças se tiver texto de busca. A busca por seleção de gênero será tratada em handleItemPress.
    if (searchText.trim() !== '') {
      fetchFilteredPieces(currentCategoryPath, searchText);
    } else {
      // Limpar peças se estiver navegando por categorias e não houver busca
      // e não estivermos no nível que exibe as peças por clique no gênero
      if (pieces.length > 0) {
        setPieces([]);
      }
    }
  }, [navigationStack, searchText]); // Adicionei searchText como dependência

  // ✅ Cleanup do timeout ao desmontar o componente
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={{ padding: 16 }}>
        <CustomInput 
          label="Buscar por peça"
          placeholder="Digite aqui..." 
          value={searchText}
          onChangeText={handleSearchChange}
        />
      </View>

      {navigationStack.length > 1 && (
        <TouchableOpacity
          onPress={handleBack}
          style={styles.buttonBack}
        >
          <Text style={styles.buttonBackText}>
            Voltar
          </Text>
        </TouchableOpacity>
      )}

      {/* ✅ Mostrar categorias e folhas (gêneros) */}
      {currentLevel && currentLevel.length > 0 && !searchText && pieces.length === 0 && (
        <CategoryList 
          data={currentLevel} 
          onItemPress={handleItemPress} 
        />
      )}

      {/* ✅ Mostrar peças quando houver busca OU peças já carregadas */}
      {(searchText.trim() !== '' || pieces.length > 0) && (
        <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 16 }}>
          {isLoading ? (
            <View style={styles.emptyListContent}>
              <Text style={styles.emptyListText1}>Carregando...</Text>
            </View>
          ) : pieces.length > 0 ? (
            pieces.map(piece => (
              <View key={piece.id} style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                paddingVertical: 12, 
                paddingHorizontal: 16,
                marginVertical: 4,
                backgroundColor: '#f8f9fa',
                borderRadius: 8,
                borderLeftWidth: 4,
                borderLeftColor: colors.page.dragonFruit
              }}>
                <Text style={{ fontFamily: fonts.regular, fontSize: 16, flex: 1 }}>
                  {piece.name}
                </Text>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontFamily: fonts.bold, fontSize: 16, color: colors.page.dragonFruit }}>
                    {piece.quantity}
                  </Text>
                  <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: '#666' }}>
                    unidades
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyListContent}>
              <Feather 
                name="package" 
                size={48} 
                color="#9aa0a6" 
                style={{ marginBottom: 8 }} 
              />
              <Text style={styles.emptyListText1}>
                {searchText ? 'Nenhuma peça encontrada.' : 'Nenhuma peça cadastrada.'}
              </Text>
              <Text style={styles.emptyListText2}>
                {searchText 
                  ? 'Tente ajustar os filtros ou o termo de busca.' 
                  : 'Toque em "Adicionar peça" para começar.'
                }
              </Text>
            </View>
          )}
        </View>
      )}

      {/* ✅ Mostrar tela vazia apenas quando não há categorias nem peças */}
      {!hasCategories && !isLeafLevel && pieces.length === 0 && !searchText && (
        <View style={styles.emptyListContent}>
          <Feather 
            name="inbox" 
            size={48} 
            color="#9aa0a6" 
            style={{ marginBottom: 8 }} 
          />
          <Text style={styles.emptyListText1}>
            Nada por aqui ainda.
          </Text>
          <Text style={styles.emptyListText2}>
            Toque em <Text style={{ fontFamily: fonts.bold }}>"Adicionar peça"</Text> para começar.
          </Text>
        </View>
      )}

      <ActionButton 
        label="Adicionar peça"
        onPress={handleAddPiece}
        color={colors.page.dragonFruit}
        style={{ marginHorizontal: 16, marginBottom: 46 }}
      />

      <CategorySelectorModal 
        visible={modalVisible}
        partsTree={partsTree}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </View>
  );
}