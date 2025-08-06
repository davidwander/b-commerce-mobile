import { View, Text } from "react-native";
import { colors } from '@/styles/colors';


export default function Inventory() {
  return (
    <View style={{ 
      flex: 1, 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: colors.page.clearSky 
      }}
    >
      <Text>Estoque</Text>
    </View>
  )
}