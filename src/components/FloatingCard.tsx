import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

import { colors } from '@/styles/colors';

type FloatingCardProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function FloatingCard({ children, style }: FloatingCardProps) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.page.daffodils,
    padding: 16,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
