import React from 'react';
import { View, ScrollView, Dimensions, Text } from 'react-native';

import { Header } from '@/components/Header';
import { SemiCircleProgress } from '@/components/SemiCircleProgress';
import { FloatingCard } from '@/components/FloatingCard';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
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
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
      <View style={{ flex: 1, alignItems: 'center', marginRight: 10 }}>
        <SemiCircleProgress percentage={lucro} radius={60} strokeWidth={15} label="Lucro" />
      </View>
      <View style={{ flex: 1, alignItems: 'center', marginLeft: 10 }}>
        <SemiCircleProgress percentage={gastos} radius={60} strokeWidth={15} label="Gastos" />
      </View>
    </View>
  );
}

export default function Dashboard() {
  return (
    <View style={{ flex: 1, paddingTop: 30, backgroundColor: colors.page.meadow }}>
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
        <View style={{ alignItems: 'center', marginBottom: 26 }}>
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
          <FloatingCard style={{ flex: 1, marginRight: 10, backgroundColor: colors.page.daffodils }}>
            <Text style={{ fontFamily: fonts.italic, fontSize: 18, color: colors.black }}>
              Lucro Total
            </Text>
            <Text style={{ fontFamily: fonts.bold, fontSize: 18, color: colors.black }}>
              R$ 6.000
            </Text>
          </FloatingCard>
        </View>
        
      </ScrollView>
    </View>
  );
}
 