import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
import { Sale } from '@/services/saleService';

interface SaleCardProps {
  sale: Sale;
  onPress: () => void;
  showSelectButton?: boolean;
  statusColor?: string;
}

export function SaleCard({ sale, onPress, showSelectButton = false }: SaleCardProps) {
  // Função para determinar o status e cor baseado no estado da venda
  const getStatusInfo = () => {
    switch (sale.status) {
      case 'open-no-pieces':
        return {
          text: 'Em Aberto',
          color: colors.page.tulips,
          icon: 'time-outline' as const
        };
      case 'open-awaiting-payment':
        return {
          text: 'Aguardando Pagamento',
          color: colors.page.meadow,
          icon: 'card-outline' as const
        };
      case 'calculate-shipping': // Novo status
        return {
          text: 'Calcular Frete',
          color: colors.page.olive, // Cor atualizada para o novo status
          icon: 'car-outline' as const
        };
      case 'closed':
        return {
          text: 'Fechada',
          color: '#4CAF50',
          icon: 'checkmark-circle-outline' as const
        };
      default:
        // Para compatibilidade com status antigos
        if (sale.totalPieces > 0) {
          return {
            text: 'Aguardando Pagamento',
            color: colors.page.meadow,
            icon: 'card-outline' as const
          };
        } else {
          return {
            text: 'Em Aberto',
            color: colors.page.tulips,
            icon: 'time-outline' as const
          };
        }
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const statusInfo = getStatusInfo();

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Header do Card */}
      <View style={styles.headerCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerText}>
            {sale.clientName}
          </Text>
          
          {sale.phone && (
            <Text style={{
              fontSize: 16,
              color: colors.black,
              opacity: 0.7
            }}>
              {sale.phone}
            </Text>
          )}
        </View>

        {/* Badge de Status */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: statusInfo.color,
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 12,
        }}>
          <Ionicons 
            name={statusInfo.icon} 
            size={14} 
            color={colors.white} 
            style={{ marginRight: 4 }}
          />
          <Text style={styles.badgeText}>
            {statusInfo.text}
          </Text>
        </View>
      </View>

      {/* Informações da Venda */}
      <View style={styles.saleContainer}>
        <View>
          <Text style={styles.saleDate}>
            Data
          </Text>
          <Text style={styles.saleDateContent}>
            {formatDate(sale.createdAt)}
          </Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={styles.pieces}>
            Peças
          </Text>
          <Text style={styles.quantityPiece}>
            {sale.totalPieces || 0}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.total}>
            Valor Total
          </Text>
          <Text style={{
            fontSize: 16,
            fontFamily: fonts.bold,
            color: statusInfo.color,
          }}>
            {formatCurrency(sale.totalValue || 0)}
          </Text>
        </View>
      </View>

      {/* Botão de Seleção (para modo de adicionar peças) */}
      {showSelectButton && (
        <View style={styles.showSelectButton}>
          <View style={styles.showSelectButtonContent}>
            <Ionicons 
              name="add-circle-outline" 
              size={20} 
              color={colors.page.dragonFruit} 
              style={{ marginRight: 6 }}
            />
            <Text style={styles.showSelectButtonText}>
              Adicionar Peças a esta Venda
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}