import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 30, 
    backgroundColor: colors.page.dragonFruit,
  },
  containerContent: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.bold,
    marginBottom: 12,
    color: colors.white,
  },
  listEmptyContent: {
    alignItems: "center", 
    marginTop: 20,
  },
  listEmptyText: {
    color: colors.white, 
    textAlign: "center",
    fontFamily: fonts.italic,
    fontSize: 18,
    marginTop: 20 ,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    alignItems: "center",
  },
  expenseText: {
    color: colors.white,
    fontFamily: fonts.italic,
    fontSize: 19,
  },
  expenseValue: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 19,
  },
})