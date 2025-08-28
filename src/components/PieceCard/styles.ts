import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginVertical: 4,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderLeftWidth: 6,
    borderLeftColor: colors.page.dragonFruit,
    marginHorizontal: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10, 
  },
  categoryText: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.page.dragonFruit,
  },
  subcategoryText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: '#666',
    marginTop: 2,
    marginBottom: 4,
  },
  pieceNameText: {
    fontSize: 16,
    fontFamily: fonts.italic,
    color: colors.black,
  },
  priceText: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.page.lavender,
    marginTop: 4,
  }
});
