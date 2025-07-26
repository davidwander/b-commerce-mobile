import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Text, TouchableOpacity, View } from 'react-native';

export function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View className="items-center p-4">
        {props.state.routes.map((route: any, index: number) => {
          const { options } = props.descriptors[route.key];
          const isFocused = props.state.index === index;

          const label =
            options.drawerLabel !== undefined
              ? options.drawerLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          if (options.drawerItemStyle && options.drawerItemStyle.height === 0) {
            return null;
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => props.navigation.navigate(route.name)}
              className={`rounded-md ${isFocused ? 'bg-blue-500' : ''} my-1 flex justify-center items-center`}
              style={{ width: 100, height: 100 }} // Ajuste conforme necessário
            >
              <Text
                className={`${isFocused ? 'text-white' : 'text-black'} text-xs`}
                style={{ transform: [{ rotate: '-90deg' }] }} // Aplica a rotação de -90 graus para mudar o sentido da palavra
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
} 