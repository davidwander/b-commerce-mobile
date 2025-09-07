import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { Sale } from '@/services/saleService';
import { router } from 'expo-router';

interface SaleCardProps {
  sale: Sale;
  onPress?: () => void;
  showSelectButton?: boolean;
  statusColor: string;
}

export function SaleCard({ sale, onPress, showSelectButton = false, statusColor }: SaleCardProps) {
  // Formatação da data
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

  // Formatação do valor
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // Função para selecionar a venda e ir para o estoque
  const handleSelectSale = () => {
    router.push(`/inventory?saleId=${sale.id}`);
  };

  return (
    <TouchableOpacity 
      style={[styles.cardContainer, showSelectButton && { paddingTop: 40 } ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Status Badge */}
      <View
        style={[styles.statusBadge, { backgroundColor: statusColor } ]}
      >
        <Text style={styles.statusBadgeText}>
          {sale.status === 'open' ? 'Em Aberto' : 'Fechada'}
        </Text>
      </View>

      {/* Botão de Selecionar Venda (se for para mostrar) */}
      {showSelectButton && sale.status === 'open' && (
        <TouchableOpacity
          style={styles.buttonSelect}
          onPress={handleSelectSale}
        >
          <Text
            style={styles.buttonSelectText}
          >
            🛒 Selecionar
          </Text>
        </TouchableOpacity>
      )}

      {/* Nome do Cliente */}
      <View style={styles.clientNameContainer}>
        <Ionicons 
          name="person" 
          size={18} 
          color={colors.black} 
          style={{ marginRight: 6 }}
        />
        <Text style={styles.clientName}>
          {sale.clientName}
        </Text>
      </View>

      {/* Telefone (se existir) */}
      {sale.phone && (
        <View style={styles.phoneClientContainer}>
          <Ionicons 
            name="call" 
            size={18} 
            color={colors.black} 
            style={{ marginRight: 6 }}
          />
          <Text style={styles.phoneClient}>
            {sale.phone}
          </Text>
        </View>
      )}

      {/* Endereço (se existir) */}
      {sale.address && (
        <View style={styles.addressClientContainer}>
          <Ionicons 
            name="location" 
            size={18} 
            color={colors.black} 
            style={{ marginRight: 6 }}
          />
          <Text style={styles.addressClient} 
          numberOfLines={2}
          >
            {sale.address}
          </Text>
        </View>
      )}

      {/* Data de Criação */}
      <View style={styles.dateContainer}>
        <Ionicons 
          name="calendar" 
          size={18} 
          color={colors.black} 
          style={{ marginRight: 6 }}
        />
        <Text style={styles.date}>
          {formatDate(sale.createdAt)}
        </Text>
      </View>

      {/* NOVA SEÇÃO: Resumo de Peças e Valores */}
      <View style={{
        ...styles.newSectionContainer,
        backgroundColor: colors.white,
        borderLeftColor: sale.totalPieces > 0 ? colors.page.tulips : '#6c757d'
      }}>
        {/* Quantidade de Peças */}
        <View style={styles.quantityContent}>
          <Ionicons 
            name="shirt" 
            size={18} 
            color={sale.totalPieces > 0 ? colors.page.tulips : '#6c757d'} 
            style={{ marginRight: 6 }}
          />
          <Text style={{
            ...styles.quantityText,
            color: sale.totalPieces > 0 ? colors.black : '#6c757d'
          }}>
            {sale.totalPieces} {sale.totalPieces === 1 ? 'peça' : 'peças'}
          </Text>
        </View>

        {/* Valor Total */}
        <View style={styles.totalValueContainer}>
          <Ionicons 
            name="cash" 
            size={18} 
            color={sale.totalValue > 0 ? '#4CAF50' : '#6c757d'} 
            style={{ marginRight: 6 }}
          />
          <Text style={{
            ...styles.totalValueText,
            color: sale.totalValue > 0 ? '#4CAF50' : '#6c757d',
          }}>
            {formatCurrency(sale.totalValue)}
          </Text>
        </View>

        {/* Mensagem para vendas sem peças */}
        {sale.totalPieces === 0 && (
          <Text style={styles.saleWithoutParts}>
            Nenhuma peça adicionada ainda
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}