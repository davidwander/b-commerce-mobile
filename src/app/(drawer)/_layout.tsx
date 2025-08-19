import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "@/components/Drawer/CustomDrawerContent";
import { colors } from "@/styles/colors";

import { RequireAuth } from "@/components/RequireAuth";

export default function DrawerLayout() {
  return (
    <RequireAuth>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
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
