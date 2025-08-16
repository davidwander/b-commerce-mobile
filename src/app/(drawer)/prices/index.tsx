import { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { styles } from './styles';

import { useForm, Controller } from 'react-hook-form';

import { colors } from '@/styles/colors';
import { Header } from '@/components/Header';
import { CustomInput } from '@/components/CustomInput';
import { ActionButton } from '@/components/ActionButton';

// Mock de peças não precificadas
const mockParts = [
  { id: "1", nome: "Filtro de Óleo", categoria: "Motor" },
  { id: "2", nome: "Pastilha de Freio", categoria: "Freio" },
  { id: "3", nome: "Correia Dentada", categoria: "Transmissão" },
];

export default function Prices() {
  const [selectedPart, setSelectedPart] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [priceSale, setPriceSale] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { cost: "", margin: "" },
    mode: "onSubmit",
  });

  const watchCost = watch("cost");
  const watchMargin = watch("margin");

  useEffect(() => {
    const costNum = parseFloat((watchCost || "").replace(",", ".")) || 0;
    const marginNum = parseFloat((watchMargin || "").replace(",", ".")) || 0;
    const sale = costNum + costNum * (marginNum / 100);
    setPriceSale(sale ? sale.toFixed(2) : "");
  }, [watchCost, watchMargin]);

  function openModal(part: any) {
    setSelectedPart(part);
    setModalVisible(true);
    reset({ cost: "", margin: "" });
    setPriceSale("");
  }

  const onSubmit = (data: any) => {
    setModalVisible(false);
  };

  const onError = (errors: any) => {
    console.log("Erros do formulário:", errors);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containerContent}>
        <FlatList
          data={mockParts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={styles.cardSubtitle}>{item.categoria}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      {/* Modal de precificação */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalOverlay}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <View style={styles.modalContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <SafeAreaView style={{ width: "100%" }}>
                <Text style={styles.modalTitle}>
                  Precificar: {selectedPart?.nome}
                </Text>

                {/* Controller para Valor de Custo */}
                <Controller
                  control={control}
                  name="cost"
                  rules={{ required: "O valor de custo é obrigatório" }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <CustomInput
                      label="Valor de custo"
                      placeholder="Digite o valor de custo"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={(text) => {
                        // Mantém texto limpo durante digitação
                        const numeric = text.replace(/[^\d,]/g, "");
                        onChange(numeric);
                      }}
                      onBlur={() => {
                        if (value) {
                          const num = parseFloat(value.replace(",", ".")) || 0;
                          onChange(num.toFixed(2).replace(".", ","));
                        }
                      }}
                      error={errors.cost?.message}
                    />
                  )}
                />

                {/* Controller para Margem */}
                <Controller
                  control={control}
                  name="margin"
                  rules={{ required: "A margem é obrigatória" }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <CustomInput
                      label="Margem (%)"
                      placeholder="Digite a margem de lucro"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={(text) => onChange(text.replace(/[^\d,]/g, ""))}
                      onBlur={onBlur}
                      error={errors.margin?.message}
                    />
                  )}
                />

                {priceSale !== "" && (
                  <Text style={styles.resultText}>
                    Preço de venda: R$ {priceSale}
                  </Text>
                )}
              </SafeAreaView>
            </ScrollView>

            {/* Footer fixo do botão */}
            <View style={styles.footer}>
              <ActionButton
                label="Salvar"
                onPress={handleSubmit(onSubmit, onError)}
                color={colors.page.lavender}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
