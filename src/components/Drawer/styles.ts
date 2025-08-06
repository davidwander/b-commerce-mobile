import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 44,
    backgroundColor: colors.black,
    alignItems: 'center',
    overflow: 'visible',
  },
  itemWrapper: {
    height: 80,
    justifyContent: 'center',
    width: '120%',
    overflow: 'visible',
    position: 'relative',
  },
  labelContainer: {
    transform: [{ rotate: '-90deg' }],
    paddingHorizontal: 12,
    paddingVertical: 16,
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
    minWidth: 100,
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