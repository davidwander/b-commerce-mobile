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
      </ScrollView>
    </View>
  );
}