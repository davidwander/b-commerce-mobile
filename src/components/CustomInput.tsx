import React, { forwardRef, useState } from 'react';
import { Input, InputProps, Text, YStack, useTheme } from 'tamagui';

type CustomInputProps = InputProps & {
  label?: string;
  errorMessage?: string | null;
};

const CustomInput = forwardRef<any, CustomInputProps>(({
  label,
  value: propValue,
  onChangeText: propOnChangeText,
  errorMessage = null,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState('');
  const invalid = !!errorMessage;
  const theme = useTheme(); // Obtendo o tema completo

  const value = propValue !== undefined ? propValue : internalValue;

  const handleChangeText = (text: string) => {
    if (propOnChangeText) {
      propOnChangeText(text);
    } else {
      setInternalValue(text);
    }
  };

  return (
    <YStack 
      gap="$1" 
      width="100%"
      paddingBottom={10}
      marginBottom={20}
    >
      {label && <Text fontSize={18} color={invalid ? "$red10" : "$gray10"}>{label}</Text>}
      
      <Input
        ref={ref}
        value={value}
        onChangeText={handleChangeText}
        borderWidth={1}
        borderColor={invalid ? "$red10" : "$gray7"}
        backgroundColor={theme.background?.val || 'transparent'} 
        color="#000" 
        placeholderTextColor="#999" 
        selectionColor="#FF0000" 
        cursorColor="#000" 
        keyboardType="default" 
        fontSize={16} 
        paddingVertical={10} 
        paddingHorizontal={10}
        marginBottom={20} 
        style={{ minHeight: 50 }} 
        {...props}
      />

      {invalid && (
        <Text color="$red10" fontSize="$3">
          {errorMessage}
        </Text>
      )}
    </YStack>
  );
});

export default CustomInput;