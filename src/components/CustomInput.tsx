import { TextInput, Text, View, TextInputProps } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

interface CustomInputProps extends TextInputProps {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
}

export function CustomInput({ label, value, onChangeText, error, ...rest }: CustomInputProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: fonts.italic,
          fontWeight: "500",
          marginBottom: 6,
        }}
      >
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={{
          backgroundColor: colors.white,
          borderRadius: 12,
          padding: 16,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 5, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          borderWidth: error ? 1 : 0,
          borderColor: error ? "red" : "transparent",
        }}
        placeholderTextColor="#999"
        {...rest}
      />
      {error && (
        <Text 
          style={{
            color: colors.white, 
            marginTop: 4, 
            fontSize: 14, 
            backgroundColor: "red",
            borderRadius: 12,
            padding: 2,
            textAlign: "center",
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
