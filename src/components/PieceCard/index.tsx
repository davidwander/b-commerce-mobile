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
  onToggleSelect?: (pieceId: string) => void;
  isSelected?: boolean;
  price?: number;
  selectable?: boolean;
}

export function PieceCard({ 
  piece, 
  category, 
  subcategory, 
  onPress, 
  onToggleSelect,
  isSelected = false,
  price,
  selectable = false
}: PieceCardProps) {
  const displayTitle = `${piece.name}`;
  
  const handlePress = () => {
    if (selectable && onToggleSelect) {
      onToggleSelect(piece.id);
    } else {
      onPress(piece);
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.cardContainer,
        selectable && { 
          borderWidth: 2, 
          borderColor: isSelected ? colors.page.tulips : 'transparent',
          backgroundColor: isSelected ? '#fff8e1' : colors.white
        }
      ]} 
      onPress={handlePress}
    >
      {selectable && (
        <View style={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: isSelected ? colors.page.tulips : colors.white,
          borderWidth: 2,
          borderColor: colors.page.tulips,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}>
          {isSelected && (
            <Feather name="check" size={16} color={colors.white} />
          )}
        </View>
      )}
      
      <View style={styles.textContainer}>
        <Text style={styles.categoryText}>{category}</Text>
        {subcategory && <Text style={styles.subcategoryText}>{subcategory}</Text>}
        <Text style={styles.pieceNameText}>
          {displayTitle}
        </Text>
        
        {price !== undefined && (
          <Text style={styles.priceText}>R$ {price.toFixed(2).replace('.', ',')}</Text>
        )}
        
        {piece.quantity !== undefined && (
          <Text style={{
            fontSize: 12,
            color: piece.quantity > 0 ? '#4caf50' : '#f44336',
            marginTop: 4,
          }}>
            Estoque: {piece.quantity}
          </Text>
        )}
        
        {selectable && (
          <Text style={{
            marginTop: 4,
            fontSize: 12,
            color: isSelected ? colors.page.tulips : colors.black,
            fontWeight: isSelected ? 'bold' : 'normal',
          }}>
            {isSelected ? '✓ Selecionada' : 'Clique para selecionar'}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}