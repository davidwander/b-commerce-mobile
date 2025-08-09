import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import categoryIcons from '@/utils/categoryIcons';

import { colors } from "@/styles/colors";
import { Header } from "@/components/Header";
import { CustomInput } from "@/components/CustomInput";

type PartLeaf = {
  id: string;
  name: string;
  quantity: number;
};

type PartNode = {
  id: string;
  name: string;
  children: Array<PartNode | PartLeaf>;
};

const partsTree: PartNode[] = [
  {
    id: "1",
    name: "Camisa",
    children: [
      {
        id: "1-1",
        name: "Camiseta",
        children: [
          { id: "1-1-1", name: "Masculina", quantity: 8 },
          { id: "1-1-2", name: "Feminina", quantity: 5 },
        ],
      },
      {
        id: "1-2",
        name: "Social",
        children: [
          { id: "1-2-1", name: "Masculina", quantity: 4 },
          { id: "1-2-2", name: "Feminina", quantity: 6 },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Calça",
    children: [
      {
        id: "2-1",
        name: "Jeans",
        children: [
          { id: "2-1-1", name: "Masculina", quantity: 6 },
          { id: "2-1-2", name: "Feminina", quantity: 3 },
        ],
      },
      {
        id: "2-2",
        name: "Calça social",
        children: [
          { id: "2-2-1", name: "Masculina", quantity: 7 },
          { id: "2-2-2", name: "Feminina", quantity: 5 },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Saia",
    children: [{ id: "3-1", name: "Saia", quantity: 5 }],
  },
  {
    id: "4",
    name: "Vestido",
    children: [{ id: "4-1", name: "Vestido", quantity: 7 }],
  },
  {
    id: "5",
    name: "Shorts",
    children: [{ id: "5-1", name: "Shorts", quantity: 9 }],
  },
  {
    id: "6",
    name: "Sapatos",
    children: [{ id: "6-1", name: "Sapatos", quantity: 12 }],
  },
  {
    id: "7",
    name: "Acessórios",
    children: [{ id: "7-1", name: "Acessórios", quantity: 15 }],
  },
];

function isLeaf(item: PartNode | PartLeaf): item is PartLeaf {
  return (item as PartLeaf).quantity !== undefined;
}

export default function Inventory() {
  const [navigationStack, setNavigationStack] = React.useState<Array<(PartNode | PartLeaf)[]>>([partsTree]);

  const currentLevel = navigationStack[navigationStack.length - 1];

  function handleItemPress(item: PartNode) {
    setNavigationStack([...navigationStack, item.children]);
  }

  function handleBack() {
    if (navigationStack.length > 1) {
      setNavigationStack(navigationStack.slice(0, -1));
    }
  }

  return (
    <View style={{ flex: 1, paddingTop: 30, backgroundColor: colors.page.clearSky }}>
      <Header />

      <View style={{ padding: 16 }}>
        <CustomInput label="Buscar por peça..." placeholder="Digite aqui" />
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
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Voltar</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={currentLevel}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        numColumns={2}  // <-- aqui
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => !isLeaf(item) && handleItemPress(item)}
            disabled={isLeaf(item)}
            style={{
              backgroundColor: colors.white,
              padding: 16,
              borderRadius: 12,
              marginBottom: 14,
              marginHorizontal: 8,  // margem horizontal para espaçar as colunas
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 3 },
              elevation: 4,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: isLeaf(item) ? 1 : 0.9,
              flex: 1, // importante para o item ocupar espaço correto na coluna
              maxWidth: '48%', // para garantir que caiba duas colunas lado a lado
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <Text style={{ fontSize: 26, marginRight: 16 }}>
                {categoryIcons[item.name] || "🧥"}
              </Text>

              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: colors.black,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </View>

            {isLeaf(item) && (
              <View
                style={{
                  backgroundColor: colors.page.dragonFruit,
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                  {item.quantity}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
