import React, { useRef, useEffect, useState } from 'react';
import { View, Text, FlatList, Animated, Alert, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { styles } from './styles';

import { Header } from '@/components/Header';
import { ActionButton } from '@/components/ActionButton';
import { SaleCard } from '@/components/SaleCard';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
import { saleService, Sale } from '@/services/saleService';

export default function Sales() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para carregar vendas
  async function loadSales() {
    try {
      console.log('📋 Carregando vendas...');
      setError(null);
      
      const result = await saleService.getSales({
        status: 'open',
        page: 1,
        limit: 20
      });

      if (result.success && result.data) {
        setSales(result.data);
        console.log(`✅ ${result.data.length} vendas carregadas`);
      } else {
        console.log('⚠️ Nenhuma venda encontrada:', result.message);
        setSales([]);
        setError(result.message || 'Nenhuma venda encontrada');
      }
    } catch (error) {
      console.error('❌ Erro ao carregar vendas:', error);
      setError('Erro ao carregar vendas. Verifique sua conexão.');
      setSales([]);
    }
  }

  // Carregar vendas na inicialização
  useEffect(() => {
    async function initialize() {
      setLoading(true);
      await loadSales();
      setLoading(false);
      
      // Animação de entrada
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }

    initialize();
  }, []);

  // Função para refresh
  async function onRefresh() {
    setRefreshing(true);
    await loadSales();
    setRefreshing(false);
  }

  // Função para testar carregamento manual
  async function testLoadSales() {
    Alert.alert(
      "Teste de Carregamento",
      "Deseja recarregar as vendas da API?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sim", 
          onPress: async () => {
            setLoading(true);
            await loadSales();
            setLoading(false);
            
            Alert.alert(
              "Resultado", 
              `${sales.length} vendas carregadas${error ? `\n\nErro: ${error}` : ''}`
            );
          }
        }
      ]
    );
  }

  // Renderizar item da lista (usando SaleCard ou card customizado)
  function renderSaleItem({ item, index }: { item: Sale; index: number }) {
    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ 
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }) 
          }],
        }}
      >
        {/* Usando o SaleCard se existir, senão usar card customizado */}
        <View style={styles.card}>
          {/* Tag de status */}
          <View style={styles.status}>
            <Text style={styles.statusText}>
              {item.status === 'open' ? 'Aberta' : 'Fechada'}
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
              {item.clientName}
            </Text>
          </View>

          {/* Telefone (se existir) */}
          {item.phone && (
            <View style={styles.client}>
              <Ionicons 
                name="call-outline" 
                size={24} 
                color={colors.black} 
                style={styles.icon}
              />
              <Text style={styles.clientText}>
                {item.phone}
              </Text>
            </View>
          )}

          {/* Data */}
          <View style={styles.date}>
            <Ionicons 
              name="calendar-outline" 
              size={26} 
              color={colors.black} 
              style={styles.icon}
            />
            <Text style={styles.dateText}>
              {new Date(item.createdAt).toLocaleDateString('pt-BR')}
            </Text>
          </View>

          {/* Peças */}
          <View style={styles.date}>
            <Ionicons 
              name="shirt-outline" 
              size={26} 
              color={colors.black} 
              style={styles.icon}
            />
            <Text style={styles.dateText}>
              {item.totalPieces} {item.totalPieces === 1 ? 'peça' : 'peças'}
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
              R$ {item.totalValue.toFixed(2)}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.containerContent}>
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 16
        }}>
          <Text style={styles.header}>
            Vendas em Aberto
          </Text>
          
          {/* Botão de refresh */}
          <ActionButton
            label="🔄"
            onPress={testLoadSales}
            color={colors.page.tulips}
            style={{ 
              minWidth: 50,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
          />
        </View>

        {/* Indicador de carregamento */}
        {loading && (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: colors.black }}>
              Carregando vendas...
            </Text>
          </View>
        )}

        {/* Mensagem de erro */}
        {error && !loading && (
          <View style={{ 
            padding: 20, 
            alignItems: 'center',
            backgroundColor: '#ffebee',
            borderRadius: 8,
            marginBottom: 16
          }}>
            <Text style={{ fontSize: 16, color: '#c62828', textAlign: 'center' }}>
              {error}
            </Text>
            <ActionButton
              label="Tentar Novamente"
              onPress={() => {
                setLoading(true);
                loadSales().finally(() => setLoading(false));
              }}
              color="#c62828"
              style={{ marginTop: 12 }}
            />
          </View>
        )}

        {/* Lista de vendas ou mensagem vazia */}
        {!loading && !error && sales.length === 0 ? (
          <View style={{ alignItems: 'center', padding: 40 }}>
            <Ionicons 
              name="receipt-outline" 
              size={64} 
              color={colors.black} 
              style={{ marginBottom: 16 }}
            />
            <Text style={styles.listEmptyText}>
              Nenhuma venda em aberto.
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: colors.black, 
              textAlign: 'center',
              marginTop: 8,
              opacity: 0.7
            }}>
              Crie sua primeira venda usando o botão abaixo
            </Text>
          </View>
        ) : !loading && (
          <FlatList
            data={sales}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            renderItem={renderSaleItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[colors.page.tulips]}
              />
            }
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