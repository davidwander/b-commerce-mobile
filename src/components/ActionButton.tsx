import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  color?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export function ActionButton({
  label,
  onPress,
  color = colors.page.tulips,
  style,
  textStyle,
}: ActionButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          paddingVertical: 12,
          paddingHorizontal: 18,
          backgroundColor: color,
          borderRadius: 8,
          alignSelf: "center",
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 2, height: 5 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            color: colors.white,
            fontWeight: "bold",
            fontSize: 18,
            fontFamily: fonts.bold
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
