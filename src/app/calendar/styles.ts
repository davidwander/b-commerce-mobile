import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: colors.page.tulips,
    alignItems: "center",
  },
  calendarWrapper: {
    width: "100%",
    backgroundColor: colors.page.tulips,
    padding: 4,
  },
  details: {
    marginTop: 16,
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dateText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    marginBottom: 6,
  },
  eventText: {
    fontSize: 16,
    fontFamily: fonts.italic,
    color: "#555",
  },
  info: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 16,
    fontFamily: fonts.italic,
    color: colors.white,
  },
  
})