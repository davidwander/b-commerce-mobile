import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

import { useNavigation, DrawerActions, useNavigationState } from '@react-navigation/native';

const routeTitles: Record<string, string> = {
  dashboard: 'Visão geral',
  sales: 'Vendas',
  inventory: 'Estoque',
  notifications: 'Notificações',
  prices: 'Registrar preços',
  otherExpenses: 'Outros gastos',
};

const routeColors: Record<string, string> = {
  dashboard: colors.page.meadow,
  sales: colors.page.daffodils,
  inventory: colors.page.clearSky,
  notifications: colors.page.tulips,
  prices: colors.page.lavender,
  otherExpenses: colors.page.dragonFruit,
};

// Função para normalizar rotas que estão dentro de pastas
function normalizeRouteName(name: string) {
  if (!name) return 'dashboard';
  // Pega só a primeira parte antes de "/"
  return name.split('/')[0];
}

export function Header() {
  const navigation = useNavigation();
  const navigationState = useNavigationState(state => state);

  const rawRouteName = navigationState?.routes[navigationState.index]?.name || 'dashboard';
  const currentRoute = normalizeRouteName(rawRouteName);

  const backgroundColor = routeColors[currentRoute] || colors.black;
  const title = routeTitles[currentRoute] || currentRoute;

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor,
    }}>
      <Text style={{
        fontFamily: fonts.bold,
        fontSize: 26,
        color: '#fff',
      }}>
        {title}
      </Text>

      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Feather name="menu" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
