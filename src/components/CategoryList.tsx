import React from 'react';
import { FlatList, View } from 'react-native';
import { CategoryCard } from './CategoryCard';

type PartLeaf = {
  id: string;
  name: string;
  quantity: number;
};

type PartNode = {
  id: string;
  name: string;
  children?: Array<PartNode | PartLeaf>;
};

type CategoryListProps = {
  data: Array<PartNode | PartLeaf>;
  onItemPress: (item: PartNode) => void;
};

function isLeaf(item: PartNode | PartLeaf): item is PartLeaf {
  return (item as PartLeaf).quantity !== undefined;
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
              quantity={isLeaf(item) ? item.quantity : undefined}
              disabled={isLeaf(item)}
              onPress={() => !isLeaf(item) && onItemPress(item)}
            />
          </View>
        );
      }}
    />
  );
}
