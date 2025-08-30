import React, { useRef, useEffect } from 'react';
import { View, Text, FlatList, Animated } from 'react-native';
import { router } from 'expo-router';
import { styles } from './styles';

import { Header } from '@/components/Header';
import { ActionButton } from '@/components/ActionButton';

import { Ionicons } from '@expo/vector-icons';
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
    <View style={styles.container}>
      <Header />

      <View style={styles.containerContent}>
        <Text style={styles.header}>
          Vendas em Aberto
        </Text>

        {openSales.length === 0 ? (
          <Text style={styles.listEmptyText}>
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
                <View style={styles.card}>
                  {/* Tag de status */}
                  <View style={styles.status}>
                    <Text style={styles.statusText}>
                      Aberta
                    </Text>
                  </View>

                  {/* Cliente */}
                  <View style={styles.client}>
                    <Ionicons 
                      name="person-circle-outline" 
                      size={26} 
                      color={colors.black} 
                      style={styles.icon}
                    />
                    <Text style={styles.clientText}>
                      {item.client}
                    </Text>
                  </View>

                  {/* Data */}
                  <View style={styles.date}>
                    <Ionicons 
                      name="calendar-outline" 
                      size={26} 
                      color={colors.black} 
                      style={styles.icon}
                    />
                    <Text style={styles.dateText}>
                      {item.date}
                    </Text>
                  </View>

                  {/* Total */}
                  <View style={styles.total}>
                    <Ionicons 
                      name="cash-outline" 
                      size={26} 
                      color={colors.black} 
                      style={styles.icon}
                    />
                    <Text style={styles.totalText}>
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
        onPress={() => router.push("/sales/newSale")}
        color={colors.page.dragonFruit}
        style={{
          marginHorizontal: 16,
          marginBottom: 46,
        }}
      />
    </View>
  );
}
