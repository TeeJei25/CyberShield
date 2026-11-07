import { Text, View } from 'react-native';
import { Pressable } from '@/components/pressable';
export function SectionTitle({ title, action = 'See all', onPress }: { title: string; action?: string; onPress?: () => void }) {
 return <View className="flex-row items-center justify-between gap-2"><Text className="text-lg font-semibold text-foreground">{title}</Text>{onPress ? <Pressable onPress={onPress} className="min-h-11 justify-center"><Text className="text-xs text-accent">{action} ›</Text></Pressable> : null}</View>;
}
