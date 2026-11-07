import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

// This month's three destinations. Edit this list each month.
const MONTH = 'November 2026';
const DESTINATIONS = [
  {
    id: '1',
    name: 'Lisbon',
    country: 'Portugal',
    tagline: 'Mild winter sun, custard tarts, hilltop views',
    go: 'Alfama at sunset',
    avoid: 'Tram 28 at midday',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200',
  },
  {
    id: '2',
    name: 'Kotor',
    country: 'Montenegro',
    tagline: 'Fjord-like bay, no summer crowds',
    go: 'The fortress walk at dawn',
    avoid: 'Cruise ship days in the old town',
    image: 'https://images.unsplash.com/photo-1563788564048-4d4e0d1c5c66?w=1200',
  },
  {
    id: '3',
    name: 'Ljubljana',
    country: 'Slovenia',
    tagline: 'Christmas lights start late November',
    go: 'Riverside cafés on Trubarjeva',
    avoid: 'Overpriced castle restaurant',
    image: 'https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=1200',
  },
];

function DestinationCard({ item, index }) {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.card}>
      <ImageBackground source={{ uri: item.image }} style={styles.image} imageStyle={styles.imageRadius}>
        <View style={styles.overlay}>
          <Text style={styles.number}>0{index + 1}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.country}>{item.country}</Text>
          <Text style={styles.tagline}>{item.tagline}</Text>
          <View style={styles.tips}>
            <Text style={styles.go}>✓ Go: {item.go}</Text>
            <Text style={styles.avoid}>✕ Skip: {item.avoid}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.brand}>NEXTSCAPE</Text>
        <Text style={styles.heading}>Three places for {MONTH}</Text>
        <Text style={styles.sub}>Where to go, and what to skip when you get there.</Text>
        {DESTINATIONS.map((d, i) => (
          <DestinationCard key={d.id} item={d} index={i} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0e0f13' },
  content: { padding: 20, paddingTop: 40 },
  brand: { color: '#f2b84b', fontSize: 14, fontWeight: '700', letterSpacing: 4 },
  heading: { color: '#ffffff', fontSize: 30, fontWeight: '800', marginTop: 8 },
  sub: { color: '#9a9ca5', fontSize: 15, marginTop: 6, marginBottom: 24 },
  card: { marginBottom: 20, borderRadius: 20, overflow: 'hidden' },
  image: { height: 300, justifyContent: 'flex-end' },
  imageRadius: { borderRadius: 20 },
  overlay: { padding: 18, backgroundColor: 'rgba(0,0,0,0.45)' },
  number: { color: '#f2b84b', fontSize: 13, fontWeight: '700' },
  name: { color: '#fff', fontSize: 28, fontWeight: '800' },
  country: { color: '#ddd', fontSize: 14, marginBottom: 6 },
  tagline: { color: '#fff', fontSize: 15 },
  tips: { marginTop: 10 },
  go: { color: '#8be28b', fontSize: 13, marginTop: 2 },
  avoid: { color: '#ff8a80', fontSize: 13, marginTop: 2 },
});
