import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

import { styles } from './styles';

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
  };

  function handleBack() {
    if (navigationStack.length > 1) {
      setNavigationStack(navigationStack.slice(0, -1));
      setSelectedPath(selectedPath.slice(0, -1));
    } else {
      handleClose();
    }
  };

  function handleClose() {
    setNavigationStack([partsTree]);
    setSelectedPath([]);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            {navigationStack.length > 1 && (
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <FontAwesome 
                  name="chevron-left"
                  style={styles.icon} 
                />
              </TouchableOpacity>
            )}
            <Text style={styles.title}>Selecione a categoria</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <FontAwesome 
                name="close"
                style={styles.icon} 
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={currentLevel}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
                <Text style={styles.itemText}>{item.name}</Text>
                {item.children && item.children.length > 0 && 
                  <FontAwesome 
                    name="share" 
                    style={styles.icon} 
                  />
                }
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
