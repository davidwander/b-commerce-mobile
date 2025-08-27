import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from './styles';
import { PartLeaf } from '@/data/partsTree';
import Feather from '@expo/vector-icons/Feather'; 
import { colors } from '@/styles/colors';

interface PieceCardProps {
  piece: PartLeaf;
  category: string;
  subcategory?: string;
  onPress: (piece: PartLeaf) => void;
  price?: number;
}

export function PieceCard({ piece, category, subcategory, onPress, price }: PieceCardProps) {
  const displayTitle = `${piece.name}`;
  
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => onPress(piece)}>
      <View style={styles.textContainer}>
        <Text style={styles.categoryText}>{category}</Text>
        {subcategory && <Text style={styles.subcategoryText}>{subcategory}</Text>}
        <Text style={styles.pieceNameText}>
          {displayTitle}
        </Text>
        {price !== undefined && (
          <Text style={styles.priceText}>R$ {price.toFixed(2).replace('.', ',')}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
