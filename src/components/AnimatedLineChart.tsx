import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Animated, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LineChart } from 'react-native-chart-kit';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export type AnimatedLineChartProps = {
  labels: string[];
  target: number[];
  width: number;
  height: number;
  chartConfig: any;
  paddingTopOverride?: number;
  paddingRightOverride?: number;
  mode?: 'amplitude' | 'stroke';
  bleedHorizontal?: number; // bleed para cobrir o padding do container
  curveType?: 'straight' | 'smooth';
  animationDurationMs?: number;
};

export function AnimatedLineChart({
  labels,
  target,
  width,
  height,
  chartConfig,
  paddingTopOverride,
  paddingRightOverride,
  mode = 'amplitude',
  bleedHorizontal,
  curveType = 'smooth',
  animationDurationMs = 1000,
}: AnimatedLineChartProps) {
  // Modo 1: animação por amplitude (usa o próprio chart para layout, 100% alinhado)
  if (mode === 'amplitude') {
    const anim = useRef(new Animated.Value(0)).current;
    const [data, setData] = useState<number[]>(target.map(() => 0));

    useEffect(() => {
      const id = anim.addListener(({ value }) => {
        setData(target.map((v) => v * value));
      });
      Animated.timing(anim, {
        toValue: 1,
        duration: animationDurationMs,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start(() => anim.removeListener(id));
      return () => anim.removeAllListeners();
    }, [target, animationDurationMs]);

    const chartData = useMemo(() => ({ labels, datasets: [{ data }] }), [labels, data]);
    const bleed = typeof bleedHorizontal === 'number' ? bleedHorizontal : 0;

    return (
      <View style={{ marginLeft: -bleed, marginRight: -bleed, width: width + bleed * 2 }}>
        <LineChart
          data={chartData}
          width={width + bleed * 2}
          height={height}
          withInnerLines={false}
          withOuterLines={false}
          withShadow={false}
          chartConfig={chartConfig}
          bezier={curveType !== 'straight'}
          style={{ marginBottom: 10 }}
        />
      </View>
    );
  }

  // Modo 2: overlay SVG animando strokeDashoffset
  const chartData = useMemo(() => ({ labels, datasets: [{ data: target }] }), [labels, target]);

  // Offsets internos do chart-kit
  const chartPaddingTop = typeof paddingTopOverride === 'number' ? paddingTopOverride : 16;
  const chartPaddingRight = typeof paddingRightOverride === 'number' ? paddingRightOverride : 64;
  const chartW = width;
  const chartH = height;
  const innerW = chartW - chartPaddingRight;
  const innerH = chartH - chartPaddingTop;

  const minY = Math.min(...target);
  const maxY = Math.max(...target);
  const yRange = Math.max(1, maxY - minY);

  const points = target.map((y, i) => {
    const x = (innerW * i) / Math.max(1, target.length - 1);
    const ny = (y - minY) / yRange; // 0..1
    const vy = chartPaddingTop + innerH * (1 - ny);
    return { x, y: vy };
  });

  const line = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    const lengthX = p2.x - p1.x;
    const lengthY = p2.y - p1.y;
    return { length: Math.sqrt(lengthX * lengthX + lengthY * lengthY), angle: Math.atan2(lengthY, lengthX) };
  };

  const controlPoint = (current: any, previous: any, next: any, reverse: boolean) => {
    const p = previous || current;
    const n = next || current;
    const smoothing = curveType === 'straight' ? 0 : 0.2;
    const o = line(p, n);
    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * smoothing;
    const x = current.x + Math.cos(angle) * length;
    const y = current.y + Math.sin(angle) * length;
    return { x, y };
  };

  const bezierCommand = (point: any, i: number, a: any[]) => {
    const cps = controlPoint(a[i - 1], a[i - 2], point, false);
    const cpe = controlPoint(point, a[i - 1], a[i + 1], true);
    return `C ${cps.x},${cps.y} ${cpe.x},${cpe.y} ${point.x},${point.y}`;
  };

  const pathD = useMemo(() => {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x},${points[0].y}`;
    const d = points.reduce((acc, p, i, a) => (i === 0 ? `M ${p.x},${p.y}` : `${acc} ${bezierCommand(p, i, a)}`), '');
    return d;
  }, [target, width, height, curveType]);

  const pathRef = useRef<any>(null);
  const dash = useRef(new Animated.Value(0)).current;
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const length = pathRef.current?.getTotalLength?.() ?? 0;
        setPathLength(length);
        dash.setValue(length);
        Animated.timing(dash, {
          toValue: 0,
          duration: animationDurationMs,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }).start();
      } catch (e) {}
    }, 0);
    return () => clearTimeout(timer);
  }, [pathD, animationDurationMs]);

  return (
    <View style={{ position: 'relative' }}>
      <LineChart
        data={chartData}
        width={width}
        height={height}
        withInnerLines={false}
        withOuterLines={false}
        withShadow={false}
        chartConfig={{
          ...chartConfig,
          color: () => 'transparent',
        }}
        bezier={curveType !== 'straight'}
        style={{ marginBottom: 10 }}
      />

      <Svg width={width} height={height} style={{ position: 'absolute', left: 0, top: 0 }}>
        <AnimatedPath
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke={chartConfig?.color?.() ?? '#ae4ec2'}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={dash}
        />
      </Svg>
    </View>
  );
}


