import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from './styles';
import { PartLeaf } from '@/data/partsTree';
import Feather from '@expo/vector-icons/Feather'; // Importar Feather para o ícone do checkbox
import { colors } from '@/styles/colors';

interface PieceCardProps {
  piece: PartLeaf;
  category: string;
  subcategory?: string;
  onPress: (piece: PartLeaf) => void;
  isSelected: boolean; // Nova prop para o estado de seleção
  onToggleSelect: (pieceId: string) => void; // Nova prop para alternar a seleção
}

export function PieceCard({ piece, category, subcategory, onPress, isSelected, onToggleSelect }: PieceCardProps) {
  let finalDescription = '';
  if (piece.description) {
    if (piece.description.length > 6) {
      finalDescription = ` ${piece.description.substring(0, 6)}...`;
    } else {
      finalDescription = ` ${piece.description}`;
    }
  }

  const displayTitle = `${piece.name}${finalDescription}`;

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => onPress(piece)}>
      <View style={styles.textContainer}>
        <Text style={styles.categoryText}>{category}</Text>
        {subcategory && <Text style={styles.subcategoryText}>{subcategory}</Text>}
        <Text style={styles.pieceNameText}>
          {displayTitle}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.checkboxContainer} 
        onPress={() => onToggleSelect(piece.id)}
      >
        <Feather 
          name={isSelected ? "check-square" : "square"} 
          size={24} 
          color={isSelected ? colors.page.dragonFruit : colors.black}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
