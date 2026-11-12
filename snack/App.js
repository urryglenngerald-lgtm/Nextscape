// Nextscape: single-file version for Expo Snack.
// Content (month and destinations) loads from data/destinations.json on GitHub,
// so editing that file updates the app without touching this code.

import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, Pressable, ImageBackground, StyleSheet, Linking, StatusBar as RNStatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, LinearGradient as SvgGradient, RadialGradient, Stop, Path, Circle, Rect } from 'react-native-svg';

const colors = { bg: '#000000', panel: '#0c0d0f', chrome: '#e9ebee', silver: '#a7abb2', dim: '#5f636a', line: '#1d1f23' };
const REPO = 'https://raw.githubusercontent.com/urryglenngerald-lgtm/Nextscape/main';
const DATA_URL = `${REPO}/data/destinations.json`;
const PHOTO = (name) => ({ uri: `${REPO}/assets/${name}.jpg` });
const EMAIL = 'geraldexplores@gmail.com';

// Outside links for planning a trip. Plain links: nothing is earned from them.
const q = (text) => encodeURIComponent(text);
const PLAN = (d) => {
  const place = `${d.name}, ${d.country}`;
  return [
    { label: 'Hotels on Booking.com', action: 'STAY', url: `https://www.booking.com/searchresults.html?ss=${q(place)}` },
    { label: 'Homes on Airbnb', action: 'STAY', url: `https://www.airbnb.com/s/${q(place)}/homes` },
    { label: 'Flights on Google Flights', action: 'FLY', url: `https://www.google.com/travel/flights?q=${q(`Flights to ${place}`)}` },
  ];
};
const MAP_URL = (place) => `https://www.google.com/maps/search/?api=1&query=${q(place)}`;
const openLink = (url) => Linking.openURL(url).catch(() => {});

/* ---------- Header: stars and wordmark ---------- */

let seed = 7;
const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const STARS = Array.from({ length: 45 }, () => {
  const big = rnd() < 0.07;
  return { x: rnd() * 100, y: rnd() * 100, size: big ? 2 + rnd() : 0.8 + rnd() * 0.9, opacity: 0.3 + rnd() * 0.5 };
});

function Stars() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {STARS.map((st, i) => (
        <View key={i} style={{ position: 'absolute', left: `${st.x}%`, top: `${st.y}%`, width: st.size, height: st.size, borderRadius: st.size / 2, backgroundColor: '#ebeef2', opacity: st.opacity }} />
      ))}
      <LinearGradient colors={['rgba(0,0,0,0)', colors.bg]} style={h.fade} />
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

