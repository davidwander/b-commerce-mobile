import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from "react-native";

import { Header } from '@/components/Header';
import { CustomInput } from '@/components/CustomInput';
import { ActionButton } from '@/components/ActionButton';
import { CategorySelectorModal } from '@/components/CategorySelectorModal';

import { CategoryList } from '@/components/CategoryList';
import { colors } from '@/styles/colors';

// Importa tipos e dados do arquivo externo
import { partsTree, PartNode, PartLeaf } from "@/data/partsTree";

export default function Inventory() {
  const [navigationStack, setNavigationStack] = React.useState<Array<(PartNode | PartLeaf)[]>>([partsTree]);
  const [modalVisible, setModalVisible] = useState(false)

  const currentLevel = navigationStack[navigationStack.length - 1];

  function handleItemPress(item: PartNode) {
    setNavigationStack([...navigationStack, item.children ?? []]);
  };

  function handleBack() {
    if (navigationStack.length > 1) {
      setNavigationStack(navigationStack.slice(0, -1));
    };
  };

  function handleAddPiece() {
    setModalVisible(true);
    console.log("Abrir modal");
  };

  function handleModalClose() {
    setModalVisible(false);
  };

  function handleModalConfirm(selectedPath: PartNode[]) {
    setModalVisible(false);
    console.log("Selecionou:", selectedPath);
  };

  return (
    <View style={{ flex: 1, paddingTop: 30, backgroundColor: colors.page.clearSky }}>
      <Header />
      <View style={{ padding: 16 }}>
        <CustomInput label="Buscar por peça" placeholder="Digite aqui..." />
      </View>

      {navigationStack.length > 1 && (
        <TouchableOpacity
          onPress={handleBack}
          style={{
            marginHorizontal: 16,
            marginBottom: 10,
            padding: 10,
            backgroundColor: colors.page.tulips,
            borderRadius: 8,
            alignSelf: "flex-start",
          }}
        >
          <Text style={{ color: colors.white, fontWeight: "bold" }}>Voltar</Text>
        </TouchableOpacity>
      )}

      <CategoryList data={currentLevel} onItemPress={handleItemPress} />

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
