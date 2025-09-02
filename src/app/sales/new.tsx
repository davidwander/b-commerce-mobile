import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
import { CustomInput } from '@/components/CustomInput';
import { useForm, Controller } from 'react-hook-form';
import { ActionButton } from '@/components/ActionButton';
import { saleService } from '@/services/saleService';
import { debugAuthComplete, quickTokenCheck } from '@/utils/debugTokens';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FormData = {
  clientName: string;
  phone: string;
  address: string;
};

export default function NewSale() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      clientName: "",
      phone: "",
      address: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [saleId, setSaleId] = useState<string | null>(null);
  const [isSaleSaved, setIsSaleSaved] = useState(false);
  const [showTests, setShowTests] = useState(false);

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      console.log('🚀 Iniciando criação de venda...');
      
      // Verificação rápida do token antes de enviar
      const hasValidToken = await quickTokenCheck();
      if (!hasValidToken) {
        console.log('❌ Token inválido detectado antes da requisição');
        Alert.alert("Erro de Autenticação", "Token não encontrado ou expirado. Faça login novamente.");
        return;
      }
      
      const result = await saleService.createSale(data);
      
      if (result.success && result.data) {
        setSaleId(result.data.id);
        setIsSaleSaved(true);
        Alert.alert("Sucesso!", result.message);
        console.log('✅ Venda criada com ID:', result.data.id);
      } else {
        console.log('❌ Falha ao criar venda:', result.message);
        Alert.alert("Erro", result.message);
        
        // Se falhou, executar debug completo
        console.log('🧪 Executando debug completo...');
        await debugAuthComplete();
      }
    } catch (error) {
      console.error("❌ Erro inesperado ao criar venda:", error);
      Alert.alert("Erro", "Ocorreu um erro inesperado ao criar a venda.");
      
      // Executar debug em caso de erro
      console.log('🧪 Executando debug completo devido ao erro...');
      await debugAuthComplete();
    } finally {
      setLoading(false);
    }
  }

  // Teste 1: Verificar token atual
  async function testCurrentToken() {
    try {
      const token = await AsyncStorage.getItem('@AuthToken');
      
      if (!token) {
        Alert.alert("❌ Teste Token", "Token não encontrado no AsyncStorage");
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp < Math.floor(Date.now() / 1000);
        const timeToExpiry = payload.exp - Math.floor(Date.now() / 1000);
        
        Alert.alert(
          "✅ Token Info", 
          `Token encontrado!\n\nUsuário: ${payload.userId}\nEmail: ${payload.email}\nExpira em: ${Math.floor(timeToExpiry / 60)} minutos\nStatus: ${isExpired ? 'EXPIRADO' : 'VÁLIDO'}`
        );
        
        console.log('📊 Token details:', {
          userId: payload.userId,
          email: payload.email,
          isExpired,
          timeToExpiry: Math.floor(timeToExpiry / 60) + ' minutos'
        });
        
      } catch (e) {
        Alert.alert("❌ Erro", "Token inválido ou corrompido");
      }
      
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      Alert.alert("❌ Erro", "Erro ao acessar AsyncStorage");
    }
  }

  // Teste 2: Criar venda via API direta
  async function testCreateSaleAPI() {
    console.log('💰 === TESTE DIRETO API VENDAS ===');
    setLoading(true);
    
    try {
      const token = await AsyncStorage.getItem('@AuthToken');
      if (!token) {
        Alert.alert("❌ Erro", "Token não encontrado");
        return;
      }

      const testData = {
        clientName: `Cliente Teste ${new Date().getTime()}`,
        phone: '11999999999',
        address: 'Rua de Teste, 123'
      };

      console.log('📤 Enviando:', testData);

      const response = await fetch('http://192.168.3.7:3333/api/sales/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });

      console.log('📊 Status:', response.status);
      const responseText = await response.text();
      console.log('📄 Resposta:', responseText);

      if (response.ok) {
        const jsonData = JSON.parse(responseText);
        Alert.alert("✅ Sucesso!", `Venda criada via API!\n\nID: ${jsonData.data.id}\nCliente: ${jsonData.data.clientName}`);
      } else {
        Alert.alert("❌ Falhou", `Status ${response.status}\n\nResposta: ${responseText}`);
      }

    } catch (error) {
      console.error('❌ Erro no teste:', error);
      Alert.alert("❌ Erro", `Erro na requisição: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  // Teste 3: Listar vendas
  async function testListSales() {
    console.log('📋 === TESTE LISTAGEM VENDAS ===');
    setLoading(true);
    
    try {
      const result = await saleService.getSales({ 
        status: 'open',
        page: 1,
        limit: 10
      });

      console.log('📊 Resultado:', result);

      if (result.success && result.data) {
        const salesInfo = result.data.map(sale => 
          `• ${sale.clientName} - R$ ${sale.totalValue.toFixed(2)}`
        ).join('\n');
        
        Alert.alert(
          "✅ Sucesso!", 
          `${result.data.length} vendas encontradas:\n\n${salesInfo || 'Nenhuma venda com detalhes'}`
        );
      } else {
        Alert.alert("⚠️ Info", result.message || "Nenhuma venda encontrada");
      }

    } catch (error) {
      console.error('❌ Erro listagem:', error);
      Alert.alert("❌ Erro", `Erro na listagem: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  // Teste 4: Rota sem auth (para verificar se servidor está funcionando)
  async function testBasicRoute() {
    console.log('🔧 === TESTE ROTA BÁSICA ===');
    setLoading(true);
    
    try {
      const response = await fetch('http://192.168.3.7:3333/api/sales/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: true })
      });

      const responseText = await response.text();
      console.log('📊 Status:', response.status);
      console.log('📄 Resposta:', responseText);

      if (response.ok) {
        Alert.alert("✅ Servidor OK", "Rota básica funcionando!\n\nServidor está respondendo corretamente.");
      } else {
        Alert.alert("❌ Problema", `Status ${response.status}\n${responseText}`);
      }

    } catch (error) {
      console.error('❌ Erro conexão:', error);
      Alert.alert("❌ Conexão", `Erro de rede: ${error.message}\n\nVerifique se o servidor está rodando.`);
    } finally {
      setLoading(false);
    }
  }

  function handleAddPieces() {
    if (saleId) {
      router.push(`/inventory?saleId=${saleId}`);
    } else {
      Alert.alert("Erro", "Primeiro, salve os dados da venda.");
    }
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 46,
        backgroundColor: colors.page.daffodils,
        paddingHorizontal: 18,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          fontFamily: fonts.bold,
          marginBottom: 20,
        }}
      >
        Criar Nova Venda
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Formulário */}
        <Controller
          control={control}
          name="clientName"
          rules={{ required: "O nome do cliente é obrigatório." }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Cliente"
              placeholder="Digite o nome do cliente"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors.clientName?.message}
              editable={!loading && !isSaleSaved}
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          rules={{ required: "O telefone é obrigatório." }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Telefone"
              placeholder="Digite o telefone"
              keyboardType="phone-pad"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors.phone?.message}
              editable={!loading && !isSaleSaved}
            />
          )}
        />

        <Controller
          control={control}
          name="address"
          rules={{ required: "O endereço é obrigatório." }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Endereço"
              placeholder="Digite o endereço"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors.address?.message}
              editable={!loading && !isSaleSaved}
            />
          )}
        />

        {/* Botões principais */}
        <ActionButton
          label={loading ? "Salvando..." : "Salvar Venda"}
          onPress={handleSubmit(onSubmit)}
          color={colors.page.tulips}
          disabled={loading || isSaleSaved}
        />

        {isSaleSaved && (
          <ActionButton
            label="Adicionar Peças"
            onPress={handleAddPieces}
            color={colors.page.dragonFruit}
            style={{ marginTop: 14 }}
            disabled={loading}
          />
        )}

        <ActionButton
          label="Voltar"
          onPress={() => router.back()}
          color={colors.page.dragonFruit}
          style={{ marginTop: 14}}
          disabled={loading}
        />

        {/* Toggle para mostrar/esconder testes */}
        <ActionButton
          label={showTests ? "🔧 Ocultar Testes" : "🔧 Mostrar Testes"}
          onPress={() => setShowTests(!showTests)}
          color="#666666"
          style={{ marginTop: 20 }}
        />

        {/* Área de testes */}
        {showTests && (
          <View style={{ marginTop: 20, padding: 16, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
              🧪 Área de Testes
            </Text>

            <ActionButton
              label="1️⃣ Verificar Token"
              onPress={testCurrentToken}
              color="#007AFF"
              style={{ marginBottom: 12 }}
              disabled={loading}
            />
            
            <ActionButton
              label="2️⃣ Teste Servidor Básico"
              onPress={testBasicRoute}
              color="#34C759"
              style={{ marginBottom: 12 }}
              disabled={loading}
            />
            
            <ActionButton
              label="3️⃣ Criar Venda (API Direta)"
              onPress={testCreateSaleAPI}
              color="#FF9500"
              style={{ marginBottom: 12 }}
              disabled={loading}
            />
            
            <ActionButton
              label="4️⃣ Listar Vendas"
              onPress={testListSales}
              color="#AF52DE"
              style={{ marginBottom: 12 }}
              disabled={loading}
            />

            <ActionButton
              label="🔍 Debug Completo"
              onPress={() => debugAuthComplete()}
              color="#FF3B30"
              disabled={loading}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}