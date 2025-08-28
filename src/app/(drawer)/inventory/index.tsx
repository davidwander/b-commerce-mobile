import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { styles } from './styles';

import { Header } from '@/components/Header';
import { CustomInput } from '@/components/CustomInput';
import { ActionButton } from '@/components/ActionButton';
import { CategorySelectorModal } from '@/components/Modal/CategorySelectorModal';
import { PieceCard } from '@/components/PieceCard'; // Importar o novo componente
import { PieceDetailsModal } from '@/components/Modal/PieceDetailsModal'; // Importar o modal de detalhes

import { CategoryList } from '@/components/CategoryList';
import { colors } from '@/styles/colors';
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, router } from 'expo-router'; // Importar useLocalSearchParams e router

import { partsTree, PartNode, PartLeaf } from '@/data/partsTree';
import { fonts } from '@/styles/fonts';
import { useInventory } from '@/hook/useInventory';

export default function Inventory() {
  const [navigationStack, setNavigationStack] = useState<Array<(PartNode | PartLeaf)[]>>([partsTree]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pieces, setPieces] = useState<PartLeaf[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenderId, setSelectedGenderId] = useState<string | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<PartLeaf | null>(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false); 
  const [selectedPieceIds, setSelectedPieceIds] = useState<string[]>([]); 
  const params = useLocalSearchParams();
  const saleId = typeof params.saleId === 'string' ? params.saleId : null; // Obter saleId da rota

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { getFilteredPieces, getAllPieces } = useInventory();

  const currentLevel = navigationStack[navigationStack.length - 1];

  const isLeafLevel = currentLevel.length > 0 && currentLevel.every(item => 
    !('children' in item) || !item.children || item.children.length === 0
  );
  
  const hasCategories = currentLevel.some(item => 
    'children' in item && item.children && item.children.length > 0
  );

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
      setPieces([]); 
      setSelectedGenderId(null); 
    } else {
      
      console.log('🍃 Item folha clicado (gênero): ', item.name, '- buscando peças com filtro...');
      const currentPathExcludingGender = getCurrentCategoryPath(); 
      
      fetchFilteredPieces([...currentPathExcludingGender, item as PartNode], searchText);
      setSelectedGenderId(item.id); 
    }
  }

  function handleBack() {
    if (navigationStack.length > 1) {
      setNavigationStack(navigationStack.slice(0, -1));
      
      if (navigationStack.length > 2) {
        setPieces([]);
      }
      setSelectedGenderId(null); 
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
    
    const currentCategoryPath = getCurrentCategoryPath();
    await fetchFilteredPieces(currentCategoryPath, searchText);
  }

  function handlePiecePress(piece: PartLeaf) {
    setSelectedPiece(piece);
    setDetailsModalVisible(true);
  }

  function handleDetailsModalClose() {
    setDetailsModalVisible(false);
    setSelectedPiece(null);
  }

  function handleToggleSelect(pieceId: string) {
    setSelectedPieceIds(prevSelectedIds => 
      prevSelectedIds.includes(pieceId)
        ? prevSelectedIds.filter(id => id !== pieceId)
        : [...prevSelectedIds, pieceId]
    );
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

      console.log('🔍 Debug fetchFilteredPieces - categoryPath recebido:', categoryPath.map(c => c.id));
      console.log('🔍 Debug fetchFilteredPieces - queryParams a serem enviados:', queryParams);

      let result = await getFilteredPieces(categoryPath.map(p => p.id), search, queryParams);
      
      if (!result.success && result.error?.includes('Not Found')) {
        console.log('⚠️ Rota de filtro não encontrada, tentando buscar todas as peças...');
        result = await getAllPieces();
        
        if (result.success && result.data) {
          const allPieces = result.data;
          console.log('📦 Total de peças no banco:', allPieces.length);
          
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

  useEffect(() => {
    let currentCategoryPath = getCurrentCategoryPath();
    
    if (selectedGenderId !== null) {
      const selectedGenderNode = currentLevel.find(item => item.id === selectedGenderId);
      if (selectedGenderNode && !currentCategoryPath.some(item => item.id === selectedGenderId)) {
        currentCategoryPath = [...currentCategoryPath, selectedGenderNode as PartNode];
      }
    }

    console.log('🔍 Debug - Nível atual (useEffect):', {
      currentLevel: currentLevel.map(item => ({ id: item.id, name: item.name, hasChildren: 'children' in item })),
      isLeafLevel,
      hasCategories,
      searchText: searchText.trim(),
      categoryPath: currentCategoryPath.map(c => c.name),
      selectedGenderId
    });
    
    if (searchText.trim() !== '' || selectedGenderId !== null) {
      fetchFilteredPieces(currentCategoryPath, searchText);
    } else {
      setPieces([]);
    }
  }, [navigationStack, searchText, selectedGenderId, currentLevel]); 

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

      {currentLevel && currentLevel.length > 0 && !searchText && selectedGenderId === null && (
        <CategoryList 
          data={currentLevel} 
          onItemPress={handleItemPress} 
        />
      )}

      {(searchText.trim() !== '' || selectedGenderId !== null) && (
        <View style={styles.emptyListContainer}>
          {isLoading ? (
            <View style={styles.emptyListContent}>
              <Text style={styles.emptyListText1}>
                Carregando...
              </Text>
            </View>
          ) : pieces.length > 0 ? (
            pieces.map(piece => (
              <PieceCard
                key={piece.id}
                piece={piece}
                category={getCurrentCategoryPath().map(c => c.name).join(' > ')}
                subcategory={selectedGenderId ? (currentLevel.find(item => item.id === selectedGenderId) as PartNode)?.name : undefined}
                onPress={handlePiecePress}
                isSelected={selectedPieceIds.includes(piece.id)} // Passar a prop isSelected
                onToggleSelect={handleToggleSelect} // Passar a prop onToggleSelect
                price={piece.price} // Passar o preço para o PieceCard
              />
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

      {saleId ? (
        <ActionButton
          label="Finalizar Venda"
          onPress={() => {
            // Lógica para finalizar a venda
            Alert.alert("Venda Finalizada", `Venda ${saleId} finalizada com sucesso!`);
            router.replace("/(drawer)/sales"); // Redireciona de volta para a tela de vendas
          }}
          color={colors.page.tulips}
          style={{ marginHorizontal: 16, marginBottom: 46 }}
        />
      ) : (
        <ActionButton 
          label="Adicionar peça"
          onPress={handleAddPiece}
          color={colors.page.dragonFruit}
          style={{ marginHorizontal: 16, marginBottom: 46 }}
        />
      )}

      <CategorySelectorModal 
        visible={modalVisible}
        partsTree={partsTree}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />

      {selectedPiece && (
        <PieceDetailsModal
          visible={detailsModalVisible}
          piece={selectedPiece}
          onClose={handleDetailsModalClose}
          saleId={saleId} // Passar saleId para o modal de detalhes
        />
      )}
    </View>
  );
}