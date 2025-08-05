import { View, Text } from "react-native";
import { colors } from '@/styles/colors';

export default function Home() {
  return (
    <View style={{ 
      flex: 1, 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: "#f3f3f3" 
      }}
    >
      <Text>Home</Text>
    </View>
  )
}