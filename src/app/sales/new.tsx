import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';

import { router } from 'expo-router';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

import { CustomInput } from '@/components/CustomInput';
import { useForm, Controller } from 'react-hook-form';
import { ActionButton } from '@/components/ActionButton';
import { saleService } from '@/services/saleService';

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

  const [loading, setLoading] = useState(false); // Estado de loading
  const [saleId, setSaleId] = useState<string | null>(null); // Estado para armazenar o ID da venda
  const [isSaleSaved, setIsSaleSaved] = useState(false); // Estado para indicar se a venda foi salva

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      const result = await saleService.createSale(data);
      if (result.success && result.data) {
        setSaleId(result.data.id);
        setIsSaleSaved(true);
        Alert.alert("Sucesso!", result.message);
      } else {
        Alert.alert("Erro", result.message);
      }
    } catch (error) {
      console.error("Erro ao criar venda:", error);
      Alert.alert("Erro", "Ocorreu um erro inesperado ao criar a venda.");
    } finally {
      setLoading(false);
    }
  }

  function handleAddPieces() {
    if (saleId) {
      router.push(`/inventory?saleId=${saleId}`); // Navega para o inventário passando o saleId
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
          disabled={loading || isSaleSaved} // Desabilita o botão enquanto estiver carregando ou se a venda já foi salva
        />

        {isSaleSaved && (
          <ActionButton
            label="Adicionar Peças"
            onPress={handleAddPieces}
            color={colors.page.dragonFruit}
            style={{ marginTop: 14 }}
            disabled={loading} // Desabilita enquanto estiver carregando
          />
        )}

        <ActionButton
          label="Voltar"
          onPress={() => router.back()}
          color={colors.page.dragonFruit}
          style={{ marginTop: 14}}
          disabled={loading} // Desabilita o botão enquanto estiver carregando
        />

      </ScrollView>
    </View>
  );
}
