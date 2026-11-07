import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, Pressable, StyleSheet, StatusBar as RNStatusBar } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import Header from './src/Header';
import { MonthScreen, DetailScreen, ArchiveScreen, SavedScreen, AboutScreen } from './src/screens';
import { DESTINATIONS } from './src/data';
import { colors } from './src/theme';

export default function App() {
  const [tab, setTab] = useState('month');
  const [openId, setOpenId] = useState(null);
  const [saved, setSaved] = useState([]);

  const toggleSave = (id) =>
    setSaved((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  const open = DESTINATIONS.find((d) => d.id === openId);

  let body;
  if (open) {
    body = (
      <DetailScreen
        d={open}
        saved={saved.includes(open.id)}
        onSave={() => toggleSave(open.id)}
        onBack={() => setOpenId(null)}
      />
    );
  } else if (tab === 'month') body = <MonthScreen onOpen={setOpenId} />;
  else if (tab === 'archive') body = <ArchiveScreen />;
  else if (tab === 'saved') body = <SavedScreen saved={saved} onOpen={setOpenId} />;
  else body = <AboutScreen />;

  return (
    <View style={styles.app}>
      <StatusBar style="light" />
      <ScrollView key={openId || tab} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Header />
        {body}
      </ScrollView>
      <TabBar
        tab={tab}
        onChange={(t) => {
          setOpenId(null);
          setTab(t);
        }}
      />
    </View>
  );
}

const TABS = [
  { id: 'month', label: 'MONTH' },
  { id: 'archive', label: 'ARCHIVE' },
  { id: 'saved', label: 'SAVED' },
  { id: 'about', label: 'ABOUT' },
];

function TabIcon({ id, color }) {
  const p = { stroke: color, strokeWidth: 1.5, fill: 'none' };
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      {id === 'month' && (<><Circle cx="12" cy="12" r="9" {...p} /><Path d="M15.5 8.5l-2 5-5 2 2-5z" {...p} /></>)}
      {id === 'archive' && (<><Rect x="3" y="4" width="18" height="5" rx="1" {...p} /><Path d="M5 9v10h14V9M10 13h4" {...p} /></>)}
      {id === 'saved' && <Path d="M6 3h12v18l-6-4-6 4z" {...p} />}
      {id === 'about' && (<><Circle cx="12" cy="12" r="9" {...p} /><Path d="M12 11v6M12 7.5v.5" {...p} /></>)}
    </Svg>
  );
}

function TabBar({ tab, onChange }) {
  return (
    <View style={styles.tabbar}>
      {TABS.map((t) => {
        const active = tab === t.id;
        const color = active ? colors.chrome : colors.dim;
        return (
          <Pressable key={t.id} style={styles.tab} onPress={() => onChange(t.id)}>
            <TabIcon id={t.id} color={color} />
            <Text style={[styles.tabLabel, { color }]}>{t.label}</Text>
            <View style={[styles.dot, { opacity: active ? 1 : 0 }]} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.bg, paddingTop: RNStatusBar.currentHeight || 24 },
  scroll: { paddingHorizontal: 20, paddingBottom: 32 },
  tabbar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: colors.bg,
    paddingTop: 10,
    paddingBottom: 18,
  },
  tab: { flex: 1, alignItems: 'center', gap: 5 },
  tabLabel: { fontSize: 10, letterSpacing: 1.4 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.chrome },
});
