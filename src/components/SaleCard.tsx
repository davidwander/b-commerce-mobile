import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
import { Sale } from '@/services/saleService';
import { router } from 'expo-router';

interface SaleCardProps {
  sale: Sale;
  onPress?: () => void;
  showSelectButton?: boolean;
}

export function SaleCard({ sale, onPress, showSelectButton = false }: SaleCardProps) {
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
      style={{
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 22,
        marginBottom: 16,
        marginHorizontal: 16,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Status Badge */}
      <View
        style={{
          position: 'absolute',
          top: 8,
          right: 12,
          backgroundColor: sale.status === 'open' ? colors.page.tulips : '#4CAF50',
          paddingVertical: 2,
          paddingHorizontal: 8,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.bold,
            color: colors.white
          }}
        >
          {sale.status === 'open' ? 'Em Aberto' : 'Fechada'}
        </Text>
      </View>

      {/* Botão de Selecionar Venda (se for para mostrar) */}
      {showSelectButton && sale.status === 'open' && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 8,
            left: 12,
            backgroundColor: colors.page.dragonFruit,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 12,
          }}
          onPress={handleSelectSale}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: fonts.bold,
              color: colors.white
            }}
          >
            🛒 Selecionar
          </Text>
        </TouchableOpacity>
      )}

      {/* Nome do Cliente */}
      <View style={{
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 8,
        marginTop: showSelectButton ? 20 : 0
      }}>
        <Ionicons 
          name="person" 
          size={18} 
          color={colors.black} 
          style={{ marginRight: 6 }}
        />
        <Text style={{
          fontFamily: fonts.bold, 
          fontSize: 18, 
          color: colors.black
        }}>
          {sale.clientName}
        </Text>
      </View>

      {/* Telefone (se existir) */}
      {sale.phone && (
        <View style={{
          flexDirection: 'row', 
          alignItems: 'center', 
          marginBottom: 8
        }}>
          <Ionicons 
            name="call" 
            size={16} 
            color={colors.black} 
            style={{ marginRight: 6 }}
          />
          <Text style={{
            fontFamily: fonts.regular, 
            fontSize: 16, 
            color: colors.black
          }}>
            {sale.phone}
          </Text>
        </View>
      )}

      {/* Endereço (se existir) */}
      {sale.address && (
        <View style={{
          flexDirection: 'row', 
          alignItems: 'center', 
          marginBottom: 8
        }}>
          <Ionicons 
            name="location" 
            size={16} 
            color={colors.black} 
            style={{ marginRight: 6 }}
          />
          <Text style={{
            fontFamily: fonts.regular, 
            fontSize: 14, 
            color: colors.black,
            flex: 1
          }} 
          numberOfLines={2}
          >
            {sale.address}
          </Text>
        </View>
      )}

      {/* Data de Criação */}
      <View style={{
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 8
      }}>
        <Ionicons 
          name="calendar" 
          size={16} 
          color={colors.black} 
          style={{ marginRight: 6 }}
        />
        <Text style={{
          fontFamily: fonts.regular, 
          fontSize: 16, 
          color: colors.black
        }}>
          {formatDate(sale.createdAt)}
        </Text>
      </View>

      {/* NOVA SEÇÃO: Resumo de Peças e Valores */}
      <View style={{
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: sale.totalPieces > 0 ? colors.page.tulips : '#6c757d'
      }}>
        {/* Quantidade de Peças */}
        <View style={{
          flexDirection: 'row', 
          alignItems: 'center', 
          marginBottom: 6
        }}>
          <Ionicons 
            name="shirt" 
            size={16} 
            color={sale.totalPieces > 0 ? colors.page.tulips : '#6c757d'} 
            style={{ marginRight: 6 }}
          />
          <Text style={{
            fontFamily: fonts.regular, 
            fontSize: 16, 
            color: sale.totalPieces > 0 ? colors.black : '#6c757d'
          }}>
            {sale.totalPieces} {sale.totalPieces === 1 ? 'peça' : 'peças'}
          </Text>
        </View>

        {/* Valor Total */}
        <View style={{
          flexDirection: 'row', 
          alignItems: 'center',
        }}>
          <Ionicons 
            name="cash" 
            size={16} 
            color={sale.totalValue > 0 ? '#4CAF50' : '#6c757d'} 
            style={{ marginRight: 6 }}
          />
          <Text style={{
            fontFamily: fonts.bold, 
            fontSize: 18, 
            color: sale.totalValue > 0 ? '#4CAF50' : '#6c757d',
          }}>
            {formatCurrency(sale.totalValue)}
          </Text>
        </View>

        {/* Mensagem para vendas sem peças */}
        {sale.totalPieces === 0 && (
          <Text style={{
            fontSize: 12,
            color: '#6c757d',
            fontStyle: 'italic',
            marginTop: 4
          }}>
            Nenhuma peça adicionada ainda
          </Text>
        )}
      </View>

      {/* Indicador de que pode tocar para ver mais */}
      {onPress && (
        <View style={{
          position: 'absolute',
          bottom: 8,
          right: 12,
        }}>
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={colors.page.tulips}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}