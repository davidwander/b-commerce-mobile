import { View, Text } from "react-native";
import { colors } from '@/styles/colors';


export default function Inventory() {
  return (
    <View style={{ 
      flex: 1, 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: "#fff" 
      }}
    >
      <Text>Inventory</Text>
    </View>
  )
}