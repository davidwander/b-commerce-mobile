import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

import { fonts } from '@/styles/fonts';
import { colors } from "@/styles/colors";

type PartLeaf = {
  id: string;
  name: string;
  quantity?: number;
};

type PartNode = {
  id: string;
  name: string;
  children?: Array<PartNode | PartLeaf>;
};

type CategorySelectorModalProps = {
  visible: boolean;
  partsTree: PartNode[];
  onClose: () => void;
  onConfirm: (selectedPath: PartNode[]) => void;
};

export function CategorySelectorModal({ visible, partsTree, onClose, onConfirm }: CategorySelectorModalProps) {
  const [navigationStack, setNavigationStack] = useState<PartNode[][]>([partsTree]);
  const [selectedPath, setSelectedPath] = useState<PartNode[]>([]);

  const currentLevel = navigationStack[navigationStack.length - 1];

  function handleItemPress(item: PartNode) {
    setSelectedPath([...selectedPath, item]);
    if (item.children && item.children.length > 0) {
      setNavigationStack([...navigationStack, item.children]);
    } else {
      // Último nível, confirma seleção
      onConfirm([...selectedPath, item]);
      handleClose();
    }
  }

  function handleBack() {
    if (navigationStack.length > 1) {
      setNavigationStack(navigationStack.slice(0, -1));
      setSelectedPath(selectedPath.slice(0, -1));
    } else {
      handleClose();
    }
  }

  function handleClose() {
    setNavigationStack([partsTree]);
    setSelectedPath([]);
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            {navigationStack.length > 1 && (
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Text style={styles.backText}>Voltar</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.title}>Selecione a categoria</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <FontAwesome name="close" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={currentLevel}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
                <Text style={styles.itemText}>{item.name}</Text>
                {item.children && item.children.length > 0 && <Text style={styles.arrow}>›</Text>}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    maxHeight: "80%",
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  backButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  backText: {
    color: colors.page.tulips,
    fontWeight: "bold",
  },
  closeButton: {
    marginLeft: "auto",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  closeText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.page.tulips,
  },
  title: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: fonts.bold,
    textAlign: "center",
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.page.clearSky,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    fontSize: 18,
    fontFamily: fonts.italic,
  },
  icon: {
    fontSize: 20,
    color: colors.black,
  },
  arrow: {
    fontSize: 18,
    color: colors.page.clearSky,
  },
});
