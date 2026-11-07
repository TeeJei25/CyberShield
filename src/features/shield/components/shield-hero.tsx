import { Text, View } from 'react-native';
import type { ReactNode } from 'react';
import { Image } from '@/components/image';
import { Card } from '@/components/card';
import { art } from '../data/content';
export function ShieldHero({ eyebrow, title, description, image, children }: { eyebrow: string; title: string; description: string; image: 'home' | 'library' | 'education' | 'privacy'; children?: ReactNode }) {
 return <Card className="overflow-hidden border border-border gap-3">
  <View className="flex-row items-center gap-1"><View className="flex-1 gap-2"><Text className="text-[10px] font-semibold tracking-widest text-accent">{eyebrow}</Text><Text className="text-xl font-bold leading-6 tracking-tight text-foreground">{title}</Text><Text className="text-[11px] leading-4 text-muted">{description}</Text></View><Image source={art[image]} className="w-28 h-28" contentFit="contain" /></View>
  {children}
 </Card>;
}
