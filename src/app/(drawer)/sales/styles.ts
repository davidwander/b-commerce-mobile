import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: colors.page.daffodils,
  },
  containerContent: {
    flex: 1, 
    paddingHorizontal: 16, 
    paddingTop: 16
  },
  header: {
    fontSize: 18,
    fontFamily: fonts.italic,
    fontWeight: '600',
    marginBottom: 16,
    color: colors.black,
  },
  listEmptyText: {
    color: colors.black,
    fontFamily: fonts.italic,
    textAlign: 'center',
    marginTop: 50,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  status: {
    position: 'absolute',
    top: 8,
    right: 12,
    backgroundColor: colors.page.tulips,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.white
  },
  client: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  clientText:{
    fontFamily: fonts.bold, 
    fontSize: 18, 
    color: colors.black
  },
  date: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8
  },
  dateText: {
    fontFamily: fonts.regular, 
    fontSize: 16, 
    color: colors.black
  },
  total: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  totalText: {
    fontFamily: fonts.regular, 
    fontSize: 16, 
    color: colors.black,
  },
  icon: {
    marginRight: 6,
  },
})