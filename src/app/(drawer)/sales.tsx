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
      backgroundColor: colors.page.daffodils, // mantém a cor original
    }}>
      <Header />

      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
        {/* Título da seção */}
        <Text
          style={{
            fontSize: 18,
            fontFamily: fonts.italic,
            fontWeight: '600',
            marginBottom: 16,
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
              textAlign: 'center',
              marginTop: 50,
            }}
          >
            Nenhuma venda em aberto.
          </Text>
        ) : (
          <FlatList
            data={openSales}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: colors.white,
                  borderRadius: 14,
                  padding: 20,
                  marginBottom: 16,
                  elevation: 5,
                  shadowColor: "#000",
                  shadowOffset: { width: 5, height: 8 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}
              >
                <Text style={{ fontFamily: fonts.bold, fontSize: 16, marginBottom: 6, color: colors.black }}>
                  Cliente: {item.client}
                </Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: 14, marginBottom: 4, color: colors.black }}>
                  Data: {item.date}
                </Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.black }}>
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
        style={{
          marginHorizontal: 16,
          marginBottom: 46,
        }}
      />
    </View>
  );
}