function Header() {
  const size = 42;
  return (
    <View style={h.sky}>
      <Stars />
      <View style={h.mark}>
        <Text style={[h.word, { fontSize: size }]}>ne</Text>
        <ChromeX size={size} />
        <Text style={[h.word, { fontSize: size }]}>tscape</Text>
      </View>
      <LinearGradient colors={['rgba(255,255,255,0)', '#ffffff', 'rgba(255,255,255,0)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={h.streak} />
    </View>
  );
}

const h = StyleSheet.create({
  sky: { marginHorizontal: -20, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 22, gap: 18 },
  fade: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '45%' },
  mark: { flexDirection: 'row', alignItems: 'center' },
  word: { color: '#e6e8eb', fontWeight: '300', includeFontPadding: false },
  streak: { height: 1, opacity: 0.9 },
});

/* ---------- Screens ---------- */

function Intro({ eyebrow, title }) {
  return (
    <View style={s.intro}>
      <Text style={s.eyebrow}>{eyebrow}</Text>
      <Text style={s.headline}>{title}</Text>
    </View>
  );
}

function Block({ title, children }) {
  return (
    <View style={s.block}>
      <Text style={s.blockTitle}>{title}</Text>
      {children}
    </View>
  );
}

function DestinationCard({ d, index, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.card, pressed && { transform: [{ scale: 0.985 }] }]}>
      <ImageBackground source={PHOTO(d.photo)} style={s.cardArt} imageStyle={s.photo}>
        <LinearGradient colors={['rgba(12,13,15,0)', colors.panel]} style={StyleSheet.absoluteFill} />
        <Text style={s.num}>{String(index + 1).padStart(2, '0')}</Text>
      </ImageBackground>
      <View style={s.cardBody}>
        <Text style={s.place}>{d.name}</Text>
        <Text style={s.country}>{d.country.toUpperCase()}</Text>
        <Text style={s.tagline}>{d.tagline}</Text>
        <View style={s.tips}>
          <View style={s.tipRow}>
            <Text style={[s.tipKey, { color: colors.chrome }]}>GO</Text>
            <Text style={s.tipGo}>{d.go}</Text>
          </View>
          <View style={s.tipRow}>
            <Text style={[s.tipKey, { color: colors.dim }]}>SKIP</Text>
            <Text style={s.tipSkip}>{d.skip}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

function MonthScreen({ data, onOpen }) {
  return (
    <View style={s.view}>
      <Intro eyebrow={`${data.month.toUpperCase()}  ·  ${data.destinations.length} PLACES`} title="Where to go this month, and what to skip." />
      {data.destinations.map((d, i) => (
        <DestinationCard key={d.id} d={d} index={i} onPress={() => onOpen(d.id)} />
      ))}
    </View>
  );
}

function DetailScreen({ data, d, saved, onSave, onBack }) {
  const index = data.destinations.findIndex((x) => x.id === d.id);
  const info = d.details;
  return (
    <View style={s.view}>
      <Pressable onPress={onBack} hitSlop={10}>
        <Text style={s.back}>←  THIS MONTH</Text>
      </Pressable>
      <ImageBackground source={PHOTO(d.photo)} style={s.hero} imageStyle={s.photo}>
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.85)']} style={StyleSheet.absoluteFill} />
        <Pressable onPress={onSave} style={s.save} hitSlop={8}>
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Path d="M6 3h12v18l-6-4-6 4z" stroke={colors.chrome} strokeWidth={1.5} fill={saved ? colors.chrome : 'none'} />
          </Svg>
        </Pressable>
        <View style={s.heroText}>
          <Text style={s.eyebrow}>{`${String(index + 1).padStart(2, '0')}  ·  ${data.month.toUpperCase()}`}</Text>
          <Text style={[s.place, { fontSize: 36 }]}>{d.name}</Text>
          <Text style={s.country}>{d.country.toUpperCase()}</Text>
        </View>
      </ImageBackground>
      {!info ? (
        <Text style={s.body}>The full guide for {d.name} is coming soon.</Text>
      ) : (
        <>
          <Block title="WHY THIS MONTH">
            <Text style={s.body}>{info.why}</Text>
          </Block>
          <View style={s.facts}>
            {info.facts.map((f) => (
              <View key={f.label} style={s.fact}>
                <Text style={s.factLabel}>{f.label}</Text>
                <Text style={s.factValue}>{f.value}</Text>
              </View>
            ))}
          </View>
          <Block title="GO">
            {info.go.map((g) => (
              <View key={g.name} style={s.spot}>
                <Text style={s.spotName}>{g.name}</Text>
                <Text style={s.spotNote}>{g.note}</Text>
                {g.map ? (
                  <Pressable onPress={() => openLink(MAP_URL(g.map))} hitSlop={12} style={s.mapLink} accessibilityRole="link" accessibilityLabel={`Open ${g.name} in maps`}>
                    <Text style={s.mapText}>MAP  ↗</Text>
                  </Pressable>
                ) : null}
              </View>
            ))}
          </Block>
          <Block title="SKIP">
            {info.skip.map((g) => (
              <View key={g.name} style={s.spot}>
                <Text style={[s.spotName, { color: colors.silver }]}>{g.name}</Text>
                <Text style={s.spotNote}>{g.note}</Text>
                <Text style={s.instead}>Instead: {g.instead}</Text>
              </View>
            ))}
          </Block>
          <Block title="PLAN IT">
            {PLAN(d).map((l) => (
              <Pressable key={l.label} onPress={() => openLink(l.url)} style={({ pressed }) => [s.email, pressed && { opacity: 0.7 }]} accessibilityRole="link">
                <Text style={s.emailText}>{l.label}</Text>
                <Text style={s.emailAction}>{l.action}  ↗</Text>
              </Pressable>
            ))}
            <Text style={s.planNote}>These open the provider's own site. Nextscape earns nothing from them.</Text>
          </Block>
        </>
      )}
    </View>
  );
}

