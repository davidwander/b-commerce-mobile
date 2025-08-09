import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { CustomInput } from "@/components/CustomInput";
import { useForm, Controller } from "react-hook-form";

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

  function onSubmit(data: FormData) {
    console.log("Dados do formulário:", data);
    // Aqui você pode fazer a navegação ou salvar os dados
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 46,
        backgroundColor: colors.page.daffodils,
        paddingHorizontal: 16,
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
            />
          )}
        />

        <TouchableOpacity
          style={{
            backgroundColor: colors.page.tulips,
            padding: 14,
            borderRadius: 5,
            marginTop: 10,
          }}
          onPress={handleSubmit(onSubmit)}
        >
          <Text
            style={{
              textAlign: "center",
              color: colors.white,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Adicionar peças
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: colors.page.dragonFruit,
            padding: 14,
            borderRadius: 5,
            marginTop: 10,
          }}
          onPress={() => router.back()}
        >
          <Text
            style={{
              textAlign: "center",
              color: colors.white,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Voltar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
