import React, { useState, useEffect } from 'react';
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

export default function Inventory() {
  const [navigationStack, setNavigationStack] = useState<Array<(PartNode | PartLeaf)[]>>([partsTree]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const currentLevel = navigationStack[navigationStack.length - 1];

  // ⬅️ Correção: tipagem do timeout
  let searchTimeout: ReturnType<typeof setTimeout>;

  function handleItemPress(item: PartNode) {
    setNavigationStack([...navigationStack, item.children ?? []]);
  }

  function handleBack() {
    if (navigationStack.length > 1) {
      setNavigationStack(navigationStack.slice(0, -1));
    }
  }

  function handleAddPiece() {
    setModalVisible(true);
  }

  function handleModalClose() {
    setModalVisible(false);
  }

  function handleModalConfirm(selectedPath: PartNode[]) {
    setModalVisible(false);
    console.log("Selecionou:", selectedPath);
  }

  // Função para obter caminho atual de categoria
  function getCurrentCategoryPath(): PartNode[] {
    const path: PartNode[] = [];
  
    for (let i = 1; i < navigationStack.length; i++) {
      const level = navigationStack[i - 1];
  
      // Filtra apenas PartNode
      const nodesOnly = level.filter((item): item is PartNode => 'children' in item);
  
      const selected = nodesOnly.find(node => node.children === navigationStack[i]);
      if (selected) path.push(selected);
    }
  
    return path;
  }
  

  // Debounce de busca
  function handleSearchChange(text: string) {
    setSearchText(text);

    if (searchTimeout) clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      const currentCategoryPath = getCurrentCategoryPath();
      fetchFilteredPieces(currentCategoryPath, text);
    }, 500);
  }

  function fetchFilteredPieces(categoryPath: PartNode[], search: string) {
    console.log('🔎 Filtrando peças para:', categoryPath.map(c => c.name), 'com busca:', search);
    // Aqui você chamaria a API do backend
  }

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

      {currentLevel && currentLevel.length > 0 ? (
        <CategoryList data={currentLevel} onItemPress={handleItemPress} />
      ) : (
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
            Toque em <Text style={{ fontFamily: fonts.bold }}>“Adicionar peça”</Text> para começar.
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
