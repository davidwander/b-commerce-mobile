import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/Drawer/CustomDrawerContent';

import { colors } from '@/styles/colors';

export default function DrawerLayout() {
  return (
    <Drawer 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        overlayColor: 'transparent',
        drawerStyle: {
          backgroundColor: colors.black,
          width: 47, 
          borderRightWidth: 0,
          elevation: 5,
          shadowColor: 'transparent'
        },
      }}
    />
  );
}
