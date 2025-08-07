import { View, Text } from "react-native";
import { colors } from '@/styles/colors';

import { Header } from '@/components/Header';

export default function OtherExpenses() {
  return (
    <View style={{ 
      flex: 1, 
      paddingTop: 30,
      backgroundColor: colors.page.dragonFruit 
    }}>
      <Header />

      <View style={{ 
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <Text>Outros gastos</Text>
      </View>
    </View>
  );
}
