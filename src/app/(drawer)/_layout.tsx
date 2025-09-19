import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/Drawer/CustomDrawerContent';
import { colors } from '@/styles/colors';
import { Header } from '@/components/Header'; // Import the Header component

import { RequireAuth } from '@/components/RequireAuth';

export default function DrawerLayout() {
  return (
    <RequireAuth>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true, // Show the header
          header: ({ navigation, route, options }) => ( // Render the custom Header component
            <Header />
          ),
          drawerType: "slide",
          overlayColor: "transparent",
          drawerStyle: {
            backgroundColor: colors.black,
            width: 47,
            borderRightWidth: 0,
            elevation: 5,
            shadowColor: "transparent",
          },
        }}
      />
    </RequireAuth>
  );
}
