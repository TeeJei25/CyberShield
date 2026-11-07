import { ScrollView, Text, View } from 'react-native';
import { Input, ScrollShadow } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Card } from '@/components/card';
import { Pressable } from '@/components/pressable';
import { Segmented } from '@/components/segmented';
import { ShieldHeader } from '@/features/shield/components/shield-header';
import { ShieldHero } from '@/features/shield/components/shield-hero';
import { SectionTitle } from '@/features/shield/components/section-title';
import { ScamRow } from '@/features/shield/components/scam-row';
import { RiskBadge } from '@/features/shield/components/risk-badge';
import { useLibraryScreen } from '@/features/shield/hooks/use-library-screen';
import { shieldColors } from '@/constants/theme';
export default function ScamScreen() {
 const screen = useLibraryScreen();
 return <ScrollView className="flex-1 bg-background" keyboardShouldPersistTaps="handled" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-22 gap-4">
  <ShieldHeader />
  <ShieldHero eyebrow="SCAM SCANS LIBRARY" title={'Real scams.\nReal examples.'} description="Stay one step ahead. Explore common scams targeting South Africans." image="library"><Input accessibilityLabel="Search scam examples" placeholder="Search scams, keywords or topics…" value={screen.query} onChangeText={screen.setQuery} className="text-sm leading-none border border-border bg-background/60" /></ShieldHero>
  <Segmented values={['All scams', 'Banking', 'Delivery', 'Jobs']} value={screen.category} onChange={screen.setCategory} />
  <View className="gap-2"><SectionTitle title={screen.query || screen.category !== 'All scams' ? 'Matching examples' : 'Featured scams'} />
   <ScrollShadow LinearGradientComponent={LinearGradient}><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3">
    {screen.filtered.slice(0,3).map((s) => <Pressable key={s.id} accessibilityLabel={`Open ${s.title}`} className="w-40" onPress={() => router.push({pathname:'/example',params:{id:s.id}})}><Card><View className="h-9 w-9 items-center justify-center rounded-xl bg-surface-tertiary"><Ionicons name={s.icon} size={26} color={shieldColors.cyan}/></View><RiskBadge risk={s.risk}/><Text className="text-sm font-semibold text-foreground">{s.title}</Text><Text className="text-xs leading-4 text-muted" numberOfLines={2}>{s.signs[0]}</Text></Card></Pressable>)}
   </ScrollView></ScrollShadow>
   {!screen.filtered.length ? <Text className="text-sm text-muted">No examples match. Try “bank” or choose All scams.</Text> : null}
  </View>
  <View className="gap-1"><SectionTitle title="Recent Examples" /><Text className="text-xs text-muted">Illustrative scenarios, not live threat alerts</Text><Card list>{screen.filtered.slice(3).concat(screen.filtered.length < 4 ? screen.filtered : []).map((s) => <ScamRow key={s.id} scam={s}/>)}</Card></View>
  <Pressable onPress={() => router.push({pathname:'/guide', params:{id:'phishing'}})}><Card><View className="flex-row gap-3 items-center"><Ionicons name="shield-checkmark-outline" size={28} color={shieldColors.cyan}/><View className="flex-1 gap-1"><Text className="text-base font-semibold text-foreground">Know the red flags</Text><Text className="text-xs text-muted">Learn to spot a scam before it spots you.</Text><Text className="text-xs text-accent">Explore safety guides →</Text></View></View></Card></Pressable>
 </ScrollView>;
}
