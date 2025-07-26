import '../global.css';

import { Drawer } from 'expo-router/drawer';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Home',
          title: 'Overview',
        }}
      />
      <Drawer.Screen
        name="two" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Detalhes',
          title: 'Detalhes',
        }}
      />
      <Drawer.Screen
        name="modal"
        options={{
          drawerItemStyle: { height: 0 }, // Hide modal from drawer
        }}
      />
    </Drawer>
  );
}
