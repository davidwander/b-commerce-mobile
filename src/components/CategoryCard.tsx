import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import categoryIcons from '@/utils/categoryIcons';

import { fonts } from '@/styles/fonts';
import { colors } from '@/styles/colors';

type CategoryCardProps = {
  name: string;
  quantity?: number;
  onPress?: () => void;
  disabled?: boolean;
};

export function CategoryCard({ name, quantity, onPress, disabled }: CategoryCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 12,
        marginBottom: 14,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        opacity: disabled ? 1 : 0.9,
        width: "100%", 
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Text style={{ fontSize: 28, marginRight: 12 }}>
          {categoryIcons[name] || "🧩"}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "700", color: colors.black }}>
          {name}
        </Text>
      </View>
      {quantity !== undefined && (
        <View
          style={{
            backgroundColor: colors.page.dragonFruit,
            width: 36,
            height: 36,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text 
            style={{ 
              color: colors.black, 
              fontFamily: fonts.italic, 
              fontSize: 16 
            }}
          >
            {quantity}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
