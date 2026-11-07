import { ScrollView, Text, View } from 'react-native';
import { Input } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Card } from '@/components/card';
import { Pressable } from '@/components/pressable';
import { Image } from '@/components/image';
import { ShieldHeader } from '@/features/shield/components/shield-header';
import { ShieldHero } from '@/features/shield/components/shield-hero';
import { SectionTitle } from '@/features/shield/components/section-title';
import { GuideRow } from '@/features/shield/components/guide-row';
import { Tip } from '@/features/shield/components/tip';
import { art, guides, topics } from '@/features/shield/data/content';
import { useEducationScreen } from '@/features/shield/hooks/use-library-screen';
import { useShield } from '@/features/shield/store/shield-store';
import { shieldColors } from '@/constants/theme';
export default function EducationScreen() {
 const screen = useEducationScreen();
 const progress = useShield((s) => s.progress);
 const current = guides.find((g) => progress[g.id] > 0 && progress[g.id] < 5) ?? guides[0];
 const step = progress[current.id] ?? 0;
 return <ScrollView className="flex-1 bg-background" keyboardShouldPersistTaps="handled" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-22 gap-4">
  <ShieldHeader />
  <ShieldHero eyebrow="LEARN & STAY SAFE" title={'Bite-sized\nsafety guides'} description="Practical tips to protect yourself online. Learn a little. Stay a lot safer." image="education"><Input accessibilityLabel="Search safety guides" placeholder="Search safety guides or topics…" value={screen.query} onChangeText={screen.setQuery} className="text-sm leading-none border border-border bg-background/60" /></ShieldHero>
  {!screen.query && !screen.topic ? <View className="gap-2"><SectionTitle title="Continue Learning"/><Pressable onPress={() => router.push({pathname:'/guide',params:{id:current.id}})}><Card><View className="flex-row gap-3 items-center"><Image source={art.phishing} className="w-20 h-14 rounded-lg" contentFit="cover"/><View className="flex-1 gap-2"><Text className="text-sm font-semibold text-foreground">{current.title}</Text><Text className="text-xs text-muted">{current.minutes} min read · {step === 0 ? 'Ready to start' : `${step} of 5 steps`}</Text><Text className="text-xs font-medium text-accent">{step ? 'Continue reading' : 'Start learning'} →</Text></View></View></Card></Pressable></View> : null}
  <View className="gap-2"><SectionTitle title="Browse by Topic" action="Reset" onPress={screen.topic ? () => screen.setTopic('') : undefined}/><View className="flex-row gap-2">{topics.map((topic,i) => <Pressable key={topic} className={`flex-1 min-w-0 rounded-xl border p-2 gap-1 ${screen.topic === topic ? 'border-accent bg-surface-tertiary' : 'border-border bg-surface'}`} onPress={() => screen.setTopic(screen.topic === topic ? '' : topic)}><Ionicons name={(['shield-checkmark-outline','lock-closed-outline','finger-print-outline','wallet-outline'] as const)[i]} size={23} color={shieldColors.cyan}/><Text className="text-[10px] leading-3 font-semibold text-foreground">{topic}</Text><Text className="text-[10px] text-muted">{guides.filter((g) => g.topic === topic).length} guides</Text></Pressable>)}</View></View>
  <View className="gap-1"><SectionTitle title={screen.topic || screen.query ? 'Matching guides' : 'Recommended for you'}/><Card list>{(screen.topic || screen.query ? screen.filtered : screen.filtered.slice(1,4)).map((g) => <GuideRow key={g.id} guide={g}/>)}</Card>{screen.filtered.length === 0 ? <Text className="text-sm text-muted">No guides match. Try another word or reset the topic.</Text> : null}</View>
  <Tip/>
 </ScrollView>;
}
