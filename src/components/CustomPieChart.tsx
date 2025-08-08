import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { FontAwesome } from '@expo/vector-icons';

import { fonts } from '@/styles/fonts';
import { colors } from '@/styles/colors';

interface CustomPieChartProps {
  data: { value: number; color: string; label: string; icon?: keyof typeof FontAwesome.glyphMap }[];
}

export function CustomPieChart({ data }: CustomPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <View 
      style={{ 
        alignItems: 'center', 
        paddingVertical: 24,
        paddingHorizontal: 0, 
        borderRadius: 12,
        marginBottom: 24,
        backgroundColor: colors.page.meadow 
      }}
    >
      {/* Donut Pie Chart */}
      <PieChart
        data={data.map(item => ({
          value: item.value,
          color: item.color,
          text: `${Math.round((item.value / total) * 100)}%`,
        }))}
        donut
        radius={100}
        innerRadius={50}
        showText
        textColor="#fff"
        textSize={13}
        centerLabelComponent={() => (
          <View 
            style={{ 
              alignItems: 'center', 
              backgroundColor: colors.page.meadow,
              width: 100,
              height: 100,
              borderRadius: 60,
              justifyContent: 'center', 
            }}
          >
            <Text 
              style={{ 
                color: colors.white, 
                fontWeight: '600', 
                fontSize: 20,
                fontFamily: fonts.regular
              }}
            >
              Total
            </Text>
            <Text 
              style={{ 
                color: '#fff', 
                fontSize: 18, 
                fontFamily: fonts.italic 
              }}
            >
              R$ {total.toLocaleString('pt-BR')}
            </Text>
          </View>
        )}
      />

      {/* Legenda */}
      <View style={{ marginTop: 24, width: '100%', paddingHorizontal: 24 }}>
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
              backgroundColor: colors.black,
              padding: 12,
              borderRadius: 5,
            }}
          >
            <View
              style={{
                width: 20,
                height: 14,
                backgroundColor: item.color,
                borderRadius: 7,
                marginRight: 12,
              }}
            />
            {item.icon && (
              <FontAwesome
                name={item.icon}
                size={20}
                color="#ccc"
                style={{ marginRight: 10 }}
              />
            )}
            <Text 
              style={{ 
                color: '#fff', 
                fontSize: 18, 
                fontFamily: fonts.regular,
                flex: 1 
              }}
            >
              {item.label}
            </Text>
            <Text 
              style={{ 
                color: '#fff', 
                fontFamily: fonts.bold, 
                fontSize: 18 
              }}
            >
              R$ {item.value.toLocaleString('pt-BR')}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
