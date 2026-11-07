import { ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/card';
import { Pressable } from '@/components/pressable';
import { Segmented } from '@/components/segmented';
import { ListRow } from '@/components/list-row';
import { ShieldHeader } from '@/features/shield/components/shield-header';
import { ShieldHero } from '@/features/shield/components/shield-hero';
import { SectionTitle } from '@/features/shield/components/section-title';
import { ScamRow } from '@/features/shield/components/scam-row';
import { RiskBadge } from '@/features/shield/components/risk-badge';
import { Tip } from '@/features/shield/components/tip';
import { scams } from '@/features/shield/data/content';
import { useShield } from '@/features/shield/store/shield-store';
import { shieldColors } from '@/constants/theme';
export default function HomeScreen() {
 const state = useShield();
 return <ScrollView className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-22 gap-4">
  <ShieldHeader />
  <ShieldHero eyebrow="MESSAGE SCANNER" title={'Check a message\nfor scams'} description="Paste an SMS, WhatsApp message or email for an AI-powered risk assessment." image="home">
   <Pressable accessibilityLabel="Paste a message to scan" className="flex-row items-center gap-3 rounded-2xl border border-border bg-background/60 p-3" onPress={() => router.push('/scan')}><Ionicons name="chatbubble-ellipses-outline" color={shieldColors.cyan} size={22}/><Text className="flex-1 text-sm text-muted" numberOfLines={1}>{state.draft || 'Paste message, link or text…'}</Text><View className="h-10 w-10 rounded-full bg-accent items-center justify-center"><Ionicons name="arrow-forward" size={24} color={shieldColors.white}/></View></Pressable>
   <Segmented values={['SMS', 'WhatsApp', 'Email']} value={state.channel} onChange={(channel) => state.setDraft(state.draft, channel)} />
  </ShieldHero>
  <View className="gap-1"><SectionTitle title="Recent Scans" onPress={() => router.push('/history')} />
   {state.scans.length ? <Card list>{state.scans.slice(0,4).map((scan) => <ListRow key={scan.id} title={`${scan.channel} message`} subtitle={scan.summary} right={<RiskBadge risk={scan.risk}/>} onPress={() => router.push({ pathname:'/result', params:{id:scan.id} })} />)}</Card> : <View className="gap-1"><Text className="text-xs text-muted">Your checks will appear here. Explore an example:</Text><Card list>{scams.slice(0,3).concat(scams[6]).map((scam) => <ScamRow key={scam.id} scam={scam}/>)}</Card></View>}
  </View>
  <Card><View className="flex-row items-center gap-4"><View className="h-12 w-12 rounded-xl bg-accent/10 items-center justify-center"><Ionicons name="shield-checkmark-outline" size={31} color={shieldColors.cyan}/></View><View className="flex-1 gap-1"><Text className="text-xs text-muted">Your digital safety</Text><Text className="text-xl font-semibold text-accent">{state.scans.length ? 'Staying alert' : 'Start with a check'}</Text><Text className="text-xs text-muted">{state.scans.length} saved checks · {state.completed.length} guides completed</Text></View></View></Card>
  <Tip />
 </ScrollView>;
}
