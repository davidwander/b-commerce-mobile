import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  
  modalView: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    maxHeight: '85%',
    width: '100%',
    maxWidth: 400,
  },
  
  modalTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.black,
    textAlign: 'center',
  },

  section: {
    width: '100%',
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.black + '20',
  },
  
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  
  detailLabel: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.black,
    opacity: 0.8,
    marginRight: 8,
    minWidth: 60,
  },
  
  detailValue: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.black,
    flex: 1,
  },

  pieceListContainer: {
    width: '100%',
    marginTop: 16,
  },

  pieceListTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.black + '20',
  },

  pieceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.black + '10',
    borderRadius: 8,
    marginVertical: 2,
  },

  pieceDescription: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.black,
    lineHeight: 18,
  },

  pieceUnitPrice: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.black,
    opacity: 0.6,
    marginTop: 2,
  },

  pieceQuantity: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.page.tulips,
    backgroundColor: colors.page.tulips + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    textAlign: 'center',
    minWidth: 40,
  },

  piecePrice: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.black,
    textAlign: 'right',
  },

  closeButton: {
    backgroundColor: colors.page.dragonFruit,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 20,
    minWidth: 120,
  },

  closeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
});