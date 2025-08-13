import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { router } from 'expo-router';

import { Header } from '@/components/Header';
import { ActionButton } from '@/components/ActionButton';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';


const openSales = [
  { id: '1', client: 'Celia', total: 280.50, date: '2025-08-06' },
  { id: '2', client: 'Maria', total: 150.00, date: '2025-08-05' },
  { id: '3', client: 'Marta', total: 320.00, date: '2025-08-04' },
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
      <ActionButton 
        label="Nova venda"
        onPress={() => router.push("/sales/new")}
        color={colors.page.dragonFruit}
        style={{ marginHorizontal: 16, marginBottom: 46 }}
      />
    </View>
  );
}
