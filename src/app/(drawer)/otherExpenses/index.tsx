import { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { styles } from './_styles';

import  Feather  from '@expo/vector-icons/Feather';
import { colors } from '@/styles/colors';
import { CustomInput } from '@/components/CustomInput';
import { Header } from '@/components/Header';
import { ActionButton } from '@/components/ActionButton';

type FormData = {
  description: string;
  amount: number;
};

type Expense = {
  id: string;
  description: string;
  amount: number;
};

export default function OtherExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      description: "",
      amount: "" as unknown as number
    }
  });

  function onSubmit(data: FormData) {
    const newExpense: Expense = {
      id: String(Date.now()),
      description: data.description,
      amount: Number(data.amount)
    };

    setExpenses((prev) => [...prev, newExpense]);
    reset();
  }

  const formatCurrency = (num: number) => {
    if (!num) return "";
    return num.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containerContent}>
        <Text style={styles.title}>
          Registrar outros gastos
        </Text>

        {/* Campo descrição */}
        <Controller
          control={control}
          name="description"
          rules={{ required: "Campo obrigatório" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Descrição"
              placeholder="Digite o gasto"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors.description?.message}
            />
          )}
        />

        {/* Campo valor */}
        <Controller
          control={control}
          name="amount"
          rules={{ required: "Campo obrigatório" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Custo"
              placeholder="Digite o valor"
              keyboardType="numeric"
              value={value ? formatCurrency(value) : ""}
              onBlur={onBlur}
              onChangeText={(text) => {
                const numericValue = parseInt(text.replace(/\D/g, ""), 10) / 100;
                onChange(isNaN(numericValue) ? "" : numericValue);
              }}
              error={errors.amount?.message}
            />
          )}
        />

        <ActionButton 
          label="Registrar"
          onPress={handleSubmit(onSubmit)}
          color={colors.black}
          style={{ marginHorizontal: 16, marginBottom: 16 }}
        />

        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View style={styles.listEmptyContent}>
              <Feather 
                name="wind"
                size={50}
                color={colors.page.clearSky}
                style={{ marginRight: 10, opacity: 0.5 }}
              />
              <Text style={styles.listEmptyText}>
                Nenhum gasto registrado.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.expenseItem}>
              <Text style={styles.expenseText}>{item.description}</Text>
              <Text style={styles.expenseValue}>{formatCurrency(item.amount)}</Text>
            </View>
          )}
          style={{ marginTop: 10 }}
        />
      </View>
    </View>
  );
}

