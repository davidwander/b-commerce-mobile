import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  semiCircleContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  semiCircleContainerContent: {
    flex: 1, 
    alignItems: 'center', 
    marginRight: 10,
  },
  semiCircleContent: {
    flex: 1, 
    alignItems: 'center', 
    marginLeft: 10,
  },
  container: {
    flex: 1, 
    paddingTop: 30, 
    backgroundColor: colors.page.meadow,
  },
  containerContent: {
    alignItems: 'center', 
    marginBottom: 26,
  },
  card: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 24,
  },
  cardContent: {
    flex: 1, 
    marginRight: 10, 
    backgroundColor: colors.page.daffodils,
  },
  cardText: {
    fontFamily: fonts.italic, 
    fontSize: 18, 
    color: colors.black,
  },
  cardValue: {
    fontFamily: fonts.bold, 
    fontSize: 18, 
    color: colors.black,
  },
})