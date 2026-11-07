import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, LinearGradient as SvgGradient, RadialGradient, Stop, Path, Circle } from 'react-native-svg';
import { colors } from './theme';

// Fixed star positions so the sky looks the same on every screen.
let seed = 7;
const rnd = () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};
const STARS = Array.from({ length: 45 }, () => {
  const big = rnd() < 0.07;
  return { x: rnd() * 100, y: rnd() * 100, size: big ? 2 + rnd() : 0.8 + rnd() * 0.9, opacity: 0.3 + rnd() * 0.5 };
});

function Stars() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {STARS.map((s, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: s.size / 2,
            backgroundColor: '#ebeef2',
            opacity: s.opacity,
          }}
        />
      ))}
      <LinearGradient colors={['rgba(0,0,0,0)', colors.bg]} style={styles.fade} />
    </View>
  );
}

function ChromeX({ size }) {
  return (
    <Svg width={size * 1.15} height={size * 1.35} viewBox="-6 -10 106 128">
      <Defs>
        <SvgGradient id="chromeA" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#ffffff" />
          <Stop offset="0.38" stopColor="#c9ccd1" />
          <Stop offset="0.52" stopColor="#7d828a" />
          <Stop offset="0.62" stopColor="#eef0f2" />
          <Stop offset="1" stopColor="#8a8f96" />
        </SvgGradient>
        <SvgGradient id="chromeB" x1="1" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#f4f5f7" />
          <Stop offset="0.45" stopColor="#9ca1a8" />
          <Stop offset="0.7" stopColor="#e6e8eb" />
          <Stop offset="1" stopColor="#5d6168" stopOpacity="0.2" />
        </SvgGradient>
        <RadialGradient id="flare" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor="#ffffff" stopOpacity="1" />
          <Stop offset="0.25" stopColor="#ffffff" stopOpacity="0.7" />
          <Stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Path d="M70 4 L98 4 L58 50 Q34 80 -4 116 Q18 82 42 50 Z" fill="url(#chromeB)" />
      <Path d="M6 4 L36 4 L96 100 L66 100 Z" fill="url(#chromeA)" />
      <Circle cx="10" cy="6" r="14" fill="url(#flare)" />
    </Svg>
  );
}

export default function Header() {
  const size = 42;
  return (
    <View style={styles.sky}>
      <Stars />
      <View style={styles.mark} accessibilityLabel="Nextscape">
        <Text style={[styles.word, { fontSize: size }]}>ne</Text>
        <ChromeX size={size} />
        <Text style={[styles.word, { fontSize: size }]}>tscape</Text>
      </View>
      <LinearGradient
        colors={['rgba(255,255,255,0)', '#ffffff', 'rgba(255,255,255,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.streak}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sky: { marginHorizontal: -20, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 22, gap: 18 },
  fade: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '45%' },
  mark: { flexDirection: 'row', alignItems: 'center' },
  word: { color: '#e6e8eb', fontWeight: '300', includeFontPadding: false },
  streak: { height: 1, opacity: 0.9 },
});
