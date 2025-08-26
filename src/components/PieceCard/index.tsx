import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from './styles';
import { PartLeaf } from '@/data/partsTree';

interface PieceCardProps {
  piece: PartLeaf;
  category: string;
  subcategory?: string;
  onPress: (piece: PartLeaf) => void;
}

export function PieceCard({ piece, category, subcategory, onPress }: PieceCardProps) {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => onPress(piece)}>
      <View style={styles.textContainer}>
        <Text style={styles.categoryText}>{category}</Text>
        {subcategory && <Text style={styles.subcategoryText}>{subcategory}</Text>}
        <Text style={styles.pieceNameText}>{piece.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
