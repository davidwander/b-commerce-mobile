import React, { useRef, useEffect, useState } from 'react';
import { View, Text, FlatList, Animated, Alert, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { styles } from './styles';

import { Header } from '@/components/Header';
import { ActionButton } from '@/components/ActionButton';
import { SaleCard } from '@/components/SaleCard';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { saleService, Sale } from '@/services/saleService';

export default function Sales() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'select'>('list'); 

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

  // Alternar entre modos de visualização
  const toggleViewMode = () => {
    setViewMode(prev => prev === 'list' ? 'select' : 'list');
  };

  // Handler para selecionar uma venda (quando no modo lista normal)
  const handleSelectSale = (sale: Sale) => {
    if (viewMode === 'select') {
      // No modo seleção, navega direto para o estoque
      router.push(`/inventory?saleId=${sale.id}`);
    }
  };

  // Handler para ver detalhes da venda (quando no modo lista normal)
  const handleViewDetails = (sale: Sale) => {
    if (viewMode === 'list') {
      // Aqui você pode navegar para os detalhes da venda
      Alert.alert('Detalhes da Venda', `Visualizando venda: ${sale.clientName}`);
    }
  };

  // Renderizar item da lista
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
        <SaleCard
          sale={item}
          onPress={() => handleViewDetails(item)}
          showSelectButton={viewMode === 'select'}
        />
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containerContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>
            {viewMode === 'select' ? 'Selecionar Venda' : 'Vendas em Aberto'}
          </Text>
          
          <View style={styles.headerButtons}>
            {/* Botão para alternar modo */}
            <ActionButton
              label={viewMode === 'select' ? undefined : undefined}
              icon={viewMode === 'select' ? 'x' : 'shopping-cart'}
              onPress={toggleViewMode}
              color={viewMode === 'select' ? colors.page.dragonFruit : colors.page.tulips}
              style={styles.headerButtons}
            />
            
            {/* Botão de refresh */}
            <ActionButton
              label={undefined}
              icon="refresh-ccw"
              onPress={loadSales}
              color={colors.page.tulips}
              style={styles.headerButtons}
            />
          </View>
        </View>

        {/* Mensagem do modo */}
        {viewMode === 'select' && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              🛒 Selecione uma venda para adicionar peças
            </Text>
          </View>
        )}

        {/* Indicador de carregamento */}
        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.messageText}>
              Carregando vendas...
            </Text>
          </View>
        )}

        {/* Mensagem de erro */}
        {error && !loading && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
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
            />
            <Text style={styles.listEmptyText}>
              Nenhuma venda em aberto.
            </Text>
            <Text style={styles.emptyMessage}>
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
        style={styles.floatingButton}
      />
    </View>
  );
}