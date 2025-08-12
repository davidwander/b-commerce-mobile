import { StyleSheet } from "react-native";
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    maxHeight: "80%",
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  backButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  backText: {
    color: colors.page.tulips,
    fontWeight: "bold",
  },
  closeButton: {
    marginLeft: "auto",
    paddingHorizontal: 10,
    paddingVertical: 6,
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
  icon: {
    fontSize: 20,
    color: colors.black,
  },
  arrow: {
    fontSize: 18,
    color: colors.page.clearSky,
  },
})