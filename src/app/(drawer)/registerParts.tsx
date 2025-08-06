import { View, Text } from "react-native";
import { colors } from '@/styles/colors';


export default function RegisterParts() {
  return (
    <View style={{ 
      flex: 1, 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: colors.white 
      }}
    >
      <Text>RegisterParts</Text>
    </View>
  )
}