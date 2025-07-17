import React, { useState } from 'react';
import { Input, InputProps, Text } from 'tamagui';

type CustomInputProps = InputProps & {
  label?: string;
  value?: string; // Adicione esta linha se quiser permitir que o valor seja controlado externamente
  onChangeText?: (text: string) => void; // Adicione esta linha para permitir callback externo
};

const CustomInput: React.FC<CustomInputProps> = ({ 
  label, 
  value: propValue, 
  onChangeText: propOnChangeText,
  ...props 
}) => {
  const [internalValue, setInternalValue] = useState('');

  // Decide se usa o valor controlado externamente ou o estado interno
  const value = propValue !== undefined ? propValue : internalValue;
  
  const handleChangeText = (text: string) => {
    if (propOnChangeText) {
      propOnChangeText(text);
    } else {
      setInternalValue(text);
    }
  };

  return (
    <>
      {label && <Text>{label}</Text>}
      <Input 
        {...props}
        value={value}
        onChangeText={handleChangeText}
        style={{
          color: '#000',
          borderColor: '#000',
          backgroundColor: '#ed9e59',
        }}
        placeholderTextColor="#666"
      />
    </>
  );
};

export default CustomInput;