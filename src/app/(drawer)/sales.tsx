import React, { useRef, useEffect } from 'react';
import { View, Text, FlatList, Animated } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={{
      flex: 1,
      paddingTop: 30,
      backgroundColor: colors.page.daffodils,
    }}>
      <Header />

      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
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
            renderItem={({ item, index }) => (
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }) }],
                }}
              >
                <View
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: 12,
                    padding: 20,
                    marginBottom: 16,
                    elevation: 5,
                    shadowColor: "#000",
                    shadowOffset: { width: 5, height: 8 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
  
                  }}
                >
                  {/* Tag de status */}
                  <View style={{
                    position: 'absolute',
                    top: 8,
                    right: 12,
                    backgroundColor: colors.page.tulips,
                    paddingVertical: 2,
                    paddingHorizontal: 8,
                    borderRadius: 12,
                  }}>
                    <Text style={{
                      fontSize: 14,
                      fontFamily: fonts.bold,
                      color: colors.white
                    }}>Aberta</Text>
                  </View>

                  {/* Cliente */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Ionicons name="person-circle-outline" size={26} color={colors.black} style={{ marginRight: 6 }} />
                    <Text style={{ fontFamily: fonts.bold, fontSize: 18, color: colors.black }}>
                      {item.client}
                    </Text>
                  </View>

                  {/* Data */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Ionicons name="calendar-outline" size={26} color={colors.black} style={{ marginRight: 6 }} />
                    <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.black }}>
                      {item.date}
                    </Text>
                  </View>

                  {/* Total */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="cash-outline" size={26} color={colors.black} style={{ marginRight: 6 }} />
                    <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.black }}>
                      R$ {item.total.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </Animated.View>
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
