import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: colors.page.tulips,
  },
  optionsWrapper: {
    marginTop: 20,
  },
  optionContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
  },
  optionText: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.regular,
  },
})