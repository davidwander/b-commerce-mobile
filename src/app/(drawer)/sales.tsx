import { View, Text } from "react-native";
import { colors } from '@/styles/colors';

import { Header } from '@/components/Header';

export default function Sales() {
  return (
    <View style={{ 
      flex: 1, 
      paddingTop: 30,
      backgroundColor: colors.page.daffodils
    }}>
      <Header />

      <View style={{ 
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <Text>Vendas</Text>
      </View>
    </View>
  );
}
