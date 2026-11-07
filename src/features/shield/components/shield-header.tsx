import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable } from '@/components/pressable';
import { Image } from '@/components/image';
import { art } from '../data/content';
import { useShield } from '../store/shield-store';
import { shieldColors } from '@/constants/theme';
export function ShieldHeader() {
 const scans = useShield((s) => s.scans);
 const today = scans.filter((s) => new Date(s.createdAt).toDateString() === new Date().toDateString()).length;
 return <View className="flex-row items-center gap-3 pb-1">
  <Image source={art.mark} className="h-12 w-10" contentFit="contain" />
  <View className="flex-1 gap-1"><View className="flex-row justify-between gap-2"><Text className="text-xs font-semibold text-foreground">Scans today</Text><Text className="text-xs text-accent">{today}</Text></View><View className="h-1 rounded-full bg-surface-tertiary" /><Text className="text-xs text-muted">CyberShield ZA</Text></View>
  <Pressable accessibilityLabel="Open privacy" className="h-11 w-11 items-center justify-center" onPress={() => router.navigate('/(tabs)/privacy')}><Ionicons name="lock-closed-outline" size={21} color={shieldColors.cyan} /></Pressable>
 </View>;
}
