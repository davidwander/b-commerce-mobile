import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity } from 'react-native';

import type { DrawerContentComponentProps } from '@react-navigation/drawer';

import { styles } from './styles';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { state, navigation } = props;
  const { routeNames, index: activeIndex } = state;

  const routeLabels: Record<string, string> = {
    dashboard: 'Visão geral',
    sales: 'Nova venda',
    inventory: 'Estoque',
    notifications: 'Notificações',
    registerParts: 'Adicionar',
  };

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
                isFocused && styles.labelActiveContainer,
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


