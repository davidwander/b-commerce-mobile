import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Header } from "@/components/Header";
import { CustomInput } from "@/components/CustomInput";
import { CategoryList } from "@/components/CategoryList";
import { colors } from "@/styles/colors";

// Importa tipos e dados do arquivo externo
import { partsTree, PartNode, PartLeaf } from "@/data/partsTree";

export default function Inventory() {
  const [navigationStack, setNavigationStack] = React.useState<Array<(PartNode | PartLeaf)[]>>([partsTree]);

  const currentLevel = navigationStack[navigationStack.length - 1];

  function handleItemPress(item: PartNode) {
    setNavigationStack([...navigationStack, item.children ?? []]);
  }

  function handleBack() {
    if (navigationStack.length > 1) {
      setNavigationStack(navigationStack.slice(0, -1));
    }
  }

  function handleAddPiece() {
    // Aqui futuramente vamos abrir um modal ou navegação para adicionar a peça
    console.log("Adicionar nova peça");
  }

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

      {/* Botão flutuante para adicionar peça */}
      <TouchableOpacity
        onPress={handleAddPiece}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: colors.page.tulips,
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <Text style={{ color: colors.white, fontSize: 30, lineHeight: 34 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
