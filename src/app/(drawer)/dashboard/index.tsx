import React from 'react';
import { View, ScrollView, Dimensions, Text } from 'react-native';
import { styles } from './styles';

import { Header } from '@/components/Header';
import { SemiCircleProgress } from '@/components/SemiCircleProgress';
import { FloatingCard } from '@/components/FloatingCard';

import { colors } from '@/styles/colors';
import { AnimatedLineChart } from '@/components/AnimatedLineChart';

const screenWidth = Dimensions.get('window').width;

const lineChartData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    { data: [5000, 7000, 4000, 8000, 7500, 9000], strokeWidth: 2 },
  ],
};

// Linha com dois semicírculos animados internamente
function SemiCirclesRow({ lucro, gastos }: { lucro: number; gastos: number }) {
  return (
    <View style={styles.semiCircleContainer}>
      <View style={styles.semiCircleContainerContent}>
        <SemiCircleProgress percentage={lucro} radius={60} strokeWidth={15} label="Lucro" />
      </View>
      <View style={styles.semiCircleContent}>
        <SemiCircleProgress percentage={gastos} radius={60} strokeWidth={15} label="Gastos" />
      </View>
    </View>
  );
}

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Gráfico de Linha */}
        <AnimatedLineChart
          labels={lineChartData.labels}
          target={lineChartData.datasets[0].data}
          width={screenWidth - 0}
          height={200}
          chartConfig={{
            backgroundColor: colors.page.meadow,
            backgroundGradientFrom: colors.page.meadow,
            backgroundGradientTo: 'rgba(2,2,2,0.3)',
            decimalPlaces: 0,
            color: () => '#ae4ec2',
            labelColor: () => '#fff',
            propsForDots: { r: '0', strokeWidth: '0', stroke: '#fff' },
            propsForBackgroundLines: { stroke: 'transparent' },
          }}
          paddingTopOverride={14}
          paddingRightOverride={64}
          mode="amplitude"
          bleedHorizontal={16}
          curveType="straight"  
        />

        {/* Semicírculo duplo (Lucro vs Gastos) centralizado e maior */}
        <View style={styles.containerContent}>
          <SemiCircleProgress
            percentage={60}
            secondaryPercentage={35}
            radius={90}
            strokeWidth={22}
            secondaryStrokeWidth={22}
            gapBetweenArcs={0}
            label="Lucro"
            secondaryLabel="Gastos"
          />
        </View>

        {/* Floating Cards de resumo */}
        <View style={styles.card}>
          <FloatingCard style={styles.cardContent}>
            <Text style={styles.cardText}>
              Lucro Total
            </Text>
            <Text style={styles.cardValue}>
              R$ 6.000
            </Text>
          </FloatingCard>
        </View>
      </ScrollView>
    </View>
  );
}
 