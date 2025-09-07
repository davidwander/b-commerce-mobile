import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.black,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  detailLabel: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black,
  },
  detailValue: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.black,
    flexShrink: 1,
    textAlign: 'right',
  },
  pieceListContainer: {
    width: '100%',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  pieceListTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.black,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
  pieceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  pieceDescription: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.black,
    flex: 1,
  },
  pieceQuantity: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.black,
    marginRight: 10,
  },
  piecePrice: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.black,
  },
  closeButton: {
    backgroundColor: colors.page.dragonFruit,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    elevation: 2,
    width: '100%',
  },
  closeButtonText: {
    color: 'white',
    fontFamily: fonts.bold,
    textAlign: 'center',
    fontSize: 16,
  },
});
