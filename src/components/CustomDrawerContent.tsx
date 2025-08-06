import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Text } from 'react-native';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { state, navigation } = props;
  const { routeNames, index: activeIndex } = state;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {routeNames.map((name, idx) => {
        const isFocused = activeIndex === idx;

        return (
          <DrawerItem
            key={name}
            label={() => (
              <Text
                style={{
                  transform: [{ rotate: '-90deg' }],
                  position: 'absolute',
                  left: -55,
                  top: '50%',
                  textAlign: 'center',
                  color: isFocused ? 'blue' : 'gray',
                  width: 100, 
                  height: 20,
                  overflow: 'visible',
                  
                }}
              >
                {name}
              </Text>
            )}
            onPress={() => {
              navigation.navigate(name as never);
            }}
            style={{ height: 100, justifyContent: 'center' }}
          />
        );
      })}
    </DrawerContentScrollView>
  );
}
