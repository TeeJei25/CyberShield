import { ScrollView, Text, View, Share } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from 'heroui-native';
import { Card } from '@/components/card';
import { Pressable, pressHaptic } from '@/components/pressable';
import { confirmDelete } from '@/lib/confirm';
import { BackHeading } from '@/features/shield/components/back-heading';
import { RiskBadge } from '@/features/shield/components/risk-badge';
import { VerdictMark } from '@/features/shield/components/verdict-mark';
import { useShield } from '@/features/shield/store/shield-store';
export default function ResultScreen() {
 const {id,fresh} = useLocalSearchParams<{id:string;fresh?:string}>();
 const state = useShield();
 const scan = state.scans.find((s) => s.id === id) ?? (state.latest?.id === id ? state.latest : null);
 if (!scan) return <ScrollView className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-4 gap-6"><BackHeading title="Scan unavailable" subtitle="This scan was deleted or was not saved on this device."/><Button onPress={() => {pressHaptic();router.replace('/scan');}}>Check a message</Button></ScrollView>;
 return <ScrollView className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-4 gap-6">
  <BackHeading title="Your risk assessment" subtitle={`${scan.channel} · ${new Date(scan.createdAt).toLocaleString('en-ZA')}`}/>
  <Card><View className="flex-row items-center gap-3"><VerdictMark animate={fresh === 'yes'}/><View className="flex-1 gap-2"><RiskBadge risk={scan.risk}/><Text className="text-lg font-semibold text-foreground">Check complete</Text><Text className="text-xs text-muted">AI assessment, not verification</Text></View></View><Text className="text-sm leading-6 text-foreground">{scan.summary}</Text></Card>
  <View className="gap-3"><Text className="text-lg font-semibold text-foreground">Warning signs</Text><Card>{scan.warningSigns.map((sign,i) => <View key={i} className="flex-row gap-3"><Text className="text-accent">•</Text><Text className="flex-1 text-sm leading-6 text-foreground">{sign}</Text></View>)}</Card></View>
  <View className="gap-3"><Text className="text-lg font-semibold text-foreground">What to do next</Text><Card>{scan.recommendations.map((step,i) => <View key={i} className="flex-row gap-3"><Text className="text-sm font-semibold text-accent">{i+1}</Text><Text className="flex-1 text-sm leading-6 text-foreground">{step}</Text></View>)}</Card></View>
  <Card><Text className="text-xs font-semibold text-muted">Original message</Text><Text selectable className="text-sm leading-6 text-foreground">{scan.message}</Text></Card>
  <Text className="text-xs leading-5 text-muted">AI can miss scams or flag genuine messages. Verify independently using a trusted contact. If you shared banking details or sent money, contact your bank immediately.</Text>
  <Button onPress={() => {pressHaptic();state.setDraft('');router.replace('/scan');}}>Check another message</Button>
  <Button variant="secondary" onPress={() => {pressHaptic();void Share.share({message:`CyberShield ZA — ${scan.risk} risk (AI assessment, not verification)\n${scan.summary}\n\nRecommended steps:\n${scan.recommendations.join('\n')}\n\nAI can make mistakes. Verify independently.`});}}>Share safety advice</Button>
  <Pressable className="min-h-11 items-center justify-center" onPress={() => confirmDelete({title:'Delete this scan?',message:'This removes the saved message and assessment from this device.',onConfirm:()=>{state.deleteScan(scan.id);router.replace('/history');}})}><Text className="text-sm text-danger">Delete scan</Text></Pressable>
 </ScrollView>;
}
