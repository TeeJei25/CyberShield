import { ScrollView, Text, View } from 'react-native';
import { Button } from 'heroui-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Card } from '@/components/card';
import { pressHaptic } from '@/components/pressable';
import { BackHeading } from '@/features/shield/components/back-heading';
import { RiskBadge } from '@/features/shield/components/risk-badge';
import { scams } from '@/features/shield/data/content';
import { useShield } from '@/features/shield/store/shield-store';
export default function ExampleScreen() {
 const {id}=useLocalSearchParams<{id:string}>();
 const scam=scams.find((s)=>s.id===id);
 if(!scam)return <ScrollView className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-4 gap-6"><BackHeading title="Example unavailable"/></ScrollView>;
 return <ScrollView className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-4 gap-6"><BackHeading title={scam.title} subtitle={`${scam.channel} · ${scam.category} · Educational example`}/><Card><RiskBadge risk={scam.risk}/><Text className="text-xs leading-5 text-muted">Author’s illustrative rating, not an AI result. Names are used only to explain impersonation; there is no affiliation. Links use reserved .example domains and do not work.</Text><Text selectable className="text-base leading-7 text-foreground">{scam.message}</Text></Card><View className="gap-3"><Text className="text-lg font-semibold text-foreground">Why it is suspicious</Text><Card>{scam.signs.map((sign)=><Text key={sign} className="text-sm leading-6 text-foreground">• {sign}</Text>)}</Card></View><View className="gap-3"><Text className="text-lg font-semibold text-foreground">Stay one step ahead</Text><Card>{scam.steps.map((step,i)=><Text key={step} className="text-sm leading-6 text-foreground">{i+1}. {step}</Text>)}</Card></View><Button onPress={()=>{pressHaptic();useShield.getState().setDraft(scam.message,scam.channel);router.push('/scan');}}>Try this message with AI</Button><Text className="text-xs leading-5 text-muted">This sends the example for a fresh AI assessment only after you consent and tap Analyse message.</Text></ScrollView>;
}
