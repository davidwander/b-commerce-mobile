import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
  Alert,
} from 'react-native';
import { styles } from './_styles';

import { useForm, Controller } from 'react-hook-form';

import { colors } from '@/styles/colors';
import { Header } from '@/components/Header';
import { CustomInput } from '@/components/CustomInput';
import { ActionButton } from '@/components/ActionButton';
import { FontAwesome } from '@expo/vector-icons';
import { PieceCard } from '@/components/PieceCard'; // Importar PieceCard
import { PartLeaf, partsTree, PartNode } from '@/data/partsTree'; // Importar partsTree e PartNode
import { useInventory } from '@/hook/useInventory'; // Importar useInventory
import Feather from '@expo/vector-icons/Feather';


export default function Prices() {
  const [selectedPart, setSelectedPart] = useState<PartLeaf | null>(null); // Atualizar tipo
  const [modalVisible, setModalVisible] = useState(false);
  const [priceSale, setPriceSale] = useState("");
  const [inventoryPieces, setInventoryPieces] = useState<PartLeaf[]>([]); // Estado para peças do estoque
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  const { getAllPieces, updatePiecePrice } = useInventory(); // Usar hook useInventory e a nova função

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

  useFocusEffect(
    useCallback(() => {
    async function loadPieces() {
      setIsLoading(true);
      const result = await getAllPieces();
      if (result.success && result.data) {
          // Filtra as peças para mostrar apenas aquelas com preço 0.00 (não precificadas)
          const unpricedPieces = result.data.filter(piece => !piece.price || piece.price === 0);
          setInventoryPieces(unpricedPieces);
      }
      setIsLoading(false);
    }
    loadPieces();
      return () => { /* optional cleanup */ };
    }, [getAllPieces])
  );

  useEffect(() => {
    const costNum = parseFloat((watchCost || "").replace(",", ".")) || 0;
    const marginNum = parseFloat((watchMargin || "").replace(",", ".")) || 0;
    const sale = costNum + costNum * (marginNum / 100);
    setPriceSale(sale ? sale.toFixed(2) : "");
  }, [watchCost, watchMargin]);

  function openModal(part: PartLeaf) {
    setSelectedPart(part);
    setModalVisible(true);
    reset({ cost: part.price ? part.price.toFixed(2).replace('.', ',') : "", margin: "" }); // Inicializar custo com o preço atual da peça
    setPriceSale(part.price ? part.price.toFixed(2).replace('.', ',') : ""); // Inicializar priceSale
  }

  const onSubmit = async () => {
    if (!selectedPart || priceSale === "") {
      Alert.alert("Erro", "Não foi possível salvar o preço.");
      return;
    }

    setIsLoading(true);
    const result = await updatePiecePrice(selectedPart.id, { price: parseFloat(priceSale.replace(',', '.')) });
    setIsLoading(false);

    if (result.success) {
      Alert.alert("Sucesso", "Preço atualizado com sucesso!");
      // Remover a peça da lista localmente
      setInventoryPieces(prevPieces =>
        prevPieces.filter(p => p.id !== selectedPart.id) // Filtra a peça atualizada
      );
    setModalVisible(false);
      setSelectedPart(null);
      setPriceSale("");
    } else {
      Alert.alert("Erro", result.error || "Falha ao atualizar preço.");
    }
  };

  const onError = (errors: any) => {
    console.log("Erros do formulário:", errors);
  };

  function getCategoryNameById(id: string | undefined): string | undefined {
    if (!id) return undefined;

    // Função auxiliar para buscar o nó recursivamente
    const findNode = (nodes: Array<PartNode | PartLeaf>[]): PartNode | PartLeaf | undefined => {
      for (const level of nodes) {
        for (const node of level) {
          if (node.id === id) {
            return node;
          }
          if ('children' in node && node.children) {
            const foundInChild = findNode([node.children]); // Passa os filhos como um array de um único nível
            if (foundInChild) return foundInChild;
          }
        }
      }
      return undefined;
    };

    const foundNode = findNode([partsTree]); // Buscar a partir do topo da árvore
    return foundNode?.name;
  }

  return (
    <View style={styles.container}>

      <View style={styles.containerContent}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Carregando peças...</Text>
          </View>
        ) : inventoryPieces.length > 0 ? (
          <FlatList
            data={inventoryPieces} // Usar peças do estoque
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PieceCard
                key={item.id}
                piece={item}
                category={getCategoryNameById(item.categoryId) || 'Geral'} // Usar nome da categoria
                subcategory={getCategoryNameById(item.subcategoryId) || undefined} // Usar nome da subcategoria
                onPress={openModal}
              />
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <View style={styles.emptyListContent}>
            <Feather 
              name="package" 
              size={48} 
              color="#9aa0a6" 
              style={{ marginBottom: 8 }} 
            />
            <Text style={styles.emptyListText1}>
              Nenhuma peça cadastrada.
            </Text>
            <Text style={styles.emptyListText2}>
              Acesse o estoque e adicione uma peça para precificar.
            </Text>
          </View>
        )}
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
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeModal}
            >
              <FontAwesome name='close' size={20} />
            </TouchableOpacity>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <SafeAreaView style={{ width: "100%" }}>
                <Text style={styles.modalTitle}>
                  Precificar: {selectedPart?.name} {/* Usar .name */}
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
