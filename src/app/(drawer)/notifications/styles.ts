import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  reminder: {
    backgroundColor: colors.page.lavender || '#FFF3CD',
  },
  notification: {
    backgroundColor: colors.page.meadow || '#CCE5FF',
  },
  title:{
    fontSize: 18,
    fontFamily: fonts.bold || 'bold',
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.italic || 'normal',
    marginTop: 4,
  },
  date: {
    fontSize: 16,
    fontFamily: fonts.regular || 'normal',
    marginTop: 9,
    color: colors.black || '#6c757d',
  },
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: colors.page.tulips
  },
  containerContent: {
    flex: 1, 
    paddingHorizontal: 16,
  },
  testButton: {
    backgroundColor: colors.page.meadow || '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 18,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  testButtonText: {
    color: colors.white || '#fff',
    fontFamily: fonts.bold || 'bold',
    fontSize: 18,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.page.meadow || '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
})