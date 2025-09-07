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
    paddingTop: 16,
  },
  headerContainer: {
    flexDirection: 'column', 
    marginBottom: 16
  },
  header: {
    fontSize: 18,
    fontFamily: fonts.italic,
    fontWeight: '700',
    marginBottom: 6,
    padding: 12,
    color: colors.black,
  },
  headerButtons: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    minWidth: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  listEmptyText: {
    color: colors.black,
    fontFamily: fonts.italic,
    textAlign: 'center',
    marginTop: 50,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 22,
    marginBottom: 16,
    marginHorizontal: 16,
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
    paddingVertical: 4,
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
  messageContainer: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    marginBottom: 16,
  },
  messageText: {
    textAlign: 'center',
    color: '#1976d2',
    fontSize: 16,
  },
  loadingContainer: {
    padding: 20, 
    alignItems: 'center'
  },
  errorContainer: {
    padding: 20, 
    alignItems: 'center',
    backgroundColor: '#ffebee',
    borderRadius: 18,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16, 
    color: '#c62828', 
    textAlign: 'center'
  },
  emptyMessage: {
    fontSize: 14, 
    color: colors.black, 
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.7,
  },
  floatingButton: {
    marginHorizontal: 16,
    marginBottom: 46,
  },
})