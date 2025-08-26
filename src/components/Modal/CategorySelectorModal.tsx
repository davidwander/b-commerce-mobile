import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import { ActionButton } from '../ActionButton';
import { PartNode, PartLeaf } from '@/data/partsTree';
import { useInventory } from '@/hook/useInventory';

import { colors } from '@/styles/colors';
import { styles } from './styles';

type CategorySelectorModalProps = {
  visible: boolean;
  partsTree: PartNode[];
  onClose: () => void;
  onConfirm?: (selectedPath: PartNode[]) => void;
};

export function CategorySelectorModal({
  visible,
  partsTree,
  onClose,
  onConfirm,
}: CategorySelectorModalProps) {
  const [navigationStack, setNavigationStack] = useState<Array<(PartNode | PartLeaf)[]>>([partsTree]);
  const [selectedPath, setSelectedPath] = useState<PartNode[]>([]);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('1');

  const { createPiece } = useInventory();

  const currentLevel = navigationStack[navigationStack.length - 1];

  function handleItemPress(item: PartNode) {
    setNavigationStack([...navigationStack, item.children ?? []]);
    setSelectedPath([...selectedPath, item]);
  }

  function handleBack() {
    if (navigationStack.length > 1) {
      setNavigationStack(navigationStack.slice(0, -1));
      setSelectedPath(selectedPath.slice(0, -1));
    }
  }

  async function handleConfirm() {
    if (!description.trim()) return Alert.alert('Erro', 'Informe a descrição da peça');
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) return Alert.alert('Erro', 'Informe uma quantidade válida');

    const categoryPath = selectedPath.map((node) => node.id);

    const result = await createPiece({
      categoryPath,
      description,
      quantity: qty,
    });

    if (result.success) {
      Alert.alert('Sucesso', 'Peça adicionada com sucesso!');
      onConfirm && onConfirm(selectedPath);

      setDescription('');
      setQuantity('1');
      setNavigationStack([partsTree]);
      setSelectedPath([]);
      onClose();
    } else {
      Alert.alert('Erro', result.error || 'Falha ao adicionar peça');
    }
  }

  function handleCancel() {
    setDescription('');
    setQuantity('1');
    setNavigationStack([partsTree]);
    setSelectedPath([]);
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View
          style={styles.modalContent}
        >
          {navigationStack.length > 1 && (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backButtonText}> 
                Voltar
              </Text>
            </TouchableOpacity>
          )}

          {currentLevel && currentLevel.length > 0 ? (
            <FlatList
              data={currentLevel}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleItemPress(item as PartNode)}
                  style={styles.item}
                >
                  <Text style={styles.itemText}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.itemText}>
              Adicione uma descrição 
            </Text>
          )}

          {navigationStack.length > 1 && currentLevel.length === 0 && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Descrição
              </Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Digite a descrição"
                style={styles.input}
              />
              <Text style={styles.inputLabel}>
                Quantidade
              </Text>
              <TextInput
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                placeholder="1"
                style={styles.input}
              />
              <ActionButton
                label="Adicionar Peça"
                onPress={handleConfirm}
                color={colors.page.dragonFruit}
              />
            </View>
          )}

          <TouchableOpacity 
            onPress={handleCancel} 
            style={styles.cancelButton}
          >
            <Text style={styles.cancelText}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
