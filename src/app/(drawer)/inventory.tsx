import { View, Text } from "react-native";
import { colors } from '@/styles/colors';

import { Header } from '@/components/Header';

export default function Inventory() {
  return (
    <View style={{ 
      flex: 1, 
      paddingTop: 30,
      backgroundColor: colors.page.clearSky 
    }}>
      <Header />

      <View style={{ 
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <Text>Estoque</Text>
      </View>
    </View>
  );
}
