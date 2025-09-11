import { TextInput, Text, View, TextInputProps } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

interface CustomInputProps extends TextInputProps {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  maskType?: 'phone' | 'none';
}

export function CustomInput({ 
  label, 
  value, 
  onChangeText, 
  error, 
  autoCapitalize = 'sentences',
  maskType = 'none',
  ...rest 
}: CustomInputProps) {
  
  // Função para aplicar máscara de telefone
  const applyPhoneMask = (text: string) => {
    // Remove tudo que não é dígito
    const cleanText = text.replace(/\D/g, '');
    
    // Aplica a máscara conforme o tamanho
    if (cleanText.length <= 2) {
      return `(${cleanText}`;
    } else if (cleanText.length <= 7) {
      return `(${cleanText.slice(0, 2)}) ${cleanText.slice(2)}`;
    } else if (cleanText.length <= 11) {
      return `(${cleanText.slice(0, 2)}) ${cleanText.slice(2, 7)}-${cleanText.slice(7)}`;
    } else {
      // Limita a 11 dígitos
      const limitedText = cleanText.slice(0, 11);
      return `(${limitedText.slice(0, 2)}) ${limitedText.slice(2, 7)}-${limitedText.slice(7)}`;
    }
  };

  const handleTextChange = (text: string) => {
    if (maskType === 'phone') {
      const maskedText = applyPhoneMask(text);
      onChangeText?.(maskedText);
    } else {
      onChangeText?.(text);
    }
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: fonts.italic,
          marginBottom: 6,
        }}
      >
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={handleTextChange}
        autoCapitalize={autoCapitalize}
        style={{
          backgroundColor: colors.white,
          borderRadius: 14,
          padding: 15,
          marginHorizontal: 14,
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
            fontSize: 16, 
            marginHorizontal: 14,
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