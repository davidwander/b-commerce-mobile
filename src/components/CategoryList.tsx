import React from 'react';
import { FlatList, View } from 'react-native';
import { CategoryCard } from './CategoryCard';

type PartLeaf = {
  id: string;
  name: string;
  quantity?: number;
};

type PartNode = {
  id: string;
  name: string;
  children?: Array<PartNode | PartLeaf>;
};

type CategoryListProps = {
  data: Array<PartNode | PartLeaf>;
  onItemPress: (item: PartNode | PartLeaf) => void; // ✅ Aceitar também PartLeaf
};

// ✅ CORREÇÃO: Verificar se é folha baseado na ausência de children
function isLeaf(item: PartNode | PartLeaf): item is PartLeaf {
  return !('children' in item) || !item.children || item.children.length === 0;
}

export function CategoryList({ data, onItemPress }: CategoryListProps) {
  const isOdd = data.length % 2 !== 0;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      numColumns={2}
      renderItem={({ item, index }) => {
        const isLastOddItem = isOdd && index === data.length - 1;
        const itemIsLeaf = isLeaf(item);

        console.log('🎯 CategoryList renderizando:', {
          name: item.name,
          isLeaf: itemIsLeaf,
          hasChildren: 'children' in item ? !!item.children : false,
          childrenLength: 'children' in item ? (item.children?.length || 0) : 0
        });

        return (
          <View
            style={{
              flex: 1,
              maxWidth: "48%",
              marginHorizontal: 8,
              ...(isLastOddItem && { marginLeft: "26%", marginRight: "26%" }),
            }}
          >
            <CategoryCard
              name={item.name}
              quantity={itemIsLeaf && 'quantity' in item ? item.quantity : undefined}
              disabled={false} // ✅ Remover disabled para permitir clique em gêneros
              onPress={() => onItemPress(item)} // ✅ Permitir clique em qualquer item
            />
          </View>
        );
      }}
    />
  );
}