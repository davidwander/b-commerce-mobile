import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { colors } from '@/styles/colors';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { state, navigation } = props;
  const { routeNames, index: activeIndex } = state;

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {routeNames.map((name, idx) => {
        const isFocused = activeIndex === idx;

        return (
          <TouchableOpacity
            key={name}
            onPress={() => navigation.navigate(name as never)}
            style={styles.itemWrapper}
            accessibilityState={isFocused ? { selected: true } : {}}
          >
            <View
              style={[
                styles.labelContainer,
                isFocused && styles.labelActiveContainer,
              ]}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.labelText,
                  isFocused ? styles.activeText : styles.inactiveText,
                ]}
              >
                {name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 6,
    backgroundColor: colors.black, 
    alignItems: 'center',
  },
  itemWrapper: {
    height: 80,
    justifyContent: 'center',
    width: '120%',
  },
  labelContainer: {
    transform: [{ rotate: '-90deg' }],
    paddingHorizontal: 12,
    paddingVertical: 16,
    paddingBottom: 16,
    borderRadius: 8,
    minWidth: 90,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  labelActiveContainer: {
    backgroundColor: '#fff', 
    marginLeft: 12,
    marginRight: 6,
    paddingHorizontal: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  labelText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  activeText: {
    color: '#111',
  },
  inactiveText: {
    color: '#888',
  },
});
