import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { CategoryList } from '../CategoryList';
import { ActionButton } from '../ActionButton';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
import { PartNode, PartLeaf } from '@/data/partsTree';
import { inventoryService } from '@/services/inventoryService';

type CategorySelectorModalProps = {
  visible: boolean;
  partsTree: PartNode[];
  onClose: () => void;
  onConfirm?: (selectedPath: PartNode[]) => void;
};

export function CategorySelectorModal({ visible, partsTree, onClose, onConfirm }: CategorySelectorModalProps) {
  const [navigationStack, setNavigationStack] = useState<Array<(PartNode | PartLeaf)[]>>([partsTree]);
  const [selectedPath, setSelectedPath] = useState<PartNode[]>([]);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('1');

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

    const categoryPath = selectedPath.map(node => node.id);

    const result = await inventoryService.createPiece({
      categoryPath,
      description,
      quantity: qty
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

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' }}>
        <View style={{ backgroundColor: colors.white, marginHorizontal: 20, borderRadius: 12, padding: 16, maxHeight: '80%' }}>
          {navigationStack.length > 1 && (
            <TouchableOpacity onPress={handleBack} style={{ marginBottom: 12 }}>
              <Text style={{ fontFamily: fonts.bold, color: colors.page.dragonFruit }}>Voltar</Text>
            </TouchableOpacity>
          )}

          {currentLevel && currentLevel.length > 0 ? (
            <CategoryList data={currentLevel} onItemPress={handleItemPress} />
          ) : (
            <Text style={{ textAlign: 'center', marginVertical: 12 }}>Selecione a categoria anterior para adicionar a peça</Text>
          )}

          {navigationStack.length > 1 && currentLevel.length === 0 && (
            <View style={{ marginTop: 12 }}>
              <Text style={{ fontFamily: fonts.bold, marginBottom: 4 }}>Descrição</Text>
              <TextInput value={description} onChangeText={setDescription} placeholder="Digite a descrição" style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 12 }} />

              <Text style={{ fontFamily: fonts.bold, marginBottom: 4 }}>Quantidade</Text>
              <TextInput value={quantity} onChangeText={setQuantity} keyboardType="numeric" placeholder="1" style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 12 }} />

              <ActionButton label="Adicionar Peça" onPress={handleConfirm} color={colors.page.dragonFruit} />
            </View>
          )}

          <TouchableOpacity onPress={onClose} style={{ marginTop: 12, alignSelf: 'center' }}>
            <Text style={{ fontFamily: fonts.bold, color: colors.black }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