function ArchiveScreen() {
  return (
    <View style={s.view}>
      <Intro eyebrow="ARCHIVE" title="Past picks live here." />
      <Text style={s.body}>Each month's three destinations move here when the new set arrives. The first ones land in December.</Text>
    </View>
  );
}

function SavedScreen({ data, saved, onOpen }) {
  const list = data.destinations.filter((d) => saved.includes(d.id));
  return (
    <View style={s.view}>
      <Intro eyebrow="SAVED" title="Your places." />
      {list.length === 0 ? (
        <Text style={s.body}>Open a destination and tap the bookmark to save it here.</Text>
      ) : (
        list.map((d) => (
          <Pressable key={d.id} onPress={() => onOpen(d.id)} style={s.savedRow}>
            <Text style={s.spotName}>{d.name}</Text>
            <Text style={s.country}>{d.country.toUpperCase()}</Text>
          </Pressable>
        ))
      )}
    </View>
  );
}

function AboutScreen() {
  return (
    <View style={s.view}>
      <Intro eyebrow="ABOUT" title="Every month, three places." />
      <Text style={s.lede}>Nextscape picks three destinations worth your time right now, chosen for the season, the price and the crowds. For each one you get where to go and what to skip.</Text>
      <Block title="HOW IT WORKS">
        <Text style={s.body}>A new set of three arrives on the first of every month. Past picks stay in the Archive, and you can save the places you like for later.</Text>
      </Block>
      <Block title="WHO'S BEHIND IT">
        <Text style={s.body}>Nextscape is created by Gerald eXplores, a travel brand focused on well-timed trips and honest advice. Every destination is researched and chosen by hand, never paid for.</Text>
      </Block>
      <Block title="GOT A TIP?">
        <Text style={s.body}>Know a place that deserves a spot, or one people should skip? Send it over.</Text>
        <Pressable onPress={() => Linking.openURL(`mailto:${EMAIL}`)} style={s.email}>
          <Text style={s.emailText} selectable>{EMAIL}</Text>
          <Text style={s.emailAction}>EMAIL</Text>
        </Pressable>
      </Block>
    </View>
  );
}

function StatusScreen({ error, onRetry }) {
  return (
    <View style={s.view}>
      {error ? (
        <>
          <Text style={s.body}>This month's places didn't load. Check your connection and try again.</Text>
          <Pressable onPress={onRetry} style={s.email}>
            <Text style={s.emailAction}>TRY AGAIN</Text>
          </Pressable>
        </>
      ) : (
        <Text style={s.body}>Loading this month's places…</Text>
      )}
    </View>
  );
}

/* ---------- App and tab bar ---------- */

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
    <View style={a.tabbar}>
      {TABS.map((t) => {
        const active = tab === t.id;
        const color = active ? colors.chrome : colors.dim;
        return (
          <Pressable key={t.id} style={a.tab} onPress={() => onChange(t.id)}>
            <TabIcon id={t.id} color={color} />
            <Text style={[a.tabLabel, { color }]}>{t.label}</Text>
            <View style={[a.dot, { opacity: active ? 1 : 0 }]} />
          </Pressable>
        );
      })}
    </View>
  );
}

export default function App() {
  const [tab, setTab] = useState('month');
  const [openId, setOpenId] = useState(null);
  const [saved, setSaved] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const load = () => {
    setError(false);
    fetch(`${DATA_URL}?t=${Date.now()}`)
      .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then(setData)
      .catch(() => setError(true));
  };
  useEffect(load, []);

  const toggleSave = (id) => setSaved((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
  const open = data ? data.destinations.find((d) => d.id === openId) : null;

  let body;
  if (tab === 'about' && !open) body = <AboutScreen />;
  else if (tab === 'archive' && !open) body = <ArchiveScreen />;
  else if (!data) body = <StatusScreen error={error} onRetry={load} />;
  else if (open) body = <DetailScreen data={data} d={open} saved={saved.includes(open.id)} onSave={() => toggleSave(open.id)} onBack={() => setOpenId(null)} />;
  else if (tab === 'saved') body = <SavedScreen data={data} saved={saved} onOpen={setOpenId} />;
  else body = <MonthScreen data={data} onOpen={setOpenId} />;

  return (
    <View style={a.app}>
      <StatusBar style="light" />
      <ScrollView key={openId || tab} contentContainerStyle={a.scroll} showsVerticalScrollIndicator={false}>
        <Header />
        {body}
      </ScrollView>
      <TabBar tab={tab} onChange={(t) => { setOpenId(null); setTab(t); }} />
    </View>
  );
}

const a = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.bg, paddingTop: RNStatusBar.currentHeight || 24 },
  scroll: { paddingHorizontal: 20, paddingBottom: 32 },
  tabbar: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.line, backgroundColor: colors.bg, paddingTop: 10, paddingBottom: 18 },
  tab: { flex: 1, alignItems: 'center', gap: 5 },
  tabLabel: { fontSize: 10, letterSpacing: 1.4 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.chrome },
});

