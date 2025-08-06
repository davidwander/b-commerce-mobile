import { Stack } from 'expo-router';
import { StatusBar, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { 
  useFonts,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <View><Text>Carregando...</Text></View>;
  }

  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle="light-content"              
        translucent={false}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
