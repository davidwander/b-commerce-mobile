import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 30, 
    backgroundColor: colors.page.clearSky
  },
  buttonBack: {
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.page.tulips,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  buttonBackText: {
    color: colors.white, 
    fontFamily: fonts.bold,
  },
  emptyListContent: {
    alignItems: "center", 
    justifyContent: "center", 
    padding: 24,
  },
  emptyListText1: {
    color: colors.black, 
    fontFamily: fonts.italic,
    fontSize: 18,
    opacity: 0.7,
    textAlign: "center" 
  },
  emptyListText2: {
    color: colors.black, 
    opacity: 0.7, 
    textAlign: "center", 
    marginTop: 6,
    fontSize: 16, 
  }
})