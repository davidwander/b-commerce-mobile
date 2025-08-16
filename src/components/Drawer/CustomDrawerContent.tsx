import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View, Text, TouchableOpacity } from "react-native";

import { colors } from "@/styles/colors";
import { styles } from "./styles";

import type { DrawerContentComponentProps } from "@react-navigation/drawer";

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { state, navigation } = props;
  const { routeNames, index: activeIndex } = state;

  // Labels para cada rota
  const routeLabels: Record<string, string> = {
    dashboard: "Visão geral",
    sales: "Vendas",
    inventory: "Estoque",
    notifications: "Notificações",
    prices: "Precificar",
    otherExpenses: "Outros",
    settings: "Configurações", // novo
  };

  // Cores de fundo para cada rota
  const routeBackgroundColors: Record<string, string> = {
    dashboard: colors.page.meadow,
    sales: colors.page.daffodils,
    inventory: colors.page.clearSky,
    notifications: colors.page.tulips,
    prices: colors.page.lavender,
    otherExpenses: colors.page.dragonFruit,
    settings: colors.page.tulips, // cor pro settings
  };

  // Normalização de rotas dinâmicas
  const normalizeRoute = (name: string) => {
    if (name.startsWith("inventory")) return "inventory";
    if (name.startsWith("dashboard")) return "dashboard";
    if (name.startsWith("notifications")) return "notifications";
    if (name.startsWith("otherExpenses")) return "otherExpenses";
    if (name.startsWith("prices")) return "prices";
    return name;
  };

  const settingsRoute = "settings";

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        {/* Rotas normais em cima */}
        <View>
          {routeNames
            .filter((name) => name !== settingsRoute)
            .map((name, idx) => {
              const isFocused = activeIndex === idx;
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
                      {
                        backgroundColor:
                          routeBackgroundColors[normalizedName] || "#fff",
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
                      {routeLabels[normalizedName] ?? normalizedName}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>

        {/* Rota de settings embaixo */}
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate(settingsRoute as never)}
            style={[styles.itemWrapper, { zIndex: 1 }]}
          >
            <View
              style={[
                styles.labelContainer,
                { backgroundColor: routeBackgroundColors.settings },
              ]}
            >
              <Text style={[styles.labelText, styles.activeText]}>
                {routeLabels.settings}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
