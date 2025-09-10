import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './SaleDetailsModal.styles';
import { Sale, SalePiece } from '@/services/saleService';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

interface SaleDetailsModalProps {
  isVisible: boolean;
  sale: Sale | null;
  onClose: () => void;
}

export function SaleDetailsModal({ isVisible, sale, onClose }: SaleDetailsModalProps) {
  if (!sale) return null;

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

  // Função para determinar o status e informações visuais
  const getStatusDisplay = (status: Sale['status']) => {
    switch (status) {
      case 'open-no-pieces':
        return { 
          text: 'Em Aberto', 
          color: colors.page.tulips,
          backgroundColor: colors.page.tulips + '28',
          icon: 'time-outline' as const
        };
      case 'open-awaiting-payment':
        return { 
          text: 'Aguardando Pagamento', 
          color: colors.page.viridian,
          backgroundColor: colors.page.meadow + '28',
          icon: 'card-outline' as const
        };
      case 'closed':
        return { 
          text: 'Fechada', 
          color: '#4CAF50',
          backgroundColor: '#4CAF50' + '28',
          icon: 'checkmark-circle-outline' as const
        };
      default:
        // Fallback baseado no número de peças para compatibilidade
        if (sale.totalPieces > 0) {
          return { 
            text: 'Aguardando Pagamento', 
            color: colors.page.viridian,
            backgroundColor: colors.page.meadow + '28',
            icon: 'card-outline' as const
          };
        } else {
          return { 
            text: 'Em Aberto', 
            color: colors.page.tulips,
            backgroundColor: colors.page.tulips + '28',
            icon: 'time-outline' as const
          };
        }
    }
  };

  const statusDisplay = getStatusDisplay(sale.status);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Header do Modal */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderBottomColor: colors.black + '50'
          }}>
            <Text style={[styles.modalTitle, { flex: 1 }]}>
              Detalhes da Venda
            </Text>
            
            {/* Badge de Status */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: statusDisplay.backgroundColor,
              paddingHorizontal: 18,
              paddingVertical: 6,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: statusDisplay.color + '30',
            }}>
              <Ionicons 
                name={statusDisplay.icon} 
                size={16} 
                color={statusDisplay.color} 
                style={{ marginRight: 6 }}
              />
              <Text style={{
                fontSize: 12,
                fontFamily: fonts.regular,
                color: statusDisplay.color,
              }}>
                {statusDisplay.text}
              </Text>
            </View>
          </View>

          <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
            {/* Informações do Cliente */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Informações da Cliente
              </Text>
              
              <View style={styles.detailRow}>
                <Ionicons 
                  name="person-outline" 
                  size={16} 
                  color={colors.black} 
                  style={{ marginRight: 8 }} 
                />
                <Text style={styles.detailLabel}>
                  Cliente:
                </Text>
                <Text style={styles.detailValue}>
                  {sale.clientName}
                </Text>
              </View>

              {sale.phone && (
                <View style={styles.detailRow}>
                  <Ionicons 
                    name="call-outline" 
                    size={16} 
                    color={colors.black} 
                    style={{ marginRight: 8 }} 
                  />
                  <Text style={styles.detailLabel}>Telefone:</Text>
                  <Text style={styles.detailValue}>{sale.phone}</Text>
                </View>
              )}

              {sale.address && (
                <View style={styles.detailRow}>
                  <Ionicons 
                    name="location-outline" 
                    size={16} 
                    color={colors.black} 
                    style={{ marginRight: 8 }} 
                  />
                  <Text style={styles.detailLabel}>Endereço:</Text>
                  <Text style={styles.detailValue}>{sale.address}</Text>
                </View>
              )}
            </View>

            {/* Informações da Venda */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Informações da Venda
              </Text>
              
              <View style={styles.detailRow}>
                <Ionicons 
                  name="calendar-outline" 
                  size={16} 
                  color={colors.black} 
                  style={{ marginRight: 8 }} 
                />
                <Text style={styles.detailLabel}>Data:</Text>
                <Text style={styles.detailValue}>{formatDate(sale.createdAt)}</Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons 
                  name="cube-outline" 
                  size={16} 
                  color={colors.black} 
                  style={{ marginRight: 8 }} 
                />
                <Text style={styles.detailLabel}>Total de Peças:</Text>
                <Text style={[styles.detailValue, { fontFamily: fonts.bold }]}>{sale.totalPieces}</Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons 
                  name="cash-outline" 
                  size={16} 
                  color={colors.black} 
                  style={{ marginRight: 8 }} 
                />
                <Text style={styles.detailLabel}>Valor Total:</Text>
                <Text style={[styles.detailValue, { 
                  fontFamily: fonts.bold, 
                  fontSize: 16, 
                  color: statusDisplay.color 
                }]}>
                  {formatCurrency(sale.totalValue)}
                </Text>
              </View>
            </View>

            {/* Lista de Peças */}
            {sale.salePieces && sale.salePieces.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Peças na Venda ({sale.salePieces.length})
                </Text>
                
                {sale.salePieces.map((sp: SalePiece, index) => (
                  <View key={sp.piece.id} style={[
                    styles.pieceItem,
                    { 
                      backgroundColor: index % 2 === 0 ? colors.white : colors.page.daffodils + '30',
                      borderRadius: 8,
                      marginVertical: 2
                    }
                  ]}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.pieceDescription} numberOfLines={2}>
                        {sp.piece.description}
                      </Text>
                      <Text style={styles.pieceUnitPrice}>
                        Unidade: {formatCurrency(sp.piece.price)}
                      </Text>
                    </View>
                    
                    <View style={{ alignItems: 'center', marginLeft: 12 }}>
                      <Text style={styles.pieceQuantity}>{sp.quantity}x</Text>
                    </View>
                    
                    <View style={{ alignItems: 'flex-end', marginLeft: 12 }}>
                      <Text style={styles.piecePrice}>
                        {formatCurrency(sp.piece.price * sp.quantity)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Mensagem quando não há peças */}
            {(!sale.salePieces || sale.salePieces.length === 0) && (
              <View style={[styles.section, { alignItems: 'center', paddingVertical: 30 }]}>
                <Ionicons 
                  name="cube-outline" 
                  size={48} 
                  color={colors.black + '40'} 
                  style={{ marginBottom: 12 }}
                />
                <Text style={{ 
                  textAlign: 'center', 
                  fontStyle: 'italic', 
                  color: colors.black + '80',
                  fontSize: 16
                }}>
                  Nenhuma peça adicionada a esta venda ainda.
                </Text>
                <Text style={{ 
                  textAlign: 'center', 
                  fontSize: 14, 
                  color: colors.black + '70',
                  marginTop: 4
                }}>
                  Use o botão "Adicionar Peças" para começar.
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Botão de Fechar */}
          <TouchableOpacity
            style={[styles.closeButton, {
              backgroundColor: statusDisplay.color,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }]}
            onPress={onClose}
          >
            <Ionicons 
              name="close-outline" 
              size={22} 
              color={colors.white} 
              style={{ marginRight: 6 }} 
            />
            <Text style={styles.closeButtonText}>
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}