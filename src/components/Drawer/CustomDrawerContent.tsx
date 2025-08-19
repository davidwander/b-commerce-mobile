import React, { useRef, useEffect } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

import { colors } from '@/styles/colors';
import { styles } from './styles';

import type { DrawerContentComponentProps } from '@react-navigation/drawer';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { state, navigation } = props;
  const { routeNames } = state;

  const settingsRoute = "settings/index";
  const activeRoute = state.routeNames[state.index];

  const routeLabels: Record<string, string> = {
    dashboard: "Visão geral",
    sales: "Vendas",
    inventory: "Estoque",
    notifications: "Notificações",
    prices: "Precificar",
    otherExpenses: "Outros",
    [settingsRoute]: "Configurações", 
  };

  const routeBackgroundColors: Record<string, string> = {
    dashboard: colors.page.meadow,
    sales: colors.page.daffodils,
    inventory: colors.page.clearSky,
    notifications: colors.page.tulips,
    prices: colors.page.lavender,
    otherExpenses: colors.page.dragonFruit,
    [settingsRoute]: colors.page.auburn,
  };

  const normalizeRoute = (name: string) => {
    if (name.startsWith("inventory")) return "inventory";
    if (name.startsWith("dashboard")) return "dashboard";
    if (name.startsWith("notifications")) return "notifications";
    if (name.startsWith("otherExpenses")) return "otherExpenses";
    if (name.startsWith("prices")) return "prices";
    if (name.startsWith("settings")) return settingsRoute;
    return name;
  };

  // Rotas para animação: settings no final
  const allRoutes = routeNames
    .filter((name) => name !== settingsRoute)
    .concat(settingsRoute);

  const animatedWidths = useRef<Record<string, Animated.Value>>(
    Object.fromEntries(
      allRoutes.map((r) => [
        r,
        new Animated.Value(r === activeRoute ? 140 : 98),
      ])
    )
  ).current;

  useEffect(() => {
    allRoutes.forEach((name) => {
      Animated.timing(animatedWidths[name], {
        toValue: name === activeRoute ? 140 : 98,
        duration: 400,
        useNativeDriver: false,
      }).start();
    });
  }, [activeRoute]);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, paddingTop: 12 }}
    >
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        {/* Rotas principais */}
        <View>
          {routeNames
            .filter((name) => name !== settingsRoute)
            .map((name) => {
              const isFocused = activeRoute === name;
              const normalizedName = normalizeRoute(name);

              return (
                <TouchableOpacity
                  key={name}
                  onPress={() => navigation.navigate(name as never)}
                  style={[styles.itemWrapper, { zIndex: isFocused ? 2 : 1 }]}
                  accessibilityState={isFocused ? { selected: true } : {}}
                >
                  <Animated.View
                    style={[
                      styles.labelContainer,
                      {
                        backgroundColor:
                          routeBackgroundColors[normalizedName] || "#fff",
                        width: animatedWidths[name],
                      },
                      isFocused && styles.labelActiveContainer,
                    ]}
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[
                        styles.labelText,
                        isFocused ? styles.activeText : styles.labelText,
                      ]}
                    >
                      {routeLabels[normalizedName] ?? normalizedName}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
        </View>

        {/* Settings fixo no fundo */}
        <View style={styles.settingsWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate(settingsRoute as never)}
            style={styles.itemWrapper}
          >
            <Animated.View
              style={[
                styles.labelContainer,
                {
                  backgroundColor: routeBackgroundColors[settingsRoute],
                  width: animatedWidths[settingsRoute],
                },
                activeRoute === settingsRoute && styles.labelActiveContainer,
              ]}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.labelText,
                  activeRoute === settingsRoute
                    ? styles.activeText
                    : styles.labelText,
                ]}
              >
                {routeLabels[settingsRoute]}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
