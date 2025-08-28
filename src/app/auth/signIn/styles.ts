import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.page.yellow,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    textAlign: "center",
    fontSize: 38,
    fontWeight: "900",
    fontFamily: fonts.italic,
    marginTop: -60,
  },
  subTitle: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 40,
    textAlign: "center",
  },

  button: {
    backgroundColor: colors.black,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  linkText: {
    color: colors.black,
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    fontFamily: fonts.italic,
  },
});
