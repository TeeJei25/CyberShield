import { ScrollView, Text } from 'react-native';
import { Button } from 'heroui-native';
import { router } from 'expo-router';
import { Card } from '@/components/card';
import { ListRow } from '@/components/list-row';
import { pressHaptic } from '@/components/pressable';
import { BackHeading } from '@/features/shield/components/back-heading';
import { RiskBadge } from '@/features/shield/components/risk-badge';
import { useShield } from '@/features/shield/store/shield-store';
export default function HistoryScreen() {
 const scans=useShield((s)=>s.scans);
 return <ScrollView className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-4 gap-6"><BackHeading title="Scan history" subtitle="Your saved message checks, kept on this device."/>{scans.length?<Card list>{scans.map((s)=><ListRow key={s.id} title={`${s.channel} · ${new Date(s.createdAt).toLocaleDateString('en-ZA')}`} subtitle={s.summary} right={<RiskBadge risk={s.risk}/>} onPress={()=>router.push({pathname:'/result',params:{id:s.id}})}/>)}</Card>:<Card><Text className="text-lg font-semibold text-foreground">A little pause can prevent a big loss.</Text><Text className="text-sm leading-5 text-muted">Paste a suspicious message to get your first assessment. Saved checks will appear here.</Text><Button onPress={()=>{pressHaptic();router.push('/scan');}}>Check a message</Button></Card>}</ScrollView>;
}
