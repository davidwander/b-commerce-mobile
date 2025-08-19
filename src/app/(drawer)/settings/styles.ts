import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: colors.page.auburn,
  },
  optionsWrapper: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  categoryWrapper: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.black,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  optionContainer: {
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.italic,
    marginLeft: 10,
  },
});
