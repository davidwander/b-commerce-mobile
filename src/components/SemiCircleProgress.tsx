import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { G, Circle as SvgCircle } from 'react-native-svg';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

const AnimatedCircle = Animated.createAnimatedComponent(SvgCircle);

type SemiCircleProgressProps = {
  percentage: number; 
  secondaryPercentage?: number; 
  radius?: number;
  strokeWidth?: number;
  secondaryStrokeWidth?: number;
  padding?: number;
  label?: string; 
  secondaryLabel?: string; 
  gapBetweenArcs?: number;
};

export function SemiCircleProgress({
  percentage,
  secondaryPercentage,
  radius = 70,
  strokeWidth = 15,
  secondaryStrokeWidth,
  padding = 10,
  label = 'Lucro',
  secondaryLabel = 'Gastos',
  gapBetweenArcs = 4,
}: SemiCircleProgressProps) {
  const animatedPrimary = useRef(new Animated.Value(0)).current;
  const animatedSecondary = useRef(new Animated.Value(0)).current;
  const [displayPrimary, setDisplayPrimary] = useState(0);
  const [displaySecondary, setDisplaySecondary] = useState(0);

  useEffect(() => {
    animatedPrimary.addListener(({ value }) => setDisplayPrimary(Math.round(value)));
    Animated.timing(animatedPrimary, {
      toValue: percentage,
      duration: 1200,
      useNativeDriver: false,
    }).start();

    return () => animatedPrimary.removeAllListeners();
  }, [percentage]);

  useEffect(() => {
    if (typeof secondaryPercentage === 'number') {
      animatedSecondary.addListener(({ value }) => setDisplaySecondary(Math.round(value)));
      Animated.timing(animatedSecondary, {
        toValue: secondaryPercentage,
        duration: 1200,
        useNativeDriver: false,
      }).start();
      return () => animatedSecondary.removeAllListeners();
    }
  }, [secondaryPercentage]);

  const innerStrokeWidth = secondaryStrokeWidth ?? Math.max(2, strokeWidth - 2);
  const safeGap = Math.max(0, gapBetweenArcs);
  
  const innerRadiusBase = radius - (strokeWidth / 2) - safeGap - (innerStrokeWidth / 2);
  const innerRadius = Math.max(6, innerRadiusBase);

  const outerCircumference = Math.PI * radius;
  const innerCircumference = Math.PI * innerRadius;
  const maxStrokeWidth = Math.max(strokeWidth, innerStrokeWidth);
  const totalRadius = radius + maxStrokeWidth + padding;

  const outerDashoffset = animatedPrimary.interpolate({
    inputRange: [0, 100],
    outputRange: [outerCircumference, 0],
  });

  const innerDashoffset = animatedSecondary.interpolate({
    inputRange: [0, 100],
    outputRange: [innerCircumference, 0],
  });

  const outerColor = animatedPrimary.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['#F44336', '#FFEB3B', '#4CAF50'],
  });

  const innerColor = animatedSecondary.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['#E57373', '#FFD54F', '#81C784'],
  });

  const showSecondary = typeof secondaryPercentage === 'number';
  const numbersLine = showSecondary
    ? `${displayPrimary}% / ${displaySecondary}%`
    : `${displayPrimary}%`;
  const labelsLine = showSecondary
    ? `${label} / ${secondaryLabel}`
    : label;

  return (
    <View style={[styles.container, { padding }]}>
      <Svg width={totalRadius * 2} height={totalRadius + padding}>
        <G rotation="-180" origin={`${totalRadius}, ${totalRadius}`}>
          {/* Fundo externo */}
          <SvgCircle
            cx={totalRadius}
            cy={totalRadius}
            r={radius}
            stroke="#555"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="transparent"
          />
          {/* Fundo interno (se existir secundário) */}
          {showSecondary && (
            <SvgCircle
              cx={totalRadius}
              cy={totalRadius}
              r={innerRadius}
              stroke="#4a4a4a"
              strokeWidth={innerStrokeWidth}
              strokeLinecap="round"
              fill="transparent"
            />
          )}
          {/* Progresso externo (principal) */}
          <AnimatedCircle
            cx={totalRadius}
            cy={totalRadius}
            r={radius}
            stroke={outerColor as any}
            strokeWidth={strokeWidth}
            strokeDasharray={`${outerCircumference}`}
            strokeDashoffset={outerDashoffset as any}
            strokeLinecap="round"
            fill="transparent"
          />
          {/* Progresso interno (secundário) */}
          {showSecondary && (
            <AnimatedCircle
              cx={totalRadius}
              cy={totalRadius}
              r={innerRadius}
              stroke={innerColor as any}
              strokeWidth={innerStrokeWidth}
              strokeDasharray={`${innerCircumference}`}
              strokeDashoffset={innerDashoffset as any}
              strokeLinecap="round"
              fill="transparent"
            />
          )}
        </G>
      </Svg>
      {showSecondary ? (
        <View
          style={{
            position: 'absolute',
            left: 10,
            right: 10,
            top: totalRadius - 15,
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 6,
            alignItems: 'center',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.percentage}>{displayPrimary}%</Text>
            <Text style={styles.text}>{label}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.percentage}>{displaySecondary}%</Text>
            <Text style={styles.text}>{secondaryLabel}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.label}>
          <Text style={styles.percentage}>{numbersLine}</Text>
          <Text style={styles.text}>{labelsLine}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  label: { 
    position: 'absolute',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  percentage: { 
    fontSize: 28, 
    color: colors.white, 
    fontFamily: fonts.italic,
    backgroundColor: "rgba(2,2,2,0.3)",
    borderRadius: 12
  },
  text: { 
    fontSize: 18, 
    color: colors.black, 
    marginTop: 5,
    fontFamily: fonts.italic 
  },
});
