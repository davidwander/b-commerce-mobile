import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity } from 'react-native';

import { colors } from '@/styles/colors';
import { styles } from './styles';

import type { DrawerContentComponentProps } from '@react-navigation/drawer';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { state, navigation } = props;
  const { routeNames, index: activeIndex } = state;

  const routeLabels: Record<string, string> = {
    dashboard: 'Visão geral',
    sales: 'Vendas',
    inventory: 'Estoque',
    notifications: 'Notificações',
    prices: 'Precificar',
    otherExpenses: 'Outros'
  };

  const routeBackgroundColors: Record<string, string> = {
    dashboard: colors.page.meadow,
    sales: colors.page.daffodils,
    inventory: colors.page.clearSky,
    notifications: colors.page.tulips,
    prices: colors.page.lavender,
    otherExpenses: colors.page.dragonFruit,
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
              { zIndex: isFocused ? 2 : 1 },
            ]}
            accessibilityState={isFocused ? { selected: true } : {}}
          >
            <View
              style={[
                styles.labelContainer,
                
                 { backgroundColor: routeBackgroundColors[name] || '#fff',
                },
                  isFocused && styles.labelActiveContainer,
              ]}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.labelText,
                  isFocused ? styles.activeText : styles.activeText,
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


