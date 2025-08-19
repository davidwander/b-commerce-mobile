import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.page.tulips,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
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
    fontFamily: fonts.italic,
  },
});
