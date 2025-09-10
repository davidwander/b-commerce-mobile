import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 18,
    marginHorizontal: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  headerText: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 4
  },
  badgeText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  saleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  saleDate: {
    fontSize: 16,
    fontFamily: fonts.italic,
    color: colors.black,
    opacity: 0.8,
    marginBottom: 2
  },
  saleDateContent: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.black,
  },
  pieces: {
    fontSize: 14,
    fontFamily: fonts.italic,
    color: colors.black,
    opacity: 0.7,
    marginBottom: 2
  },
  quantityPiece: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.black,
  },
  total: {
    fontSize: 16,
    color: colors.black,
    opacity: 0.8,
    marginBottom: 2
  },
  showSelectButton: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.black + '50',
  },
  showSelectButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showSelectButtonText: {
    fontSize: 16,
    fontFamily: fonts.italic,
    color: colors.page.dragonFruit,
  },
});