const s = StyleSheet.create({
  view: { gap: 22 },
  intro: { gap: 6 },
  eyebrow: { fontSize: 11, letterSpacing: 3, color: colors.silver },
  headline: { fontSize: 24, fontWeight: '300', lineHeight: 30, color: colors.chrome },
  lede: { fontSize: 16, fontWeight: '300', lineHeight: 25, color: colors.chrome },
  body: { fontSize: 15, fontWeight: '300', lineHeight: 23, color: '#c9ccd1' },
  block: { gap: 10, paddingTop: 18, borderTopWidth: 1, borderTopColor: colors.line },
  blockTitle: { fontSize: 11, letterSpacing: 3, color: colors.silver },
  card: { borderRadius: 22, overflow: 'hidden', backgroundColor: colors.panel, borderWidth: 1, borderColor: colors.line },
  cardArt: { height: 170, backgroundColor: '#000' },
  photo: { opacity: 0.55 },
  num: { position: 'absolute', top: 16, right: 18, fontSize: 12, letterSpacing: 2.4, color: colors.silver },
  cardBody: { paddingHorizontal: 20, paddingBottom: 20, marginTop: -54, gap: 4 },
  place: { fontSize: 30, fontWeight: '400', color: colors.chrome },
  country: { fontSize: 11, letterSpacing: 3, color: colors.silver },
  tagline: { fontSize: 14, fontWeight: '300', color: colors.silver, marginTop: 6 },
  tips: { marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.line, gap: 6 },
  tipRow: { flexDirection: 'row', alignItems: 'baseline', gap: 12 },
  tipKey: { fontSize: 10, letterSpacing: 2.2, width: 36 },
  tipGo: { fontSize: 13, color: colors.chrome, flex: 1 },
  tipSkip: { fontSize: 13, color: colors.dim, textDecorationLine: 'line-through', flex: 1 },
  back: { fontSize: 11, letterSpacing: 2.6, color: colors.silver, paddingVertical: 4 },
  hero: { height: 230, borderRadius: 22, overflow: 'hidden', justifyContent: 'flex-end', backgroundColor: '#000', borderWidth: 1, borderColor: colors.line },
  heroText: { padding: 20, gap: 4 },
  save: { position: 'absolute', top: 14, right: 14, width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#3a3d43', backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  facts: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  fact: { width: '48%', flexGrow: 1, borderWidth: 1, borderColor: colors.line, borderRadius: 14, padding: 12, backgroundColor: colors.panel, gap: 4 },
  factLabel: { fontSize: 10, letterSpacing: 2.2, color: colors.dim },
  factValue: { fontSize: 18, color: colors.chrome },
  spot: { gap: 3, marginTop: 4 },
  spotName: { fontSize: 16, color: colors.chrome },
  spotNote: { fontSize: 14, fontWeight: '300', lineHeight: 20, color: colors.silver },
  instead: { fontSize: 13, color: colors.chrome, marginTop: 2 },
  mapLink: { alignSelf: 'flex-start', marginTop: 6, paddingVertical: 4 },
  mapText: { fontSize: 11, letterSpacing: 2.2, color: colors.chrome },
  planNote: { fontSize: 12, fontWeight: '300', lineHeight: 18, color: colors.dim, marginTop: 6 },
  savedRow: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.line, gap: 4 },
  email: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: '#2a2c31', borderRadius: 14, backgroundColor: colors.panel },
  emailText: { fontSize: 14, color: colors.chrome, flexShrink: 1 },
  emailAction: { fontSize: 11, letterSpacing: 2.2, color: colors.chrome },
});
