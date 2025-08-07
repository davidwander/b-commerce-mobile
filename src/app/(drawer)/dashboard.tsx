import { View, Text, Dimensions, ScrollView } from 'react-native';
import { colors } from '@/styles/colors';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { fonts } from '@/styles/fonts';
import { Header } from '@/components/Header'; // ✅ Importação do Header

const screenWidth = Dimensions.get('window').width;

const lineChartData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      data: [5000, 7000, 4000, 8000, 7500, 9000],
      strokeWidth: 2,
    },
  ],
};

const pieChartData = [
  {
    name: 'Lucros',
    population: 6000,
    color: '#4CAF50',
    legendFontColor: '#333',
    legendFontSize: 16,
  },
  {
    name: 'Gastos',
    population: 3000,
    color: '#F44336',
    legendFontColor: '#333',
    legendFontSize: 16,
  },
];

export default function Dashboard() {
  return (
    <View style={{ flex: 1, paddingTop: 30, backgroundColor: colors.page.meadow }}>
      {/* ✅ Header fixo no topo */}
      <Header />

      {/* Conteúdo rolável */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 40,
          paddingTop: 16, // Espaço entre Header e conteúdo
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Gráfico de Linha */}
        <LineChart
          data={lineChartData}
          width={screenWidth - 32}
          height={210}
          chartConfig={{
            backgroundColor: colors.page.meadow,
            backgroundGradientFrom: colors.page.meadow,
            backgroundGradientTo: colors.page.meadow,
            decimalPlaces: 0,
            color: () => `#ffffff`,
            labelColor: () => `#ffffff`,
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#fff',
            },
          }}
          bezier
          style={{ marginBottom: 24 }}
        />

        {/* Métricas */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}
        >
          <View
            style={{
              backgroundColor: '#ffffff33',
              padding: 16,
              borderRadius: 12,
              flex: 1,
              marginRight: 10,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: 18,
                color: '#fff',
              }}
            >
              Lucro Total
            </Text>
            <Text
              style={{
                fontFamily: fonts.bold,
                color: '#fff',
                fontSize: 18,
              }}
            >
              R$ 6.000
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#ffffff33',
              padding: 16,
              borderRadius: 12,
              flex: 1,
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: 18,
                color: '#fff',
              }}
            >
              Gastos Totais
            </Text>
            <Text
              style={{
                fontFamily: fonts.bold,
                color: '#fff',
                fontSize: 18,
              }}
            >
              R$ 3.000
            </Text>
          </View>
        </View>

        {/* Gráfico de Pizza */}
        <Text
          style={{
            fontSize: 22,
            fontFamily: fonts.italic,
            color: '#fff',
            marginBottom: 12,
          }}
        >
          Proporção de Lucros e Gastos
        </Text>

        <PieChart
          data={pieChartData}
          width={screenWidth - 32}
          height={200}
          chartConfig={{
            color: () => `#fff`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="2"
          center={[8, 5]}
          absolute
        />
      </ScrollView>
    </View>
  );
}
