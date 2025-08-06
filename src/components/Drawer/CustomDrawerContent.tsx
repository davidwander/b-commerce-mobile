import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '@/styles/colors';

import type { DrawerContentComponentProps } from '@react-navigation/drawer';

import { styles } from './styles';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { state, navigation } = props;
  const { routeNames, index: activeIndex } = state;

  const routeLabels: Record<string, string> = {
    dashboard: 'Visão geral',
    sales: 'Vendas',
    inventory: 'Estoque',
    notifications: 'Notificações',
    registerParts: 'Adicionar',
  };

  const routeBackgroundColors: Record<string, string> = {
    dashboard: colors.page.meadow,
    sales: colors.page.daffodils,
    inventory: colors.page.clearSky,
    notifications: colors.page.tulips,
    registerParts: colors.page.lavender

  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {routeNames.map((name, idx) => {
        const isFocused = activeIndex === idx;

        return (
          <TouchableOpacity
            key={name}
            onPress={() => navigation.navigate(name as never)}
            style={[
              styles.itemWrapper,
              { zIndex: isFocused ? 2 : 1 }, // ← AQUI: zIndex dinâmico
            ]}
            accessibilityState={isFocused ? { selected: true } : {}}
          >
            <View
              style={[
                styles.labelContainer,
                isFocused && {
                  ...styles.labelActiveContainer,
                  backgroundColor: routeBackgroundColors[name] || '#fff',
                },
              ]}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.labelText,
                  isFocused ? styles.activeText : styles.inactiveText,
                ]}
              >
                {routeLabels[name] ?? name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </DrawerContentScrollView>
  );
}


