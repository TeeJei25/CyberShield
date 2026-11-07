import { ScrollView, Text, View } from 'react-native';
import { Switch } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Card } from '@/components/card';
import { ListRow } from '@/components/list-row';
import { ShieldHeader } from '@/features/shield/components/shield-header';
import { ShieldHero } from '@/features/shield/components/shield-hero';
import { SectionTitle } from '@/features/shield/components/section-title';
import { Tip } from '@/features/shield/components/tip';
import { usePrivacyScreen } from '@/features/shield/hooks/use-privacy-screen';
import { shieldColors } from '@/constants/theme';
export default function PrivacyScreen() {
 const {state,status,busy,exportData,deleteScans,deleteAll} = usePrivacyScreen();
 return <ScrollView className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-22 gap-4">
  <ShieldHeader/>
  <ShieldHero eyebrow="YOUR PRIVACY" title={'Your messages\nstay in your control'} description="Know what is sent, what is saved, and how to remove it." image="privacy">
   <View className="flex-row gap-2">{[['lock-closed-outline','Encrypted','Secure HTTPS in transit.'],['shield-checkmark-outline','Your choice','AI needs your permission.'],['phone-portrait-outline','On device','Optional saved history.'],['trash-outline','Your control','Delete your data.']].map(([icon,title,text]) => <View key={title} className="flex-1 gap-1 items-center"><Ionicons name={icon as 'lock-closed-outline'} size={23} color={shieldColors.cyan}/><Text className="text-[10px] font-semibold text-center text-foreground">{title}</Text><Text className="text-[10px] leading-3 text-center text-muted">{text}</Text></View>)}</View>
   <ListRow title="Read full privacy notice" onPress={()=>router.push('/policy')}/>
  </ShieldHero>
  <View className="gap-1"><SectionTitle title="Your Data"/><Card list><ListRow title="Scans saved" subtitle="Messages and assessments on this device" right={<Text className="text-sm text-accent">{state.scans.length}</Text>} onPress={()=>router.push('/history')}/><ListRow title="Save scan history" subtitle="Turn off to keep new results temporary" right={<Switch accessibilityLabel="Save scan history" isSelected={state.saveHistory} onSelectedChange={state.setSaveHistory}/>}/><ListRow title="Allow AI processing" subtitle="Withdraw permission at any time" right={<Switch accessibilityLabel="Allow AI processing" isSelected={state.consent} onSelectedChange={state.setConsent}/>}/></Card></View>
  <View className="gap-1"><SectionTitle title="Your Rights"/><Card list><ListRow title="Export my data" subtitle="Share a copy of your saved scans and progress" left={<Ionicons name="download-outline" size={22} color={shieldColors.cyan}/>} onPress={()=>void exportData()}/><ListRow title="Delete all scans" subtitle="Permanently remove saved messages" left={<Ionicons name="trash-outline" size={22} color={shieldColors.cyan}/>} onPress={deleteScans}/><ListRow title={busy?'Deleting private session…':'Delete all data & private session'} subtitle="Remove server session and reset this app" onPress={busy?undefined:deleteAll}/></Card></View>
  {status ? <Text accessibilityRole="alert" className="text-sm leading-5 text-accent">{status}</Text>:null}
  <Tip privacy/>
 </ScrollView>;
}
