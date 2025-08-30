import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
import { CustomInput } from '@/components/CustomInput';
import { useForm, Controller } from 'react-hook-form';
import { ActionButton } from '@/components/ActionButton';
import { saleService } from '@/services/saleService';
import { debugAuthComplete, quickTokenCheck } from '@/utils/debugTokens'; // Import do seu debug
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

  // Função para debug manual
  async function handleDebug() {
    console.log('🧪 Executando debug manual...');
    await debugAuthComplete();
  }

  // Teste específico de criação de venda
  async function testSaleAPI() {
    console.log('💰 === TESTE DA API DE VENDAS ===');
    
    try {
      const token = await AsyncStorage.getItem('@AuthToken');
      if (!token) {
        console.log('❌ Token não encontrado');
        return;
      }

      const testData = {
        clientName: 'Cliente Teste API',
        phone: '11999999999',
        address: 'Rua Teste, 456'
      };

      console.log('📦 Dados de teste:', testData);

      const response = await fetch('http://192.168.3.7:3333/api/sales', {
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
        console.log('✅ TESTE DE VENDA: SUCESSO!');
        Alert.alert("Sucesso!", "Venda de teste criada com sucesso!");
      } else {
        console.log('❌ TESTE DE VENDA: FALHOU');
        Alert.alert("Erro", `Falha no teste: ${responseText}`);
      }

    } catch (error) {
      console.error('❌ Erro no teste:', error);
      Alert.alert("Erro", "Erro durante o teste da API");
    }
    
    console.log('💰 === FIM TESTE VENDAS ===');
  }

  // Teste da rota sem autenticação
  async function testSaleNoAuth() {
    console.log('🧪 === TESTE ROTA SEM AUTH ===');
    
    try {
      const testData = {
        clientName: 'Teste Sem Auth',
        phone: '11888888888',
        address: 'Rua Sem Auth, 123'
      };

      const response = await fetch('http://192.168.3.7:3333/api/sales/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });

      console.log('📊 Status:', response.status);
      
      const responseText = await response.text();
      console.log('📄 Resposta:', responseText);

      if (response.ok) {
        console.log('✅ ROTA SEM AUTH: FUNCIONA!');
        Alert.alert("Sucesso!", "Rota de vendas básica está funcionando!");
      } else {
        console.log('❌ ROTA SEM AUTH: PROBLEMA');
        Alert.alert("Erro", `Problema na rota: ${responseText}`);
      }

    } catch (error) {
      console.error('❌ Erro no teste sem auth:', error);
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
        {/* Cliente */}
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

        {/* Telefone */}
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

        {/* Endereço */}
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

        {/* Botões de debug temporários - remover depois */}
        <ActionButton
          label="🧪 Debug Completo"
          onPress={handleDebug}
          color="#ff9500"
          style={{ marginTop: 14}}
          disabled={loading}
        />
        
        <ActionButton
          label="💰 Teste API Vendas"
          onPress={testSaleAPI}
          color="#ff0000"
          style={{ marginTop: 14}}
          disabled={loading}
        />
        
        <ActionButton
          label="🔓 Teste Sem Auth"
          onPress={testSaleNoAuth}
          color="#9900ff"
          style={{ marginTop: 14}}
          disabled={loading}
        />
      </ScrollView>
    </View>
  );
}