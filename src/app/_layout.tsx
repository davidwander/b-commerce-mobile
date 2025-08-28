import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import '@/utils/calendarLocale';
import { LoadingProvider, useLoading } from '@/contexts/LoadingContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Loading from '@/components/Loading';

function AppStack() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    // usamos nosso componente de Loading aqui
    return <Loading visible message="Carregando aplicação..." />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" translucent={false} />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <AppStack />
      </LoadingProvider>
    </AuthProvider>
  );
}
