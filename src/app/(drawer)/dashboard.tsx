// src/app/dashboard.tsx
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { Header } from '@/components/Header';
import { FloatingCard } from '@/components/FloatingCard';
import { CustomPieChart } from '@/components/CustomPieChart';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

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

// dados no formato esperado pelo CustomPieChart
const pieChartData = [
  { value: 6000, color: '#4CAF50', label: 'Lucros' },
  { value: 3000, color: '#F44336', label: 'Gastos' },
];

export default function Dashboard() {
  return (
    <View style={{ flex: 1, paddingTop: 30, backgroundColor: colors.page.meadow }}>
      <Header />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 40,
          paddingTop: 16,
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

        {/* Métricas com FloatingCard */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
          <FloatingCard style={{ flex: 1, marginRight: 10, backgroundColor: colors.page.daffodils }}>
            <Text
              style={{
                fontFamily: fonts.italic,
                fontSize: 18,
                color: colors.black,
              }}
            >
              Lucro Total
            </Text>
            <Text
              style={{
                fontFamily: fonts.bold,
                color: colors.black,
                fontSize: 18,
              }}
            >
              R$ 6.000
            </Text>
          </FloatingCard>

          <FloatingCard style={{ flex: 1, marginLeft: 10 }}>
            <Text
              style={{
                fontFamily: fonts.italic,
                fontSize: 18,
                color: colors.black,
              }}
            >
              Gastos Totais
            </Text>
            <Text
              style={{
                fontFamily: fonts.bold,
                color: '#F44336',
                fontSize: 18,
              }}
            >
              R$ 3.000
            </Text>
          </FloatingCard>
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

        {/* Componente Pie Chart reutilizável */}
        <CustomPieChart
          data={[
            {
              value: 7000,
              color: '#4CAF50',
              label: 'Lucro',
              icon: 'dollar',
            },
            {
              value: 3500,
              color: '#F44336',
              label: 'Despesas',
              icon: 'credit-card',
            },
            {
              value: 1500,
              color: '#2196F3',
              label: 'Investimentos',
              icon: 'line-chart',
            },
          ]}
        />

      </ScrollView>
    </View>
  );
}
