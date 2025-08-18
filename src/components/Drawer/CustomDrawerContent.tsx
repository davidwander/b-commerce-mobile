import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View, Text, TouchableOpacity } from "react-native";

import { colors } from "@/styles/colors";
import { styles } from "./styles";

import type { DrawerContentComponentProps } from "@react-navigation/drawer";

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { state, navigation } = props;
  const { routeNames } = state;

  const routeLabels: Record<string, string> = {
    dashboard: "Visão geral",
    sales: "Vendas",
    inventory: "Estoque",
    notifications: "Notificações",
    prices: "Precificar",
    otherExpenses: "Outros",
    settings: "Configurações",
  };

  const routeBackgroundColors: Record<string, string> = {
    dashboard: colors.page.meadow,
    sales: colors.page.daffodils,
    inventory: colors.page.clearSky,
    notifications: colors.page.tulips,
    prices: colors.page.lavender,
    otherExpenses: colors.page.dragonFruit,
    settings: colors.page.tulips,
  };

  const normalizeRoute = (name: string) => {
    if (name.startsWith("inventory")) return "inventory";
    if (name.startsWith("dashboard")) return "dashboard";
    if (name.startsWith("notifications")) return "notifications";
    if (name.startsWith("otherExpenses")) return "otherExpenses";
    if (name.startsWith("prices")) return "prices";
    return name;
  };

  const settingsRoute = "settings";
  const activeRoute = state.routeNames[state.index];

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
                  <View
                    style={[
                      styles.labelContainer,
                      { backgroundColor: routeBackgroundColors[normalizedName] || "#fff" },
                      isFocused && styles.labelActiveContainer,
                    ]}
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[styles.labelText, isFocused ? styles.activeText : styles.labelText]}
                    >
                      {routeLabels[normalizedName] ?? normalizedName}
                    </Text>
                  </View>
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
            <View
              style={[
                styles.labelContainer,
                { backgroundColor: routeBackgroundColors.settings },
                activeRoute === settingsRoute && styles.labelActiveContainer,
              ]}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.labelText,
                  activeRoute === settingsRoute ? styles.activeText : styles.labelText,
                ]}
              >
                {routeLabels.settings}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
