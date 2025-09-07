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
  statusBadge: {
    position: 'absolute',
    top: 8,
    right: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  buttonSelect: {
    position: 'absolute',
    top: 8,
    left: 12,
    backgroundColor: colors.page.clearSky,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  buttonSelectText: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  clientName: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  clientNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  phoneClientContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8
  },
  phoneClient: {
    fontFamily: fonts.regular, 
    fontSize: 16, 
    color: colors.black
  },
  addressClientContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8,
  },
  addressClient: {
    fontFamily: fonts.regular, 
    fontSize: 16, 
    color: colors.black,
    flex: 1,
  },
  dateContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8,
  },
  date: {
    fontFamily: fonts.regular, 
    fontSize: 16, 
    color: colors.black,
  },
  newSectionContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    borderLeftWidth: 4,
  },
  quantityContent: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 6,
  },
  quantityText: {
    fontFamily: fonts.regular, 
    fontSize: 16, 
  },
  totalValueContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  totalValueText: {
    fontFamily: fonts.bold, 
    fontSize: 18, 
  },
  saleWithoutParts: {
    fontSize: 14,
    color: '#6c757d',
    fontStyle: 'italic',
    marginTop: 4,
  },
  seeMore: {
    position: 'absolute',
    bottom: 8,
    right: 12,
  },
})