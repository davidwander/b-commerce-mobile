import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 30, 
    backgroundColor: colors.page.lavender,
  },
  containerContent: {
    flex: 1, 
    paddingHorizontal: 16, 
    paddingTop: 10,
  },
  card: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  modalContainer: {
    width: "90%",
    maxHeight: 350,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: "hidden",
  },
  scrollContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: fonts.italic,
    marginBottom: 20,
    textAlign: "center",
  },
  resultText: {
    fontSize: 18,
    fontFamily: fonts.italic,
    marginBottom: 20,
    textAlign: "center",
  },
  footer: {
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.page.clearSky,
  },
  closeModal: {
    alignSelf: "flex-end",
    padding: 8,
    paddingBottom: 2
  },
})