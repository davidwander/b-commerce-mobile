import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PartLeaf } from '@/data/partsTree';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

interface PieceDetailsModalProps {
  visible: boolean;
  piece: PartLeaf;
  onClose: () => void;
}

export function PieceDetailsModal({ visible, piece, onClose }: PieceDetailsModalProps) {
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
            <Text style={styles.modalQuantity}>Quantidade: {piece.quantity}</Text>
          )}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
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
});
