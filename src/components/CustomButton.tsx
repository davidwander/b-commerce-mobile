import React from 'react';
import { Pressable, Text } from 'react-native'; // Importando Pressable do react-native
import { YStack } from 'tamagui'; // Importando YStack do tamagui

type CustomButtonProps = {
  label: string;
  onPress: () => void;
  theme?: 'primary' | 'secondary' | 'ternary' | 'quaternary' | 'quinternary' | 'sextenary'; 
};

const CustomButton: React.FC<CustomButtonProps> = ({ label, onPress, theme }) => {
  const colors = {
    primary: '#a34054',
    secondary: '#662249',
    ternary: '#44174e',
    quaternary: '#1b1931',
    quinternary: '#ed9e59',
    sextenary: '#e9bcb9',
  };

  const buttonColor = theme === 'primary' ? colors.primary : 
                      theme === 'secondary' ? colors.secondary :
                      theme === 'ternary' ? colors.ternary :
                      theme === 'quaternary' ? colors.quaternary :
                      theme === 'quinternary' ? colors.quinternary :
                      colors.sextenary; // Default to sextenary if no theme matches

  return (
    <YStack width="100%" marginVertical={10}>
      <Pressable 
        onPress={onPress} 
        style={{
          backgroundColor: buttonColor,
          borderRadius: 10,
          padding: 18,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          {label}
        </Text>
      </Pressable>
    </YStack>
  );
};

export default CustomButton;
