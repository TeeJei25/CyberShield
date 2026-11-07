import { Text, View, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button, TextArea, Switch } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Segmented } from '@/components/segmented';
import { Card } from '@/components/card';
import { Pressable, pressHaptic } from '@/components/pressable';
import { BackHeading } from '@/features/shield/components/back-heading';
import { useScanScreen } from '@/features/shield/hooks/use-scan-screen';
import { shieldColors } from '@/constants/theme';
export default function ScanScreen() {
 const {state,loading,error,analyze} = useScanScreen();
 return <KeyboardAwareScrollView className="flex-1 bg-background" keyboardShouldPersistTaps="handled" bottomOffset={24} contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-4 gap-6">
  <BackHeading title="Check a message" subtitle="A second opinion before you click, reply or pay."/>
  <Segmented values={['SMS','WhatsApp','Email']} value={state.channel} onChange={(c) => state.setDraft(state.draft,c)}/>
  <View className="gap-2"><Text className="text-sm font-semibold text-foreground">Suspicious message</Text><TextArea accessibilityLabel="Suspicious message" keyboardAppearance="dark" placeholder="Paste the full message here…" value={state.draft} onChangeText={(text) => state.setDraft(text)} maxLength={6000} editable={!loading} className="min-h-48 text-base leading-6 border border-border bg-surface"/><Text className="text-xs text-muted">{state.draft.length} / 6,000 characters · Do not include passwords or OTPs.</Text></View>
  <Card><View className="flex-row gap-3 items-center"><Ionicons name="lock-closed-outline" size={22} color={shieldColors.cyan}/><Text className="flex-1 text-sm font-semibold text-foreground">Your choice. Your message.</Text><Switch accessibilityLabel="Allow AI processing" isSelected={state.consent} onSelectedChange={state.setConsent} isDisabled={loading}/></View><Text className="text-xs leading-5 text-muted">I allow this message to be sent through CyberShield ZA’s secure backend to a third-party AI service via Newly AI for analysis. Remove names, ID numbers, banking details and other private information first. You can withdraw permission in Privacy.</Text><Pressable onPress={() => router.push('/policy')} className="min-h-11 justify-center"><Text className="text-xs text-accent">Read how your data is handled →</Text></Pressable></Card>
  {error ? <View accessibilityRole="alert" className="rounded-xl border border-danger/50 bg-danger/10 p-4 gap-1"><Text className="text-sm font-semibold text-danger">Message not assessed</Text><Text className="text-sm leading-5 text-foreground">{error}</Text></View> : null}
  <Button isDisabled={loading} onPress={() => { pressHaptic(); void analyze(); }} className="bg-accent rounded-xl">{loading ? <View className="flex-row gap-3 items-center"><ActivityIndicator color={shieldColors.background}/><Text className="font-semibold text-accent-foreground">Checking warning signs…</Text></View> : <Button.Label>Analyse message</Button.Label>}</Button>
  <Text className="text-xs text-center leading-5 text-muted">AI can make mistakes. A Low risk result is not proof that a message is safe. No links are opened by this check.</Text>
 </KeyboardAwareScrollView>;
}
