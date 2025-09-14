import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'; // Adicionado Alert
import { Ionicons } from '@expo/vector-icons';
import { styles } from './SaleDetailsModal.styles';
import { Sale, SalePiece, saleService } from '@/services/saleService'; // Adicionado saleService
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
import { CustomInput } from '@/components/CustomInput'; // Importar CustomInput
import { ActionButton } from '@/components/ActionButton'; // Importar ActionButton

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
      case 'calculate-shipping': // Novo status
        return {
          text: 'Calcular Frete',
          color: colors.page.olive, // Uma nova cor para este status
          backgroundColor: colors.page.olive + '28',
          icon: 'car-outline' as const // Ícone para frete
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

  const handleConfirmPayment = async () => {
    if (!sale || !sale.id) return;

    try {
      if (sale.status === 'open-awaiting-payment') {
        const result = await saleService.confirmPayment(sale.id);
        if (result.success) {
          Alert.alert('Sucesso!', 'Pagamento confirmado com sucesso! Agora adicione o frete.');
          onClose();
        } else {
          Alert.alert('Erro', result.message || 'Erro ao confirmar pagamento.');
        }
      } else if (sale.status === 'calculate-shipping') {
        const parsedShippingValue = parseFloat(shippingValueInput.replace(',', '.'));
        if (isNaN(parsedShippingValue) || parsedShippingValue < 0) {
          Alert.alert('Erro', 'Por favor, insira um valor de frete válido e não negativo.');
          return;
        }

        const result = await saleService.updateShippingValue(sale.id, parsedShippingValue);
        if (result.success) {
          Alert.alert('Sucesso!', 'Valor do frete adicionado e venda fechada!');
          onClose();
        } else {
          Alert.alert('Erro', result.message || 'Erro ao adicionar valor do frete.');
        }
      }
    } catch (error) {
      console.error('Erro na ação da venda:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado na ação da venda.');
    }
  };

  const statusDisplay = getStatusDisplay(sale.status);

  const [shippingValueInput, setShippingValueInput] = useState<string>(sale.shippingValue?.toString() || '');
  const finalTotalValue = (sale.totalValue || 0) + (sale.shippingValue || 0);

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

              {sale.shippingValue !== undefined && sale.shippingValue !== null && (
                <View style={styles.detailRow}>
                  <Ionicons
                    name="car-outline"
                    size={16}
                    color={colors.black}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.detailLabel}>Frete:</Text>
                  <Text style={[styles.detailValue, { fontFamily: fonts.bold, fontSize: 16 }]}>
                    {formatCurrency(sale.shippingValue)}
                  </Text>
                </View>
              )}

              <View style={styles.detailRow}>
                <Ionicons
                  name="wallet-outline"
                  size={16}
                  color={colors.black}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.detailLabel}>Total Final:</Text>
                <Text style={[styles.detailValue, { 
                  fontFamily: fonts.bold, 
                  fontSize: 18, 
                  color: colors.page.dragonFruit 
                }]}>
                  {formatCurrency(finalTotalValue)}
                </Text>
              </View>
            </View>

            {/* Input para o Frete (visível apenas quando o status é 'calculate-shipping') */}
            {sale.status === 'calculate-shipping' && sale.shippingValue === null && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Adicionar Valor do Frete</Text>
                <CustomInput
                  label="Valor do Frete"
                  placeholder="Ex: 15,50"
                  keyboardType="numeric"
                  value={shippingValueInput}
                  onChangeText={setShippingValueInput}
                  maskType="money"
                />
              </View>
            )}

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

          {/* Botões de Ação */}
          {(sale.status === 'open-awaiting-payment' || (sale.status === 'calculate-shipping' && sale.shippingValue === null)) && (
            <ActionButton
              label={sale.status === 'open-awaiting-payment' ? 'Confirmar Pagamento' : 'Adicionar Frete e Fechar Venda'}
              onPress={handleConfirmPayment}
              color={sale.status === 'open-awaiting-payment' ? colors.page.viridian : colors.page.olive}
              style={{ marginBottom: 10 }}
            />
          )}

          {/* Botão de Fechar (sempre visível) */}
          <ActionButton
            label="Fechar"
            onPress={onClose}
            color={colors.black + 'CC'}
          />
        </View>
      </View>
    </Modal>
  );
}