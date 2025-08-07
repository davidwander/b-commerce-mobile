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
        drawerStyle: {
          backgroundColor: colors.black,
          width: 45, 
          borderRightWidth: 0,
          elevation: 0,
          shadowColor: 'transparent'
        },
      }}
    />
  );
}
