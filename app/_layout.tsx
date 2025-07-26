import '../global.css';

import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CustomDrawerContent } from '../components/CustomDrawerContent';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerType: 'permanent',
          drawerStyle: { width: 40 },
        }}
      >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Overview',
            headerShown: false, // Remover cabeçalho
          }}
        />
        <Drawer.Screen
          name="two" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Detalhes',
            title: 'Detalhes',
            headerShown: false, // Remover cabeçalho
          }}
        />
        <Drawer.Screen
          name="modal"
          options={{
            drawerItemStyle: { height: 0 }, // Hide modal from drawer
            headerShown: false, // Remover cabeçalho
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
