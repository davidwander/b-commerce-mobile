import { StyleSheet } from "react-native";
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 16,
    maxHeight: '80%',
  },
  backButton: {
    marginBottom: 12
  },
  backButtonText: {
    fontFamily: fonts.bold, 
    color: colors.page.dragonFruit,
    fontSize: 18,
  },
  backText: {
    color: colors.page.tulips,
    fontWeight: "bold",
  },
  cancelButton: {
    paddingTop: 12,
    alignItems: 'center'
  },
  cancelText: {
    fontFamily: fonts.bold, 
    color: colors.black,
    fontSize: 18,
  },
  closeText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.page.tulips,
  },
  title: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: fonts.bold,
    textAlign: "center",
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.page.clearSky,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    fontSize: 18,
    fontFamily: fonts.italic,
  },
  inputContainer: {
    marginTop: 12, 
  },
  inputLabel: {
    fontFamily: fonts.bold,
    fontSize: 16, 
    marginBottom: 4, 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
})