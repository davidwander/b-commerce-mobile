import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { PartLeaf } from '@/data/partsTree';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

interface PieceDetailsModalProps {
  visible: boolean;
  piece: PartLeaf;
  onClose: () => void;
  saleId?: string | null;
  onAddPieceToSale?: (pieceId: string, saleId: string, quantity: number) => Promise<void>;
}

export function PieceDetailsModal({ visible, piece, onClose, saleId, onAddPieceToSale }: PieceDetailsModalProps) {
  const [quantityToAdd, setQuantityToAdd] = useState('1');

  const handleAddPress = async () => {
    if (!saleId || !onAddPieceToSale) {
      Alert.alert("Erro", "Funcionalidade de adicionar à venda não disponível.");
      return;
    }
    const parsedQuantity = parseInt(quantityToAdd, 10);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      Alert.alert("Erro", "Quantidade inválida.");
      return;
    }
    if (piece.quantity && parsedQuantity > piece.quantity) {
      Alert.alert("Erro", `Quantidade em estoque insuficiente. Disponível: ${piece.quantity}`);
      return;
    }
    try {
      await onAddPieceToSale(piece.id, saleId, parsedQuantity);
      Alert.alert("Sucesso!", `${parsedQuantity} ${piece.name} adicionado(s) à venda.`);
      onClose();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar a peça à venda.");
      console.error("Erro ao adicionar peça à venda:", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{piece.name}</Text>
          <Text style={styles.modalDescription}>{piece.description}</Text>
          
          {piece.quantity !== undefined && piece.quantity !== null && (
            <Text style={styles.modalQuantity}>Estoque: {piece.quantity}</Text>
          )}

          {saleId && (
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>Quantidade para Venda:</Text>
              <TextInput
                style={styles.quantityInput}
                keyboardType="numeric"
                value={quantityToAdd}
                onChangeText={setQuantityToAdd}
                maxLength={3}
              />
            </View>
          )}

          {saleId && (
            <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={handleAddPress}
            >
              <Text style={styles.buttonText}>Adicionar à Venda</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.button, styles.closeButton]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalTitle: {
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: fonts.italic,
    fontSize: 22,
    color: colors.black,
  },
  modalDescription: {
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black,
  },
  modalQuantity: {
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black,
  },
  closeButton: {
    backgroundColor: colors.page.dragonFruit,
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  closeButtonText: {
    color: 'white',
    fontFamily: fonts.bold,
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '100%',
  },
  addButton: {
    backgroundColor: colors.page.tulips,
  },
  buttonText: {
    color: 'white',
    fontFamily: fonts.bold,
    textAlign: 'center',
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  quantityLabel: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black,
    marginRight: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 60,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: fonts.regular,
  },
});
