import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

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
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    minWidth: 98,
    alignSelf: 'center',
  },
  labelActiveContainer: {
    marginLeft: 12,
    marginRight: 6,
    paddingHorizontal: 10,
    alignSelf: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  labelText: {
    fontFamily: fonts.regular,
    fontWeight: '300',
    textAlign: 'center',
    color: colors.black,
  },
  activeText: {
    color: colors.black,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  settingsWrapper: {
    borderTopWidth: 2,
    borderTopColor: 'rgba(255, 255, 255, 0.6)', // linha sutil
    paddingTop: 14,
    height: 75,
  },
});
