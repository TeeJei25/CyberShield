import { ScrollView, Text, View } from 'react-native';
import { Button } from 'heroui-native';
import { router } from 'expo-router';
import { Card } from '@/components/card';
import { Pressable, pressHaptic } from '@/components/pressable';
import { Image } from '@/components/image';
import { BackHeading } from '@/features/shield/components/back-heading';
import { VerdictMark } from '@/features/shield/components/verdict-mark';
import { useGuideScreen } from '@/features/shield/hooks/use-guide-screen';
import { art } from '@/features/shield/data/content';
export default function GuideScreen() {
 const screen=useGuideScreen();const guide=screen.guide;
 if(!guide)return <ScrollView className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-4 gap-6"><BackHeading title="Guide unavailable"/></ScrollView>;
 return <ScrollView className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-4 gap-6"><BackHeading title={guide.title} subtitle={`${guide.topic} · ${guide.minutes} min read`}/><Image source={art[guide.image]} className="w-full h-40 rounded-2xl" contentFit="cover"/>
 {screen.step<5?<View className="gap-4"><Text className="text-xs font-semibold tracking-widest text-accent">STEP {screen.step+1} OF 5</Text><Text className="text-2xl font-semibold text-foreground">{guide.steps[screen.step].title}</Text><Text className="text-base leading-7 text-foreground">{guide.steps[screen.step].body}</Text><Button onPress={()=>{pressHaptic();screen.next();}}>{screen.step===4?'Quick knowledge check':'Next step'}</Button>{screen.step>0?<Button variant="secondary" onPress={()=>{pressHaptic();screen.previous();}}>Previous step</Button>:null}</View>:<View className="gap-4"><Text className="text-lg font-semibold text-foreground">Quick knowledge check</Text><Text className="text-base leading-6 text-foreground">{guide.question}</Text>{guide.answers.map((answer,i)=><Pressable key={answer} className={`rounded-xl border p-4 ${screen.answer===i?'border-accent bg-surface-tertiary':'border-border bg-surface'}`} onPress={()=>screen.choose(i)}><Text className="text-sm leading-5 text-foreground">{answer}</Text></Pressable>)}{screen.answer!==null&&screen.answer!==guide.correct?<Text accessibilityRole="alert" className="text-sm text-warning">Not quite. Choose the option that verifies independently and protects your information.</Text>:null}{screen.completed?<Card><View className="flex-row items-center gap-3"><VerdictMark key={screen.justCompleted?'new':'done'} animate={screen.justCompleted} completion/><View className="flex-1 gap-2"><Text className="text-lg font-semibold text-accent">One step safer.</Text><Text className="text-sm leading-5 text-foreground">Guide completed. Your progress is saved.</Text></View></View><Button onPress={()=>{pressHaptic();router.back();}}>Back to guides</Button></Card>:null}<Button variant="secondary" onPress={()=>{pressHaptic();screen.previous();}}>Review the last step</Button></View>}
 </ScrollView>;
}
