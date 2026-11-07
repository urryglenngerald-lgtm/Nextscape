import { View, Text, Pressable, ImageBackground, StyleSheet, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { MONTH, DESTINATIONS } from './data';
import { colors } from './theme';

const EMAIL = 'geraldexplores@gmail.com';

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
      <ImageBackground source={d.photo} style={s.cardArt} imageStyle={s.photo}>
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

export function MonthScreen({ onOpen }) {
  return (
    <View style={s.view}>
      <Intro eyebrow={`${MONTH.toUpperCase()}  ·  3 PLACES`} title="Where to go this month, and what to skip." />
      {DESTINATIONS.map((d, i) => (
        <DestinationCard key={d.id} d={d} index={i} onPress={() => onOpen(d.id)} />
      ))}
    </View>
  );
}

export function DetailScreen({ d, saved, onSave, onBack }) {
  const index = DESTINATIONS.findIndex((x) => x.id === d.id);
  const info = d.details;
  return (
    <View style={s.view}>
      <Pressable onPress={onBack} hitSlop={10}>
        <Text style={s.back}>←  THIS MONTH</Text>
      </Pressable>

      <ImageBackground source={d.photo} style={s.hero} imageStyle={s.photo}>
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.85)']} style={StyleSheet.absoluteFill} />
        <Pressable onPress={onSave} style={s.save} hitSlop={8} accessibilityLabel={saved ? 'Remove from saved' : 'Save'}>
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Path d="M6 3h12v18l-6-4-6 4z" stroke={colors.chrome} strokeWidth={1.5} fill={saved ? colors.chrome : 'none'} />
          </Svg>
        </Pressable>
        <View style={s.heroText}>
          <Text style={s.eyebrow}>{`${String(index + 1).padStart(2, '0')}  ·  ${MONTH.toUpperCase()}`}</Text>
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
        </>
      )}
    </View>
  );
}

export function ArchiveScreen() {
  return (
    <View style={s.view}>
      <Intro eyebrow="ARCHIVE" title="Past picks live here." />
      <Text style={s.body}>Each month's three destinations move here when the new set arrives. The first ones land in December.</Text>
    </View>
  );
}

export function SavedScreen({ saved, onOpen }) {
  const list = DESTINATIONS.filter((d) => saved.includes(d.id));
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

export function AboutScreen() {
  return (
    <View style={s.view}>
      <Intro eyebrow="ABOUT" title="Every month, three places." />
      <Text style={s.lede}>
        Nextscape picks three destinations worth your time right now, chosen for the season, the price and the crowds. For each one you get where to go and what to skip.
      </Text>
      <Block title="HOW IT WORKS">
        <Text style={s.body}>
          A new set of three arrives on the first of every month. Past picks stay in the Archive, and you can save the places you like for later.
        </Text>
      </Block>
      <Block title="WHO'S BEHIND IT">
        <Text style={s.body}>
          Nextscape is created by Gerald eXplores, a travel brand focused on well-timed trips and honest advice. Every destination is researched and chosen by hand, never paid for.
        </Text>
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
  save: {
    position: 'absolute', top: 14, right: 14, width: 40, height: 40, borderRadius: 20,
    borderWidth: 1, borderColor: '#3a3d43', backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center',
  },
  facts: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  fact: { width: '48%', flexGrow: 1, borderWidth: 1, borderColor: colors.line, borderRadius: 14, padding: 12, backgroundColor: colors.panel, gap: 4 },
  factLabel: { fontSize: 10, letterSpacing: 2.2, color: colors.dim },
  factValue: { fontSize: 18, color: colors.chrome },
  spot: { gap: 3, marginTop: 4 },
  spotName: { fontSize: 16, color: colors.chrome },
  spotNote: { fontSize: 14, fontWeight: '300', lineHeight: 20, color: colors.silver },
  instead: { fontSize: 13, color: colors.chrome, marginTop: 2 },

  savedRow: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.line, gap: 4 },
  email: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6,
    paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: '#2a2c31', borderRadius: 14, backgroundColor: colors.panel,
  },
  emailText: { fontSize: 14, color: colors.chrome, flexShrink: 1 },
  emailAction: { fontSize: 11, letterSpacing: 2.2, color: colors.chrome },
});
