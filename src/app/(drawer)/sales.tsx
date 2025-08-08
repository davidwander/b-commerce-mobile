import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '@/styles/colors';
import { Header } from '@/components/Header';
import { FontAwesome } from '@expo/vector-icons';
import { fonts } from '@/styles/fonts';

const openSales = [
  { id: '1', client: 'João', total: 280.50, date: '2025-08-06' },
  { id: '2', client: 'Maria', total: 150.00, date: '2025-08-05' },
  { id: '3', client: 'Carlos', total: 320.00, date: '2025-08-04' },
];

export default function Sales() {
  return (
    <View style={{
      flex: 1,
      paddingTop: 30,
      backgroundColor: colors.page.daffodils,
    }}>
      <Header />

      <View style={{ flex: 1, padding: 16 }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: fonts.italic,
            marginBottom: 18,
            color: colors.black,
          }}
        >
          Vendas em Aberto
        </Text>

        {openSales.length === 0 ? (
          <Text
            style={{
              color: colors.black,
              fontFamily: fonts.italic,
            }}
          >
            Nenhuma venda em aberto.
          </Text>
        ) : (
          <FlatList
            data={openSales}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: colors.white,
                  borderRadius: 8,
                  padding: 16,
                  marginBottom: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 2, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 4 }}>
                  Cliente: {item.client}
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 2 }}>
                  Data: {item.date}
                </Text>
                <Text style={{ fontSize: 14 }}>
                  Total: R$ {item.total.toFixed(2)}
                </Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Botão flutuante: Nova Venda */}
      <TouchableOpacity
        onPress={() => {
          // ação futura: ir para tela de nova venda
        }}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          backgroundColor: colors.page.dragonFruit,
          borderRadius: 30,
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 8,
        }}
      >
        <FontAwesome name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
