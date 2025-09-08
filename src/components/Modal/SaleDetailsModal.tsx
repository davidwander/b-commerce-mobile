import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './SaleDetailsModal.styles';
import { Sale, SalePiece } from '@/services/saleService';
import { colors } from '@/styles/colors';

interface SaleDetailsModalProps {
  visible: boolean;
  sale: Sale | null;
  onClose: () => void;
}

export function SaleDetailsModal({ visible, sale, onClose }: SaleDetailsModalProps) {
  if (!sale) return null; // Não renderiza se não houver venda

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const getStatusDisplay = (status: Sale['status']) => {
    switch (status) {
      case 'open-no-pieces':
      case 'open': // Para compatibilidade com status antigos
        return { text: 'Em Aberto', color: colors.page.tulips };
      case 'open-awaiting-payment':
        return { text: 'Aguardando Pagamento', color: colors.page.magnolia };
      case 'closed':
        return { text: 'Fechada', color: '#4CAF50' };
      default:
        return { text: 'Desconhecido', color: colors.black };
    }
  };

  const { text: statusText, color: statusDisplayColor } = getStatusDisplay(sale.status);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Detalhes da Venda</Text>

          <ScrollView style={{ width: '100%' }}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Cliente:</Text>
              <Text style={styles.detailValue}>{sale.clientName}</Text>
            </View>
            {sale.phone && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Telefone:</Text>
                <Text style={styles.detailValue}>{sale.phone}</Text>
              </View>
            )}
            {sale.address && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Endereço:</Text>
                <Text style={styles.detailValue}>{sale.address}</Text>
              </View>
            )}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Data:</Text>
              <Text style={styles.detailValue}>{formatDate(sale.createdAt)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status:</Text>
              <Text style={[
                styles.detailValue, 
                { color: statusDisplayColor } 
              ]}>
                {statusText}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total de Peças:</Text>
              <Text style={styles.detailValue}>{sale.totalPieces}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Valor Total:</Text>
              <Text style={styles.detailValue}>{formatCurrency(sale.totalValue)}</Text>
            </View>

            {sale.salePieces && sale.salePieces.length > 0 && (
              <View style={styles.pieceListContainer}>
                <Text style={styles.pieceListTitle}>Peças na Venda:</Text>
                {sale.salePieces.map((sp: SalePiece) => (
                  <View key={sp.piece.id} style={styles.pieceItem}>
                    <Text style={styles.pieceDescription} numberOfLines={1}>{sp.piece.description}</Text>
                    <Text style={styles.pieceQuantity}>{sp.quantity}x</Text>
                    <Text style={styles.piecePrice}>{formatCurrency(sp.piece.price * sp.quantity)}</Text>
                  </View>
                ))}
              </View>
            )}

            {!sale.salePieces || sale.salePieces.length === 0 && (
              <Text style={{ textAlign: 'center', marginTop: 20, fontStyle: 'italic', color: colors.black }}>
                Nenhuma peça adicionada a esta venda ainda.
              </Text>
            )}
          </ScrollView>

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
